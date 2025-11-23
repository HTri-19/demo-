import Frame65 from "../assets/images/Frame 65.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { cart, totalPrice, totalItems, loading, fetchCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    console.log('🔄 Component mounted - Fetching cart...');
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    console.log('📦 Cart state changed:', { 
      cart, 
      totalPrice, 
      totalItems 
    });
  }, [cart, totalPrice, totalItems]);

  const handleUpdateQuantity = async (variantId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const result = await updateQuantity(variantId, newQuantity);
    if (!result.success) {
      alert('❌ ' + result.message);
    }
  };

  const handleRemoveItem = async (variantId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      const result = await removeFromCart(variantId);
      if (!result.success) {
        alert('❌ ' + result.message);
      }
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Bạn chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
      const result = await clearCart();
      if (!result.success) {
        alert('❌ ' + result.message);
      }
    }
  };

  const finalTotal = totalPrice - discount;

  if (loading) {
    return <div className="text-center py-8 text-lg">Đang tải giỏ hàng...</div>;
  }

  // ✅ XỬ LÝ ĐÚNG: cart đã là array từ useCart hook
  const hasItems = Array.isArray(cart) && cart.length > 0;

  console.log('🔍 Render check:', { 
    cart, 
    isArray: Array.isArray(cart),
    hasItems,
    length: cart?.length 
  });

  return (
    <>
      {/* MAIN HEADER */}
      <header className="main-header">
        <div className="container header-inner">
          <Link to="/">
            <div className="logo">
              <img src={Frame65} alt="T&T Center" />
            </div>
          </Link>
          <nav className="header-nav">
            <Link to="/category">
              <a href="#" className="menu-btn">
                <i className="fa-solid fa-bars"></i> Danh mục
              </a>
            </Link>
            <a href="#" className="location-btn">
              <i className="fa-solid fa-location-dot"></i> Xem giá tại Hà Nội
            </a>
          </nav>

          <div className="search-box">
            <input type="text" placeholder="Nhập tên sản phẩm cần tìm..." />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="header-actions">
            <Link to="/cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng ({totalItems || 0})
            </Link>
            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      <section className="section-body">
        <div className="cart-container">
          <h2>🛒 Chọn sản phẩm ({totalItems || 0} sản phẩm)</h2>

          <div className="progress-bar">
            <div className="step active">Chọn sản phẩm</div>
            <div className="step">Thông tin đặt hàng</div>
            <div className="step">Hoàn tất đặt hàng</div>
          </div>

          {/* Danh sách sản phẩm */}
          {hasItems ? (
            <>
              {cart.map((item, index) => (
                <div key={item.variant_id || index} className="cart-item">
                  <div className="item-info">
                    <h3>{item.product_name || 'N/A'} - {item.model_name || 'N/A'}</h3>
                    <p className="sku">SKU: {item.sku || 'N/A'}</p>
                    <p className="specs" style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                      📱 RAM: {item.ram_name || 'N/A'} ({item.ram_value || 'N/A'}) | 💾 Storage: {item.storage_name || 'N/A'} ({item.storage_value || 'N/A'})
                    </p>
                    <p className="warranty" style={{ fontSize: '14px', color: '#666' }}>
                      ✓ Bảo hành: {item.warranty_months || 0} tháng
                    </p>
                    <p className="price" style={{ marginTop: '10px' }}>
                      Giá: <strong>{parseInt(item.price || 0).toLocaleString('vi-VN')} ₫</strong>
                    </p>
                    
                    <div className="quantity-wrapper" style={{ marginTop: '10px' }}>
                      <span className="label">Số lượng:</span>
                      <div className="quantity" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button 
                          className="minus"
                          onClick={() => handleUpdateQuantity(item.variant_id, (item.quantity || 1) - 1)}
                          style={{ 
                            padding: '5px 12px', 
                            background: '#dc3545', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}
                        >
                          -
                        </button>
                        <input 
                          type="text" 
                          value={item.quantity || 1} 
                          readOnly 
                          style={{ 
                            width: '60px', 
                            textAlign: 'center',
                            padding: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }} 
                        />
                        <button 
                          className="plus"
                          onClick={() => handleUpdateQuantity(item.variant_id, (item.quantity || 1) + 1)}
                          style={{ 
                            padding: '5px 12px', 
                            background: '#28a745', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <p className="total" style={{ marginTop: '10px', fontSize: '16px' }}>
                      Thành tiền: <strong style={{ color: '#007bff' }}>{((item.price || 0) * (item.quantity || 1)).toLocaleString('vi-VN')} ₫</strong>
                    </p>
                  </div>
                  
                  <button
                    className="delete-btn"
                    onClick={() => handleRemoveItem(item.variant_id)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      fontSize: '28px', 
                      cursor: 'pointer',
                      color: '#dc3545',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              {/* Tổng kết giỏ hàng */}
              <div className="cart-summary" style={{ 
                marginTop: '30px', 
                padding: '25px', 
                border: '2px solid #007bff', 
                borderRadius: '8px',
                background: '#f8f9fa'
              }}>
                <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#333' }}>
                  💰 TỔNG KẾT ĐỠN HÀNG
                </h3>
                
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
                  <p style={{ fontSize: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tổng số lượng:</span>
                    <span style={{ fontWeight: 'bold', color: '#007bff' }}>{totalItems} sản phẩm</span>
                  </p>
                  
                  <p style={{ fontSize: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tổng tiền tạm tính:</span>
                    <span style={{ fontWeight: 'bold', color: '#007bff' }}>{(totalPrice || 0).toLocaleString('vi-VN')} ₫</span>
                  </p>

                  <div className="discount" style={{ marginBottom: '15px', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Mã giảm giá:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="number"
                        placeholder="Nhập số tiền giảm giá"
                        value={discount}
                        onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                        style={{ 
                          flex: 1, 
                          padding: '10px', 
                          border: '1px solid #ddd', 
                          borderRadius: '4px',
                          fontSize: '15px'
                        }}
                      />
                      <button style={{ 
                        padding: '10px 20px', 
                        background: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 'bold'
                      }}>
                        Áp dụng
                      </button>
                    </div>
                  </div>

                  {discount > 0 && (
                    <p style={{ fontSize: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Giảm giá:</span>
                      <span style={{ color: '#dc3545', fontWeight: 'bold' }}>-{discount.toLocaleString('vi-VN')} ₫</span>
                    </p>
                  )}
                  
                  <div style={{ 
                    borderTop: '2px solid #007bff', 
                    paddingTop: '15px', 
                    marginTop: '15px',
                    background: 'white',
                    padding: '15px',
                    borderRadius: '5px'
                  }}>
                    <p style={{ fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>Tổng thanh toán:</span>
                      <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '24px' }}>
                        {finalTotal.toLocaleString('vi-VN')} ₫
                      </span>
                    </p>
                  </div>
                </div>

                <div className="cart-buttons" style={{ marginTop: '25px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
                  <Link to="/checkcart" style={{ textDecoration: 'none' }}>
                    <button style={{ 
                      width: '100%',
                      padding: '15px', 
                      background: '#007bff', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      cursor: 'pointer', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#0056b3'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#007bff'}
                    >
                      ✓ TIẾN HÀNH ĐẶT HÀNG
                    </button>
                  </Link>
                  
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <button style={{ 
                      width: '100%',
                      padding: '15px', 
                      background: '#6c757d', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      cursor: 'pointer', 
                      fontSize: '16px',
                      fontWeight: 'bold',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#5a6268'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#6c757d'}
                    >
                      ← CHỌN THÊM SẢN PHẨM KHÁC
                    </button>
                  </Link>
                  
                  <button
                    onClick={handleClearCart}
                    style={{ 
                      padding: '15px', 
                      background: '#dc3545', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      cursor: 'pointer', 
                      fontSize: '16px',
                      fontWeight: 'bold',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
                  >
                    🗑️ XÓA TOÀN BỘ GIỎ HÀNG
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              border: '2px dashed #ddd'
            }}>
              <p style={{ fontSize: '48px', marginBottom: '15px' }}>🛒</p>
              <p style={{ fontSize: '22px', marginBottom: '10px', color: '#666', fontWeight: '500' }}>
                Giỏ hàng của bạn đang trống
              </p>
              <p style={{ fontSize: '16px', marginBottom: '25px', color: '#999' }}>
                Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
              </p>
              <Link to="/">
                <button style={{ 
                  padding: '15px 40px', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#0056b3'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#007bff'}
                >
                  ← KHÁM PHÁ SẢN PHẨM
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;