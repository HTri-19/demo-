import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
const Checkcart = () => {
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
            <a href="#" className="menu-btn">
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
            <Link to="/cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
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

          <form className="order-form">
            <h3>Thông tin khách hàng</h3>
            <input type="text" placeholder="Họ và tên *" required />
            <input type="tel" placeholder="Số điện thoại *" required />
            <input type="email" placeholder="Email *" required />

            <h3>Chọn cách thức giao hàng</h3>
            <div className="radio-group">
              <label>
                <input type="radio" name="delivery" defaultChecked /> Nhận tại
                cửa hàng
              </label>
              <label>
                <input type="radio" name="delivery" /> Giao hàng tận nơi
              </label>
            </div>

            <select>
              <option>Chọn địa chỉ cửa hàng để nhận</option>
              <option>Chi nhánh 1 - Quận 1</option>
              <option>Chi nhánh 2 - Quận 7</option>
            </select>

            <textarea placeholder="Yêu cầu khác..."></textarea>

            <h3>Hình thức thanh toán</h3>
            <div className="payment">
              <div className="payment-box active">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1042/1042339.png"
                  alt="Thanh toán tại cửa hàng"
                />
                <p>Thanh toán tại cửa hàng</p>
              </div>
              <div className="payment-box">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/764/764600.png"
                  alt="Thanh toán khi nhận hàng"
                />
                <p>Thanh toán khi nhận hàng</p>
              </div>
            </div>

            <div className="cart-buttons">
              <button className="btn-primary" type="submit">
                Xác nhận đơn hàng
              </button>
            </div>
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

export default Checkcart;
