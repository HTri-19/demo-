import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng

// Import Assets của bạn (Giữ nguyên)
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import google from "../assets/images/google.png";

// --- Định nghĩa Typescript Interfaces ---
interface FormData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string; // Token xác thực (JWT)
  // Có thể thêm user info
}

// **ENDPOINT CHÍNH XÁC:** /api/auth/login
const LOGIN_API_URL = 'http://127.0.0.1:8000/api/auth/login';
// LƯU Ý: Nếu server Laravel của bạn đang chạy ở port 8080, 
// bạn có thể cần URL đầy đủ cho môi trường phát triển:
// const API_URL = 'http://localhost:8080/api/auth/login'; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. Hàm xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Lấy 'name' thay vì 'type'
    setFormData(prevData => ({
      ...prevData,
      [name]: value, // SỬA: Dùng 'name' để cập nhật đúng trường
    }));
  };

  // 2. Hàm xử lý gửi form (Đăng nhập)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // **Phần kết nối:** Gửi POST request đến API Laravel
      const response = await axios.post<LoginResponse>(LOGIN_API_URL, { // SỬA: Đổi API_LOGIN_URL thành LOGIN_API_URL
        email: formData.email,
        password: formData.password,
      });
      
      // -------------------------------------------------------------------
      // **BỔ SUNG LOGIC SAU KHI ĐĂNG NHẬP THÀNH CÔNG:**
      
      // 1. Lưu token JWT (từ Laravel trả về) vào Local Storage (hoặc Context/Redux)
      const authToken = response.data.token;
      localStorage.setItem('authToken', authToken); 
      alert("Đăng nhập thành công!"); // Dùng alert tạm thời để kiểm tra

      // 2. Chuyển hướng người dùng sau khi đăng nhập thành công
      navigate('/'); // Chuyển về trang chủ
      
      // -------------------------------------------------------------------

    } catch (error) {
      // Xử lý lỗi (ví dụ: thông tin đăng nhập sai)
      if (axios.isAxiosError(error) && error.response) {
        // Lỗi từ server (401 Unauthorized, 422 Validation Error,...)
        let errorMessage = 'Lỗi đăng nhập không xác định';
        
        // Kiểm tra lỗi Validation (thường là status 422)
        if (error.response.status === 422 && error.response.data.errors) {
            // Hiển thị lỗi validation đầu tiên
            const firstErrorKey = Object.keys(error.response.data.errors)[0];
            errorMessage = error.response.data.errors[firstErrorKey][0];
        } else if (error.response.data.message) {
            // Lỗi thông thường từ Controller (ví dụ: "Thông tin không hợp lệ")
            errorMessage = error.response.data.message;
        }

        setError(errorMessage);

      } else {
        // Lỗi mạng hoặc kết nối
        setError('Lỗi kết nối máy chủ. Vui lòng kiểm tra server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN HEADER (Giữ nguyên) */}
      <header className="main-header">
        <div className="container header-inner">
          <Link to="/">
            <div className="logo">
              <img src={Frame65} alt="T&T Center" />
            </div>
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

      {/* FORM ĐĂNG NHẬP (ĐÃ THÊM LOGIC) */}
      <section className="form-cotrol">
        <div className="login-container">
          <h2>Đăng Nhập Tài Khoản</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>Thông tin đăng nhập</label>

            {/* HIỂN THỊ THÔNG BÁO LỖI */}
            {error && (
                <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '15px' }}>
                    {error}
                </p>
            )}
            
            <input 
              type="email" 
              name="email" // BỔ SUNG THUỘC TÍNH NAME
              placeholder="Nhập email *" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
            
            <input 
              type="password" 
              name="password" // BỔ SUNG THUỘC TÍNH NAME
              placeholder="Nhập mật khẩu *" 
              value={formData.password} 
              onChange={handleInputChange} 
              required 
            />

            <Link to="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </Link>

            {/* NÚT ĐĂNG NHẬP */}
            <button 
              type="submit" 
              className="btn-login" 
              disabled={loading} 
            >
              {loading ? 'Đang xác thực...' : 'ĐĂNG NHẬP'}
            </button>

            {/* NÚT ĐĂNG NHẬP GOOGLE */}
            <button type="button" className="btn-google">
              <img src={google} alt="Google" />
              Đăng nhập bằng tài khoản Google
            </button>

            {/* LIÊN KẾT ĐĂNG KÝ */}
            <Link to="/Regiter" className="signup-text">
              Bạn chưa có tài khoản? <span>Đăng ký ngay</span>
            </Link>
          </form>
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

export default Login;