<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
{
    $products = Product::with(['images', 'variants'])->paginate(12);

    return response()->json([
        'success' => true,
        'message' => 'Lấy danh sách sản phẩm thành công',
        'data' => $products
    ]);
}

    public function show($id): JsonResponse
    {
        $product = $this->productService->getById($id);
        return response()->json($product);
    }

    public function store(ProductRequest $request): JsonResponse
    {
        $product = $this->productService->create($request->validated());
        return response()->json($product, 201);
    }

    public function update(ProductRequest $request, $id): JsonResponse
    {
        $product = $this->productService->update($id, $request->validated());
        return response()->json($product);
    }

    public function destroy($id): JsonResponse
    {
        $this->productService->delete($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
