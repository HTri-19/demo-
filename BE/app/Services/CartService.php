<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product_variants;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Collection;

class CartService
{
    /**
     * Lấy hoặc tạo Session ID
     */
    private function getSessionId(): string
    {
        if (!Session::has('cart_session_id')) {
            Session::put('cart_session_id', Session::getId());
            Session::save();
        }
        
        $sessionId = Session::get('cart_session_id');
        \Log::info('🔑 Session ID:', ['session_id' => $sessionId]);
        
        return $sessionId;
    }

    /**
     * Lấy giỏ hàng từ database
     */
    public function getCart(): Collection
    {
        $sessionId = $this->getSessionId();
        
        $cartItems = Cart::where('session_id', $sessionId)
            ->with([
                'variant.product',
                'variant.ram',
                'variant.storage',
                'variant.model'
            ])
            ->get();
        
        \Log::info('🛒 Cart items from DB:', [
            'session_id' => $sessionId,
            'count' => $cartItems->count(),
            'items' => $cartItems->toArray()
        ]);
        
        return $cartItems;
    }

    /**
     * Thêm sản phẩm vào giỏ hàng
     */
    public function addItem(int $variantId, int $quantity = 1): Collection
    {
        $sessionId = $this->getSessionId();
        
        \Log::info('➕ Adding to cart', [
            'session_id' => $sessionId,
            'variant_id' => $variantId,
            'quantity' => $quantity
        ]);

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        $cartItem = Cart::where('session_id', $sessionId)
            ->where('variant_id', $variantId)
            ->first();

        if ($cartItem) {
            // Cộng dồn số lượng
            $cartItem->quantity += $quantity;
            $cartItem->save();
            
            \Log::info('✅ Updated existing cart item', [
                'id' => $cartItem->id,
                'new_quantity' => $cartItem->quantity
            ]);
        } else {
            // Tạo mới
            $cartItem = Cart::create([
                'session_id' => $sessionId,
                'variant_id' => $variantId,
                'quantity' => $quantity,
            ]);
            
            \Log::info('✅ Created new cart item', [
                'id' => $cartItem->id
            ]);
        }

        return $this->getCart();
    }

    /**
     * Cập nhật số lượng sản phẩm
     */
    public function updateQuantity(int $variantId, int $quantity): Collection
    {
        $sessionId = $this->getSessionId();
        
        $cartItem = Cart::where('session_id', $sessionId)
            ->where('variant_id', $variantId)
            ->first();

        if ($cartItem) {
            if ($quantity <= 0) {
                $cartItem->delete();
                \Log::info('🗑️ Deleted cart item (quantity = 0)');
            } else {
                $cartItem->quantity = $quantity;
                $cartItem->save();
                \Log::info('✅ Updated quantity', ['new_quantity' => $quantity]);
            }
        }

        return $this->getCart();
    }

    /**
     * Xóa sản phẩm khỏi giỏ hàng
     */
    public function removeItem(int $variantId): Collection
    {
        $sessionId = $this->getSessionId();
        
        Cart::where('session_id', $sessionId)
            ->where('variant_id', $variantId)
            ->delete();
        
        \Log::info('🗑️ Removed cart item', ['variant_id' => $variantId]);

        return $this->getCart();
    }

    /**
     * Xóa toàn bộ giỏ hàng
     */
    public function clear(): void
    {
        $sessionId = $this->getSessionId();
        
        Cart::where('session_id', $sessionId)->delete();
        
        \Log::info('🗑️ Cleared entire cart', ['session_id' => $sessionId]);
    }

    /**
     * Kiểm tra sản phẩm có trong giỏ không
     */
    public function hasItem(int $variantId): bool
    {
        $sessionId = $this->getSessionId();
        
        return Cart::where('session_id', $sessionId)
            ->where('variant_id', $variantId)
            ->exists();
    }

    /**
     * Tổng số lượng sản phẩm
     */
    public function getTotalItems(): int
    {
        $sessionId = $this->getSessionId();
        
        return Cart::where('session_id', $sessionId)
            ->sum('quantity');
    }

    /**
     * Tổng giá trị giỏ hàng
     */
    public function getTotal(): float
    {
        $sessionId = $this->getSessionId();
        
        $cartItems = Cart::where('session_id', $sessionId)
            ->with('variant')
            ->get();

        $total = 0;
        foreach ($cartItems as $item) {
            if ($item->variant) {
                $total += $item->variant->price * $item->quantity;
            }
        }

        return $total;
    }

    /**
     * Kiểm tra giỏ hàng có trống không
     */
    public function isEmpty(): bool
    {
        $sessionId = $this->getSessionId();
        
        return !Cart::where('session_id', $sessionId)->exists();
    }
}