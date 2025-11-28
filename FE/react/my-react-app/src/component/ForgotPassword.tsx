import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import Assets (từ Register/Login)
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
// import google from "../assets/images/google.png"; // Không cần trong form này

// Thay thế bằng endpoint thực tế từ Backend của bạn
const API_FORGOT_PASSWORD_URL = "http://127.0.0.1:8000/api/send-mail";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(API_FORGOT_PASSWORD_URL, {
        email,
        message: "Link đặt lại mật khẩu",
      });
      setMessage(
        response.data.message ||
          "Một liên kết đặt lại mật khẩu đã được gửi đến email của bạn."
      );
    } catch (err: any) {
      let errorMessage = "Gửi yêu cầu thất bại. Vui lòng thử lại.";

      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* START: MAIN HEADER (Đã sao chép từ Login/Register) */}
      <header className="main-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <img src={Frame65} alt="TechStoreCenter" />
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

      {/* FORM QUÊN MẬT KHẨU */}
      <section className="form-cotrol">
        <div className="login-container">
          <h2>Quên Mật Khẩu</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Nhập Email của bạn</label>

            {/* HIỂN THỊ THÔNG BÁO THÀNH CÔNG/LỖI */}
            {message && (
              <p
                style={{
                  color: "green",
                  fontSize: "0.9em",
                  marginBottom: "15px",
                }}
              >
                {message}
              </p>
            )}
            {error && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9em",
                  marginBottom: "15px",
                }}
              >
                {error}
              </p>
            )}

            {/* INPUT EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={email}
              onChange={handleInputChange}
              required
            />

            {/* NÚT GỬI */}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Đang xử lý..." : "GỬI YÊU CẦU ĐẶT LẠI"}
            </button>

            <p className="signup-text">
              <Link to="/login">Quay lại Đăng nhập</Link>
            </p>
          </form>
        </div>
      </section>

      {/* START: FOOTER (Đã sao chép từ Login/Register) */}
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

export default ForgotPassword;
