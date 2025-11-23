import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";

const Checkcart = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, totalItems, loading, fetchCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    delivery: 'pickup',
    store: 'store1',
    notes: '',
    payment: 'cash',
  });

  const [submitting, setSubmitting] = useState(false);

  // Fetch cart khi component mount
  useEffect(() => {
    console.log('🔄 Checkcart - Fetching cart...');
    fetchCart();
  }, [fetchCart]);

  // Debug cart data
  useEffect(() => {
    console.log('📦 Checkcart - Cart data:', { 
      cart, 
      cartType: typeof cart,
      isArray: Array.isArray(cart),
      totalPrice, 
      totalItems 
    });
  }, [cart, totalPrice, totalItems]);

  // Redirect nếu giỏ hàng trống
  useEffect(() => {
    if (!loading && totalItems === 0) {
      alert('Giỏ hàng trống! Vui lòng chọn sản phẩm.');
      navigate('/cart');
    }
  }, [loading, totalItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.email) {
      alert('❌ Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setSubmitting(true);

    try {
      // Chuẩn bị dữ liệu đơn hàng
      const cartArray = Array.isArray(cart) ? cart : (cart?.cart || []);
      
      const orderData = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        delivery_method: formData.delivery,
        store_id: formData.store,
        notes: formData.notes,
        payment_method: formData.payment,
        items: cartArray,
        total_price: totalPrice,
        total_items: totalItems,
      };

      console.log('📦 Dữ liệu đơn hàng:', orderData);

      // Gửi lên API để tạo đơn hàng
      const response = await fetch('http://127.0.0.1:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Quan trọng để gửi session
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ ' + data.message);
        navigate('/');
      } else {
        alert('❌ ' + data.message);
      }
    } catch (error) {
      console.error('❌ Lỗi gửi đơn hàng:', error);
      alert('❌ Lỗi khi gửi đơn hàng: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-lg">Đang tải...</div>;
  }

  // Xử lý cart data - có thể là array hoặc object
  const cartArray = Array.isArray(cart) ? cart : (cart?.cart || []);
  const displayTotalPrice = totalPrice || 0;
  const displayTotalItems = totalItems || 0;

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
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng ({displayTotalItems})
            </Link>
            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      <section className="order-section">
        <div className="container-tt">
          <button className="back-btn">
            <Link to="/cart" className="return">
              ← Quay lại
            </Link>
          </button>

          <h2>🛒 Thông tin đặt hàng</h2>

          <div className="progress-bar mt-5">
            <div className="step">Chọn sản phẩm</div>
            <div className="step active">Thông tin đặt hàng</div>
            <div className="step">Hoàn tất đặt hàng</div>
          </div>

          {/* DEBUG INFO */}
          <div style={{ padding: '10px', background: '#fff3cd', margin: '10px 0', fontSize: '12px', border: '1px solid #ffc107', borderRadius: '5px' }}>
            <strong>🐛 Debug:</strong> cartArray.length = {cartArray.length} | totalItems = {displayTotalItems} | totalPrice = {displayTotalPrice}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Form */}
            <form className="order-form" onSubmit={handleSubmit}>
              <h3>Thông tin khách hàng</h3>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên *"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại *"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <h3>Chọn cách thức giao hàng</h3>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={formData.delivery === 'pickup'}
                    onChange={handleInputChange}
                  />
                  {' '}Nhận tại cửa hàng
                </label>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={formData.delivery === 'delivery'}
                    onChange={handleInputChange}
                  />
                  {' '}Giao hàng tận nơi
                </label>
              </div>

              <select
                name="store"
                value={formData.store}
                onChange={handleInputChange}
              >
                <option value="">Chọn địa chỉ cửa hàng để nhận</option>
                <option value="store1">Chi nhánh 1 - Quận 1</option>
                <option value="store2">Chi nhánh 2 - Quận 7</option>
              </select>

              <textarea
                name="notes"
                placeholder="Yêu cầu khác..."
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>

              <h3>Hình thức thanh toán</h3>
              <div className="payment">
                <div
                  className={`payment-box ${formData.payment === 'cash' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, payment: 'cash' }))}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1042/1042339.png"
                    alt="Thanh toán tại cửa hàng"
                  />
                  <p>Thanh toán tại cửa hàng</p>
                </div>
                <div
                  className={`payment-box ${formData.payment === 'cod' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, payment: 'cod' }))}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/764/764600.png"
                    alt="Thanh toán khi nhận hàng"
                  />
                  <p>Thanh toán khi nhận hàng</p>
                </div>
              </div>

              <div className="cart-buttons">
                <button
                  className="btn-primary"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? '⏳ Đang xử lý...' : '✓ Xác nhận đơn hàng'}
                </button>
              </div>
            </form>

            {/* Tóm tắt giỏ hàng */}
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', height: 'fit-content', backgroundColor: '#f8f9fa' }}>
              <h3 style={{ marginBottom: '20px', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                📦 Tóm tắt đơn hàng
              </h3>
              
              {cartArray.length > 0 ? (
                <>
                  {cartArray.map((item, index) => (
                    <div 
                      key={item.variant_id || index} 
                      style={{ 
                        borderBottom: '1px solid #dee2e6', 
                        paddingBottom: '15px', 
                        marginBottom: '15px',
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '5px'
                      }}
                    >
                      <p style={{ marginBottom: '8px', fontSize: '16px' }}>
                        <strong>{item.product_name || 'N/A'}</strong>
                      </p>
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                        {item.model_name || 'N/A'} | Số lượng: <strong>x{item.quantity || 0}</strong>
                      </p>
                      <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                        📱 RAM: {item.ram_name || 'N/A'} ({item.ram_value || 'N/A'})
                      </p>
                      <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                        💾 Storage: {item.storage_name || 'N/A'} ({item.storage_value || 'N/A'})
                      </p>
                      <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                        ✓ Bảo hành: {item.warranty_months || 0} tháng
                      </p>
                      <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '16px' }}>
                        {((item.price || 0) * (item.quantity || 0)).toLocaleString('vi-VN')} ₫
                      </p>
                    </div>
                  ))}

                  <div style={{ 
                    marginTop: '20px', 
                    paddingTop: '15px', 
                    borderTop: '2px solid #007bff',
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '5px'
                  }}>
                    <p style={{ marginBottom: '10px', fontSize: '16px' }}>
                      Tổng sản phẩm: <strong>{displayTotalItems}</strong>
                    </p>
                    <p style={{ fontSize: '20px', color: '#28a745', fontWeight: 'bold' }}>
                      Tổng tiền: {displayTotalPrice.toLocaleString('vi-VN')} ₫
                    </p>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <p style={{ color: '#dc3545', fontSize: '18px', marginBottom: '15px' }}>
                    🛒 Giỏ hàng trống
                  </p>
                  <Link to="/cart">
                    <button style={{ 
                      padding: '10px 20px', 
                      backgroundColor: '#007bff', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      cursor: 'pointer' 
                    }}>
                      ← Quay lại giỏ hàng
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h3>Về T&T Center</h3>
            <ul>
              <li>
                <a href="#">Về chúng tôi</a>
              </li>
              <li>
                <a href="#">Tuyển dụng</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Chính sách</h3>
            <ul>
              <li>
                <a href="#">Chính sách bảo hành</a>
              </li>
              <li>
                <a href="#">Chính sách bán hàng</a>
              </li>
              <li>
                <a href="#">Chính sách kiểm hàng</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Thông tin</h3>
            <ul>
              <li>
                <a href="#">Hệ thống cửa hàng</a>
              </li>
              <li>
                <a href="#">Hướng dẫn đặt hàng Online</a>
              </li>
              <li>
                <a href="#">Tin tức</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Tổng đài hỗ trợ và bảo hành</h3>
            <p>
              Hotline: <strong>0898.143.789</strong>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:ttcentersale@gmail.com">ttcentersale@gmail.com</a>
            </p>
          </div>

          <div className="footer-column">
            <h3>Phương thức thanh toán</h3>
            <div className="payment-icons">
              <img src="/images/visa.png" alt="Visa" />
            </div>

            <h3>Đơn vị vận chuyển</h3>
            <div className="shipping-icons">
              <img src={vanchuyen} alt="GHN" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social">
            <p>Liên kết mạng xã hội</p>
            <div className="social-icons">
              <a href="#">
                <img src={facebook} alt="Facebook" />
              </a>
              <a href="#">
                <img src={tiktok} alt="TikTok" />
              </a>
              <a href="#">
                <img src={youtube} alt="YouTube" />
              </a>
              <a href="#">
                <img src={zalo} alt="Zalo" />
              </a>
            </div>
          </div>
          <div className="certificates">
            <img src={bocongthuong} alt="Bộ Công Thương" />
            <img src={dmca} alt="DMCA" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Checkcart;