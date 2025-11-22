<?php

namespace App\Services;

use App\Models\Product_variants;
use Illuminate\Support\Collection;

class CartService
{
    private const CART_KEY = 'shopping_cart';

    /**
     * Lấy giỏ hàng từ session
     */
    public function getCart(): Collection
    {
        $cart = session()->get(self::CART_KEY, []);
        return collect($cart);
    }

    /**
     * Thêm biến thể sản phẩm vào giỏ hàng
     * @param int|string $variantId - ID biến thể sản phẩm
     * @param int $quantity - Số lượng
     * @return Collection - Giỏ hàng sau khi thêm
     */
    public function addItem($variantId, $quantity = 1): Collection
    {
        // Convert variantId thành string để nhất quán
        $variantId = (string)$variantId;

        $cart = $this->getCart();

        // Lấy thông tin biến thể sản phẩm
        $variant = Product_variants::with('product', 'rams', 'storage')->find($variantId);

        if (!$variant) {
            throw new \Exception('Product variant not found');
        }

        // Nếu biến thể đã có trong giỏ, tăng số lượng
        if ($cart->has($variantId)) {
            $cart[$variantId]['quantity'] += $quantity;
        } else {
            // Nếu chưa có, thêm biến thể mới
            $cart[$variantId] = [
                'variant_id' => $variantId,
                'product_id' => $variant->product_id,
                'product_name' => $variant->product->name,
                'model_name' => $variant->model_name,
                'sku' => $variant->sku,
                'price' => (float)$variant->price,
                'quantity' => $quantity,
                'ram_id' => $variant->ram_id,
                'ram_name' => $variant->ram->name ?? null,
                'ram_value' => $variant->ram->value ?? null,
                'storage_id' => $variant->storage_id,
                'storage_name' => $variant->storage->name ?? null,
                'storage_value' => $variant->storage->value ?? null,
                'warranty_months' => $variant->warranty_months,
                'stock' => $variant->stock,
            ];
        }

        // Lưu vào session
        session()->put(self::CART_KEY, $cart->toArray());

        return $this->getCart();
    }

    /**
     * Cập nhật số lượng biến thể sản phẩm
     * @param int|string $variantId - ID biến thể sản phẩm
     * @param int $quantity - Số lượng mới (0 = xóa)
     * @return Collection - Giỏ hàng sau khi cập nhật
     */
    public function updateQuantity($variantId, $quantity): Collection
    {
        // Convert variantId thành string
        $variantId = (string)$variantId;

        $cart = $this->getCart();

        // Nếu quantity <= 0, xóa biến thể
        if ($quantity <= 0) {
            $cart->forget($variantId);
        } else {
            // Nếu biến thể có trong giỏ, cập nhật số lượng
            if ($cart->has($variantId)) {
                $cart[$variantId]['quantity'] = $quantity;
            }
        }

        // Lưu vào session
        session()->put(self::CART_KEY, $cart->toArray());

        return $this->getCart();
    }

    /**
     * Xóa biến thể sản phẩm khỏi giỏ hàng
     * @param int|string $variantId - ID biến thể sản phẩm
     * @return Collection - Giỏ hàng sau khi xóa
     */
    public function removeItem($variantId): Collection
    {
        // Convert variantId thành string
        $variantId = (string)$variantId;

        $cart = $this->getCart();
        $cart->forget($variantId);

        // Lưu vào session
        session()->put(self::CART_KEY, $cart->toArray());

        return $this->getCart();
    }

    /**
     * Xóa toàn bộ giỏ hàng
     */
    public function clear(): void
    {
        session()->forget(self::CART_KEY);
    }

    /**
     * Lấy tổng số lượng sản phẩm trong giỏ
     * @return int - Tổng số lượng
     */
    public function getTotalItems(): int
    {
        return $this->getCart()->sum('quantity');
    }

    /**
     * Lấy tổng tiền của giỏ hàng
     * @return float - Tổng tiền
     */
    public function getTotal(): float
    {
        return (float)$this->getCart()->sum(function ($item) {
            return $item['quantity'] * $item['price'];
        });
    }

    /**
     * Kiểm tra giỏ hàng có trống không
     * @return bool - true nếu trống, false nếu có sản phẩm
     */
    public function isEmpty(): bool
    {
        return $this->getCart()->isEmpty();
    }

    /**
     * Kiểm tra biến thể có trong giỏ không
     * @param int|string $variantId - ID biến thể sản phẩm
     * @return bool - true nếu có, false nếu không
     */
    public function hasItem($variantId): bool
    {
        $variantId = (string)$variantId;
        return $this->getCart()->has($variantId);
    }

    /**
     * Lấy số lượng của biến thể trong giỏ
     * @param int|string $variantId - ID biến thể sản phẩm
     * @return int - Số lượng (0 nếu không có)
     */
    public function getItemQuantity($variantId): int
    {
        $variantId = (string)$variantId;
        return $this->getCart()->get($variantId, [])['quantity'] ?? 0;
    }
}
