<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Product_variants;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    // Lấy tất cả variant theo product_id
    public function index($product_id)
    {
        $variants = Product_variants::where('product_id', $product_id)->get();
        return response()->json($variants);
    }

    // Lấy tất cả variant
    public function getAllVariants()
    {
        $variants = Product_variants::all();
        return response()->json($variants);
    }

    // Lấy variant theo id
    public function show($id)
    {
        $variant = Product_variants::findOrFail($id);
        return response()->json($variant);
    }

    // Lấy variant theo storage_id
    public function getByStorage($storage_id)
    {
        $variants = Product_variants::where('storage_id', $storage_id)->get();
        return response()->json($variants);
    }

    // Lấy variant theo ram_id
    public function getByRam($ram_id)
    {
        $variants = Product_variants::where('ram_id', $ram_id)->get();
        return response()->json($variants);
    }

    // Thêm variant mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'sku' => 'required|string|max:100|unique:product_variants',
            'model_name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'ram_id' => 'nullable|integer',
            'storage_id' => 'nullable|integer',
            'price' => 'required|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'warranty_months' => 'nullable|integer|min:0',
        ]);

        $variant = Product_variants::create($validated);
        return response()->json([
            'message' => 'Variant đã được thêm thành công',
            'data' => $variant
        ], 201);
    }

    // Cập nhật variant
    public function update(Request $request, $id)
    {
        $variant = Product_variants::findOrFail($id);

        $validated = $request->validate([
            'sku' => 'sometimes|string|max:100|unique:product_variants,sku,' . $id,
            'model_name' => 'sometimes|string|max:100',
            'price' => 'sometimes|numeric|min:0',
            'quantity' => 'sometimes|integer|min:0',
            'ram_id' => 'nullable|integer',
            'storage_id' => 'nullable|integer',
            'stock' => 'nullable|integer|min:0',
            'warranty_months' => 'nullable|integer|min:0',
        ]);

        $variant->update($validated);
        return response()->json([
            'message' => 'Cập nhật variant thành công',
            'data' => $variant
        ]);
    }

    // Xóa variant
    public function destroy($id)
    {
        $variant = Product_variants::findOrFail($id);
        $variant->delete();
        return response()->json(['message' => 'Đã xóa variant thành công']);
    }

    // Lấy variant với các mối quan hệ
    public function showWithRelations($id)
    {
        $variant = Product_variants::with(['product', 'storage', 'orderDetails'])
            ->findOrFail($id);
        return response()->json($variant);
    }

    // Tìm kiếm variant theo SKU
    public function searchBySku($sku)
    {
        $variant = Product_variants::where('sku', $sku)->firstOrFail();
        return response()->json($variant);
    }
    public function keywordkha(){
        return "kha có gì hết";
    }
}
