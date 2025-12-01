import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Assets
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
        token,
        password,
        password_confirmation: confirmPassword
      });

      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/Login');
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <>
        <header className="main-header">
          <div className="container header-inner">
            <Link to="/" className="logo">
              <img src={Frame65} alt="T&T Center" />
            </Link>
            <nav className="header-nav">
              <a href="category" className="menu-btn">
                <i className="fa-solid fa-bars"></i> Danh mục
              </a>
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
              <a href="cart" className="cart-btn">
                <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
              </a>

              <Link to="/Login" className="login-btn">
                <i className="fa-regular fa-user"></i> Đăng nhập
              </Link>
            </div>
          </div>
        </header>

        <div style={{ textAlign: 'center', marginTop: '100px', marginBottom: '100px', color: '#dc3545' }}>
          <h2>❌ Link không hợp lệ hoặc đã hết hạn</h2>
          <p>Vui lòng <Link to="/forgot-password" style={{color: '#007bff', textDecoration: 'underline'}}>yêu cầu một link mới</Link></p>
        </div>

        <footer className="footer">
          <div className="footer-top">
            <div className="footer-column">
              <h3>Về T&T Center</h3>
              <ul>
                <li><a href="#">Về chúng tôi</a></li>
                <li><a href="#">Tuyển dụng</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Chính sách</h3>
              <ul>
                <li><a href="#">Chính sách bảo hành</a></li>
                <li><a href="#">Chính sách bán hàng</a></li>
                <li><a href="#">Chính sách kiểm hàng</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Thông tin</h3>
              <ul>
                <li><a href="#">Hệ thống cửa hàng</a></li>
                <li><a href="#">Hướng dẫn đặt hàng Online</a></li>
                <li><a href="#">Tin tức</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Tổng đài hỗ trợ và bảo hành</h3>
              <p>Hotline: <strong>0898.143.789</strong></p>
              <p>Email: <a href="mailto:ttcentersale@gmail.com">ttcentersale@gmail.com</a></p>
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
                <a href="#"><img src={facebook} alt="Facebook" /></a>
                <a href="#"><img src={tiktok} alt="TikTok" /></a>
                <a href="#"><img src={youtube} alt="YouTube" /></a>
                <a href="#"><img src={zalo} alt="Zalo" /></a>
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
  }

  return (
    <>
      {/* START: MAIN HEADER */}
      <header className="main-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <img src={Frame65} alt="T&T Center" />
          </Link>
          <nav className="header-nav">
            <a href="category" className="menu-btn">
              <i className="fa-solid fa-bars"></i> Danh mục
            </a>
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
            <a href="cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </a>

            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>
      {/* END: MAIN HEADER */}

      {/* FORM ĐẶT LẠI MẬT KHẨU */}
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 400px)', padding: '40px 20px'}}>
        <div style={{
          width: '100%',
          maxWidth: '450px',
          padding: '40px',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
          backgroundColor: '#fff'
        }}>
          <h1 style={{
            textAlign: 'center',
            color: '#2B63B9',
            marginBottom: '10px',
            fontSize: '28px',
            fontWeight: 'bold'
          }}>
             Đặt lại mật khẩu
          </h1>
          <p style={{textAlign: 'center', color: '#666', marginBottom: '30px'}}>
            Nhập mật khẩu mới để tiếp tục
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '20px'}}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333',
                fontSize: '14px'
              }}>
                Mật khẩu mới
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới..."
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '25px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#2B63B9'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
              />
            </div>

            <div style={{marginBottom: '25px'}}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333',
                fontSize: '14px'
              }}>
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu..."
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '25px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#2B63B9'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: loading ? '#ccc' : '#2B63B9',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
              }}
            >
              {loading ? ' Đang xử lý...' : 'Đặt lại mật khẩu'}
            </button>
          </form>

          {message && (
            <p style={{
              color: '#28a745',
              marginTop: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              backgroundColor: '#d4edda',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #c3e6cb'
            }}>
              ✓ {message}
            </p>
          )}

          {error && (
            <p style={{
              color: '#dc3545',
              marginTop: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              backgroundColor: '#f8d7da',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #f5c6cb'
            }}>
              ✗ {error}
            </p>
          )}

          <p style={{textAlign: 'center', marginTop: '20px', color: '#666'}}>
            Nhớ mật khẩu rồi? <Link to="/Login" style={{color: '#1D4F9C', textDecoration: 'none', fontWeight: 'bold'}}>Đăng nhập</Link>
          </p>
        </div>
      </div>
      {/* END: FORM */}

      {/* START: FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h3>Về T&T Center</h3>
            <ul>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Tuyển dụng</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Chính sách</h3>
            <ul>
              <li><a href="#">Chính sách bảo hành</a></li>
              <li><a href="#">Chính sách bán hàng</a></li>
              <li><a href="#">Chính sách kiểm hàng</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Thông tin</h3>
            <ul>
              <li><a href="#">Hệ thống cửa hàng</a></li>
              <li><a href="#">Hướng dẫn đặt hàng Online</a></li>
              <li><a href="#">Tin tức</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Tổng đài hỗ trợ và bảo hành</h3>
            <p>Hotline: <strong>0898.143.789</strong></p>
            <p>Email: <a href="mailto:ttcentersale@gmail.com">ttcentersale@gmail.com</a></p>
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
              <a href="#"><img src={facebook} alt="Facebook" /></a>
              <a href="#"><img src={tiktok} alt="TikTok" /></a>
              <a href="#"><img src={youtube} alt="YouTube" /></a>
              <a href="#"><img src={zalo} alt="Zalo" /></a>
            </div>
          </div>
          <div className="certificates">
            <img src={bocongthuong} alt="Bộ Công Thương" />
            <img src={dmca} alt="DMCA" />
          </div>
        </div>
      </footer>
      {/* END: FOOTER */}
    </>
  );
};

export default ResetPassword;