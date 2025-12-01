<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CartService;
use App\Models\Product_variants;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
//
class CartController extends Controller
{
    private CartService $cartService;

    /**
     * Constructor - Inject CartService
     */
    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * GET /api/cart
     * Lấy giỏ hàng hiện tại
     */
    public function index(): JsonResponse
    {
        $cart = $this->cartService->getCart();
        $totalItems = $this->cartService->getTotalItems();
        $total = $this->cartService->getTotal();

        return response()->json([
            'success' => true,
            'message' => 'Lấy giỏ hàng thành công',
            'data' => [
                'items' => $cart->values(),
                'total_items' => $totalItems,
                'total_price' => $total,
                'is_empty' => $this->cartService->isEmpty(),
            ]
        ], 200);
    }

    /**
     * POST /api/cart/add
     * Thêm biến thể sản phẩm vào giỏ hàng
     */
    public function add(Request $request): JsonResponse
    {
        // Validate input
        $validated = $request->validate([
            'variant_id' => 'required|integer|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        try {
            // Lấy thông tin biến thể sản phẩm
            $variant = Product_variants::with('product', 'rams', 'storage')->find($validated['variant_id']);

            if (!$variant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Biến thể sản phẩm không tồn tại'
                ], 404);
            }

            // Kiểm tra tồn kho từ cột stock trong product_variants
            if ($variant->stock < $validated['quantity']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Số lượng vượt quá tồn kho',
                    'data' => [
                        'available_stock' => $variant->stock,
                        'requested_quantity' => $validated['quantity']
                    ]
                ], 400);
            }

            // Thêm vào giỏ hàng
            $cart = $this->cartService->addItem(
                $validated['variant_id'],
                $validated['quantity']
            );

            return response()->json([
                'success' => true,
                'message' => 'Sản phẩm đã được thêm vào giỏ hàng',
                'data' => [
                    'variant_id' => $validated['variant_id'],
                    'product_name' => $variant->product->name,
                    'model_name' => $variant->model_name,
                    'sku' => $variant->sku,
                    'quantity' => $validated['quantity'],
                    'price' => $variant->price,
                    'rams' => $variant->ram->name . ' (' . $variant->ram->value . ')',
                    'storage' => $variant->storage->name . ' (' . $variant->storage->value . ')',
                    'warranty_months' => $variant->warranty_months,
                    'cart_summary' => [
                        'items' => $cart->values(),
                        'total_items' => $this->cartService->getTotalItems(),
                        'total_price' => $this->cartService->getTotal(),
                    ]
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm sản phẩm: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT /api/cart/{variantId}
     * Cập nhật số lượng biến thể sản phẩm
     */
    public function update(Request $request, $variantId): JsonResponse
    {
        // Convert variantId thành string
        $variantId = (string)$variantId;

        // Validate input
        $validated = $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        // Kiểm tra biến thể có trong giỏ không
        if (!$this->cartService->hasItem($variantId)) {
            return response()->json([
                'success' => false,
                'message' => 'Biến thể sản phẩm không có trong giỏ hàng'
            ], 404);
        }

        // Nếu quantity = 0, xóa sản phẩm (không cần kiểm tra tồn kho)
        if ($validated['quantity'] == 0) {
            $cart = $this->cartService->updateQuantity($variantId, 0);

            return response()->json([
                'success' => true,
                'message' => 'Sản phẩm đã được xóa khỏi giỏ hàng',
                'data' => [
                    'items' => $cart->values(),
                    'total_items' => $this->cartService->getTotalItems(),
                    'total_price' => $this->cartService->getTotal(),
                ]
            ]);
        }

        // Kiểm tra tồn kho khi quantity > 0
        $variant = Product_variants::find($variantId);

        if (!$variant) {
            return response()->json([
                'success' => false,
                'message' => 'Biến thể sản phẩm không tồn tại'
            ], 404);
        }

        if ($variant->stock < $validated['quantity']) {
            return response()->json([
                'success' => false,
                'message' => 'Số lượng vượt quá tồn kho',
                'data' => [
                    'available_stock' => $variant->stock,
                    'requested_quantity' => $validated['quantity']
                ]
            ], 400);
        }

        // Cập nhật số lượng
        $cart = $this->cartService->updateQuantity($variantId, $validated['quantity']);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật giỏ hàng thành công',
            'data' => [
                'variant_id' => $variantId,
                'quantity' => $validated['quantity'],
                'cart_summary' => [
                    'items' => $cart->values(),
                    'total_items' => $this->cartService->getTotalItems(),
                    'total_price' => $this->cartService->getTotal(),
                ]
            ]
        ]);
    }

    /**
     * DELETE /api/cart/{variantId}
     * Xóa biến thể sản phẩm khỏi giỏ hàng
     */
    public function remove($variantId): JsonResponse
    {
        // Convert variantId thành string
        $variantId = (string)$variantId;

        // Kiểm tra biến thể có trong giỏ không
        if (!$this->cartService->hasItem($variantId)) {
            return response()->json([
                'success' => false,
                'message' => 'Biến thể sản phẩm không có trong giỏ hàng'
            ], 404);
        }

        // Xóa sản phẩm
        $cart = $this->cartService->removeItem($variantId);

        return response()->json([
            'success' => true,
            'message' => 'Sản phẩm đã được xóa khỏi giỏ hàng',
            'data' => [
                'variant_id' => $variantId,
                'cart_summary' => [
                    'items' => $cart->values(),
                    'total_items' => $this->cartService->getTotalItems(),
                    'total_price' => $this->cartService->getTotal(),
                ]
            ]
        ]);
    }

    /**
     * DELETE /api/cart
     * Xóa toàn bộ giỏ hàng
     */
    public function clear(): JsonResponse
    {
        $this->cartService->clear();

        return response()->json([
            'success' => true,
            'message' => 'Giỏ hàng đã được xóa',
            'data' => [
                'items' => [],
                'total_items' => 0,
                'total_price' => 0,
                'is_empty' => true,
            ]
        ]);
    }
}
