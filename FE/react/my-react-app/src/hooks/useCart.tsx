import { useState, useCallback } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch cart từ API
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/product/cart', {
        credentials: 'include', // Quan trọng: gửi cookie session
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      console.log('📦 API Response:', data);

      // XỬ LÝ ĐÚNG CẤU TRÚC TRẢ VỀ
      // API trả về: {success: true, message: "...", data: {cart: [...], total_price: ..., total_items: ...}}
      if (data.success && data.data) {
        const cartData = data.data.cart || [];
        setCart(cartData);
        setTotalPrice(data.data.total_price || 0);
        setTotalItems(data.data.total_items || 0);
        console.log('✅ Cart loaded:', cartData);
      } else {
        // Nếu không có data hoặc cart rỗng
        setCart([]);
        setTotalPrice(0);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('❌ Error fetching cart:', error);
      setCart([]);
      setTotalPrice(0);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = useCallback(async (variantId, quantity = 1) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/product/cart/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variant_id: variantId,
          quantity: quantity
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Sau khi thêm thành công, fetch lại giỏ hàng
        await fetchCart();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Có lỗi xảy ra' };
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      return { success: false, message: 'Không thể thêm vào giỏ hàng' };
    }
  }, [fetchCart]);

  // Cập nhật số lượng
  const updateQuantity = useCallback(async (variantId, newQuantity) => {
    if (newQuantity < 1) return { success: false, message: 'Số lượng phải >= 1' };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/product/cart/update', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variant_id: variantId,
          quantity: newQuantity
        })
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchCart();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Có lỗi xảy ra' };
      }
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      return { success: false, message: 'Không thể cập nhật số lượng' };
    }
  }, [fetchCart]);

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = useCallback(async (variantId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/product/cart/remove/${variantId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchCart();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Có lỗi xảy ra' };
      }
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
      return { success: false, message: 'Không thể xóa sản phẩm' };
    }
  }, [fetchCart]);

  // Xóa toàn bộ giỏ hàng
  const clearCart = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/product/cart/clear', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setCart([]);
        setTotalPrice(0);
        setTotalItems(0);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Có lỗi xảy ra' };
      }
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      return { success: false, message: 'Không thể xóa giỏ hàng' };
    }
  }, []);

  return {
    cart,
    totalPrice,
    totalItems,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
};