<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;

class ProductService
{
    protected $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    /**
     * Lấy tất cả sản phẩm với giá + hình ảnh
     */
    public function getAll()
    {
        // Load category, variants, và images
        $products = Product::with(['category', 'variants', 'images'])->get();

        // Transform để thêm giá vào
        return $products->map(function ($product) {
            return $this->formatProduct($product);
        });
    }

    /**
     * Lấy 1 sản phẩm theo ID
     */
    public function getById($id)
    {
        $product = Product::with(['category', 'variants', 'images'])->find($id);

        if (!$product) {
            return null;
        }

        return $this->formatProduct($product);
    }

    /**
     * Format product kèm giá từ variant + hình ảnh
     */

private function formatProduct($product)
{
    // Lấy variant đầu tiên (có giá)
    $variant = $product->variants->first();

    // Lấy hình ảnh đầu tiên
    $firstImage = $product->images->first();

    // Hàm helper để tạo full URL cho ảnh
    $getImageUrl = function($imagePath) {
        if (!$imagePath) return null;

        // Nếu là URL đầy đủ, trả về như cũ
        if (strpos($imagePath, 'http') === 0) {
            return $imagePath;
        }

        // Nếu là đường dẫn file, thêm /storage/
        return url('storage/' . $imagePath);
    };

    return [
        'id' => $product->id,
        'name' => $product->name,
        'category_id' => $product->category_id,
        'description' => $product->description,
        'image' => $getImageUrl($product->image), // Full URL
        'status' => $product->status,
        'category' => $product->category,
        // Từ variant
        'price' => $variant?->price ?? 0,
        'model_name' => $variant?->model_name,
        'sku' => $variant?->sku,
        'stock' => $variant?->stock ?? 0,
        'quantity' => $variant?->quantity ?? 0,
        // Từ product_images - Full URL
        'images' => $product->images->map(function ($img) use ($getImageUrl) {
            $imagePath = $img->image_url ?? $img->image;
            return [
                'id' => $img->id,
                'image_url' => $getImageUrl($imagePath),
                'alt_text' => $img->alt_text ?? null,
            ];
        })->toArray(),
        'first_image' => $getImageUrl($firstImage?->image_url ?? $firstImage?->image ?? $product->image),
        'variants' => $product->variants,
        'created_at' => $product->created_at,
        'updated_at' => $product->updated_at,
    ];
}

    /**
     * Tạo sản phẩm mới
     */
    public function create(array $data)
    {
        $product = Product::create($data);
return $this->getById($product->id);
    }

    /**
     * Cập nhật sản phẩm
     */
    public function update($id, array $data)
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $this->getById($id);
    }

    /**
     * Xóa sản phẩm
     */
    public function delete($id)
    {
        $product = Product::findOrFail($id);
        return $product->delete();
    }

    /**
     * Tìm kiếm sản phẩm
     */
    public function search(array $filters)
    {
        return $this->productRepo->search($filters);
    }
}