<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Category;      // ✅ Import Category (singular)
use App\Models\Product;
use App\Models\Product_variants;
use App\Models\Product_images;
use App\Models\Ram;
use App\Models\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage as StorageFacade;

class AdminProductController extends Controller
{
    /**
     * Lấy danh sách sản phẩm
     */
    public function index()
    {
        $products = Product::with(['category', 'variants', 'images'])
            ->paginate(10);
        return response()->json($products);
    }

    /**
     * Tạo sản phẩm mới
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'status' => 'required|string|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            // Tạo sản phẩm
            $product = Product::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'category_id' => $validated['category_id'],
                'status' => $validated['status'],
            ]);

            // Lưu ảnh
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $path = $image->store('products', 'public');

                Product_images::create([
                    'product_id' => $product->id,
                    'image' => $path,
                ]);
            }

            return response()->json([
                'message' => 'Tạo sản phẩm thành công',
                'id' => $product->id,
                'data' => $product->load(['category', 'images'])
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi tạo sản phẩm: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Xem chi tiết sản phẩm
     */
    public function show($id)
    {
        $product = Product::with(['category', 'variants', 'images'])
            ->find($id);

        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        return response()->json($product);
    }

    /**
     * Cập nhật sản phẩm
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        $validated = $request->validate([
            'name' => 'string|max:100',
            'description' => 'string',
            'category_id' => 'integer|exists:categories,id',
            'status' => 'string|max:100',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $product->update($validated);

            // Cập nhật ảnh nếu có
            if ($request->hasFile('image')) {
                // Xóa ảnh cũ
                $oldImages = Product_images::where('product_id', $id)->get();
                foreach ($oldImages as $oldImage) {
                    StorageFacade::disk('public')->delete($oldImage->image);
                    $oldImage->delete();
                }

                // Lưu ảnh mới
                $image = $request->file('image');
                $path = $image->store('products', 'public');

                Product_images::create([
                    'product_id' => $product->id,
                    'image' => $path,
                ]);
            }

            return response()->json([
                'message' => 'Cập nhật sản phẩm thành công',
                'data' => $product->load(['category', 'images'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi cập nhật: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Xóa sản phẩm
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        try {
            // Xóa ảnh
            $images = Product_images::where('product_id', $id)->get();
            foreach ($images as $image) {
                StorageFacade::disk('public')->delete($image->image);
            }

            $product->delete();

            return response()->json(['message' => 'Xóa sản phẩm thành công']);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi xóa: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Tạo variant cho sản phẩm
     */
    public function storeVariant(Request $request, $productId)
    {
        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        $validated = $request->validate([
            'model_name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'ram_id' => 'nullable|integer|exists:rams,id',
            'storage_id' => 'nullable|integer|exists:storages,id',
            'warranty_months' => 'nullable|integer',
        ]);

        try {
            // Generate SKU
            $sku = 'SKU-' . $productId . '-' . time();

            $variant = Product_variants::create([
                'product_id' => $productId,
                'sku' => $sku,
                'model_name' => $validated['model_name'],
                'price' => $validated['price'],
                'quantity' => $validated['quantity'],
                'ram_id' => $validated['ram_id'] ?? null,
                'storage_id' => $validated['storage_id'] ?? null,
                'stock' => $validated['quantity'],
                'warranty_months' => $validated['warranty_months'] ?? 12,
            ]);

            return response()->json([
                'message' => 'Tạo variant thành công',
                'data' => $variant
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi tạo variant: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Lấy danh sách danh mục
     */
    public function getCategories()
    {
        // ✅ FIXED: Category (singular)
        return response()->json(Categories::all());
    }

    /**
     * Lấy danh sách RAM
     */
    public function getRams()
    {
        return response()->json(Ram::all());
    }

    /**
     * Lấy danh sách Storage
     */
    public function getStorages()
    {
        return response()->json(Storage::all());
    }
   public function updateVariant(Request $request, $id, $variantId)
{
    $product = Product::find($id);
    if (!$product) {
        return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
    }

    $variant = Product_variants::where('id', $variantId)
        ->where('product_id', $id)
        ->first();

    if (!$variant) {
        return response()->json(['message' => 'Variant không tồn tại'], 404);
    }

    // FIXED VALIDATE
    $validated = $request->validate([
        'model_name' => 'sometimes|string|max:100',
        'price' => 'sometimes|numeric|min:0',
        'quantity' => 'sometimes|integer|min:1',
        'ram_id' => 'nullable|integer',
        'storage_id' => 'nullable|integer',
        'warranty_months' => 'nullable|integer',
    ]);

    try {
        $variant->update([
            'model_name' => $validated['model_name'] ?? $variant->model_name,
            'price' => isset($validated['price']) ? (float) $validated['price'] : $variant->price,
            'quantity' => isset($validated['quantity']) ? (int) $validated['quantity'] : $variant->quantity,
            'stock' => isset($validated['quantity']) ? (int) $validated['quantity'] : $variant->stock,
            'ram_id' => $validated['ram_id'] ?? $variant->ram_id,
            'storage_id' => $validated['storage_id'] ?? $variant->storage_id,
            'warranty_months' => $validated['warranty_months'] ?? $variant->warranty_months,
        ]);

        return response()->json([
            'message' => 'Cập nhật variant thành công',
            'data' => $variant->fresh()
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Lỗi: ' . $e->getMessage(),
        ], 500);
    }
}
    /**
     * Xóa variant
     */
    public function destroyVariant($id, $variantId)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        $variant = Product_variants::where('id', $variantId)
            ->where('product_id', $id)
            ->first();

        if (!$variant) {
            return response()->json(['message' => 'Variant không tồn tại'], 404);
        }

        try {
            $variant->delete();
            return response()->json(['message' => 'Xóa variant thành công']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi xóa variant: ' . $e->getMessage()
            ], 500);
        }
    }
}
