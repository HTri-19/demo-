<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Product_images;
use App\Models\Product_variants;
use Illuminate\Support\Facades\DB;

class ProductService
{
    protected $productRepo;
    public function __construct(\App\Repositories\ProductRepository $productRepo){
        $this->productRepo = $productRepo;
    }

    public function getAll()
    {
        return Product::with(['category', 'images', 'variants.ram', 'variants.storage'])->get();
    }

    public function getById($id)
    {
        return Product::with(['category', 'images', 'variants.ram', 'variants.storage'])->find($id);
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Basic product fields
            $productFields = [
                'name' => $data['name'] ?? null,
                'category_id' => $data['category_id'] ?? null,
                'description' => $data['description'] ?? null,
                'status' => $data['status'] ?? null,
            ];

            $product = Product::create($productFields);

            // Images (optional): [ { image: string }, ... ]
            if (!empty($data['images']) && is_array($data['images'])) {
                foreach ($data['images'] as $img) {
                    // Accept either string or object with image
                    $imagePath = is_array($img) ? ($img['image'] ?? null) : (string)$img;
                    if ($imagePath) {
                        Product_images::create([
                            'product_id' => $product->id,
                            'image' => $imagePath,
                        ]);
                    }
                }
            }

            // Variants (optional): [ { sku, model_name, price, quantity, ram_id, storage_id, stock, warranty_months }, ... ]
            if (!empty($data['variants']) && is_array($data['variants'])) {
                foreach ($data['variants'] as $variant) {
                    $sku = $variant['sku'] ?? null;
                    if (!$sku) {
                        $sku = $this->generateSku($product->id);
                    }
                    Product_variants::create([
                        'product_id' => $product->id,
                        'sku' => $sku,
                        'model_name' => $variant['model_name'] ?? 'Default',
                        'price' => $variant['price'] ?? 0,
                        'quantity' => $variant['quantity'] ?? 0,
                        'ram_id' => $variant['ram_id'] ?? null,
                        'storage_id' => $variant['storage_id'] ?? null,
                        'stock' => $variant['stock'] ?? null,
                        'warranty_months' => $variant['warranty_months'] ?? null,
                    ]);
                }
            }

            return $product->load(['category', 'images', 'variants']);
        });
    }

    public function update($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $product = Product::findOrFail($id);

            // Update product core fields
            $product->update([
                'name' => $data['name'] ?? $product->name,
                'category_id' => $data['category_id'] ?? $product->category_id,
                'description' => $data['description'] ?? $product->description,
                'status' => $data['status'] ?? $product->status,
            ]);

            // Sync images if provided
            if (array_key_exists('images', $data) && is_array($data['images'])) {
                // Normalize: each item could be string (new) or object {id?, image}
                $incoming = [];
                foreach ($data['images'] as $img) {
                    if (is_array($img)) {
                        $incoming[] = [
                            'id' => $img['id'] ?? null,
                            'image' => $img['image'] ?? null,
                        ];
                    } else {
                        $incoming[] = [
                            'id' => null,
                            'image' => (string)$img,
                        ];
                    }
                }

                // Existing images
                $existing = Product_images::where('product_id', $product->id)->get();
                $keepIds = [];

                // Upsert
                foreach ($incoming as $img) {
                    if (!empty($img['id'])) {
                        $pi = $existing->firstWhere('id', (int)$img['id']);
                        if ($pi) {
                            if (!empty($img['image'])) {
                                $pi->update(['image' => $img['image']]);
                            }
                            $keepIds[] = $pi->id;
                        }
                    } else {
                        if (!empty($img['image'])) {
                            $new = Product_images::create([
                                'product_id' => $product->id,
                                'image' => $img['image'],
                            ]);
                            $keepIds[] = $new->id;
                        }
                    }
                }

                // Delete removed ones
                if (!empty($keepIds)) {
                    Product_images::where('product_id', $product->id)
                        ->whereNotIn('id', $keepIds)
                        ->delete();
                } else {
                    // If provided empty array, clear all
                    Product_images::where('product_id', $product->id)->delete();
                }
            }

            // Sync variants if provided
            if (array_key_exists('variants', $data) && is_array($data['variants'])) {
                $existingVariants = Product_variants::where('product_id', $product->id)->get();
                $keepVarIds = [];

                foreach ($data['variants'] as $variant) {
                    $variantId = $variant['id'] ?? null;
                    $payload = [
                        'product_id' => $product->id,
                        'sku' => $variant['sku'] ?? null,
                        'model_name' => $variant['model_name'] ?? 'Default',
                        'price' => $variant['price'] ?? 0,
                        'quantity' => $variant['quantity'] ?? 0,
                        'ram_id' => $variant['ram_id'] ?? null,
                        'storage_id' => $variant['storage_id'] ?? null,
                        'stock' => $variant['stock'] ?? null,
                        'warranty_months' => $variant['warranty_months'] ?? null,
                    ];

                    if ($variantId) {
                        $ex = $existingVariants->firstWhere('id', (int)$variantId);
                        if ($ex) {
                            // Ensure SKU exists; if null generate
                            if (empty($payload['sku'])) {
                                $payload['sku'] = $ex->sku ?: $this->generateSku($product->id);
                            }
                            $ex->update($payload);
                            $keepVarIds[] = $ex->id;
                        }
                    } else {
                        if (empty($payload['sku'])) {
                            $payload['sku'] = $this->generateSku($product->id);
                        }
                        $newVar = Product_variants::create($payload);
                        $keepVarIds[] = $newVar->id;
                    }
                }

                // Delete removed variants
                if (!empty($keepVarIds)) {
                    Product_variants::where('product_id', $product->id)
                        ->whereNotIn('id', $keepVarIds)
                        ->delete();
                } else {
                    // If provided empty array, clear all variants
                    Product_variants::where('product_id', $product->id)->delete();
                }
            }

            return $product->load(['category', 'images', 'variants']);
        });
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        return $product->delete();
    }

    public function search(array $filters){
        return $this->productRepo->search($filters);
    }

    private function generateSku(int $productId): string
    {
        return 'SKU-' . $productId . '-' . substr((string) now()->timestamp, -10);
    }
}
