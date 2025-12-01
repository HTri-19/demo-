import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import mac1 from "../assets/images/mac-1.png";
import laptop1 from "../assets/images/laptop-seller-1.png";
import { Link } from "react-router-dom";
// import banner3 from "../assets/images/banner-3.png";
const Cart = () => {
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
      <section className="section-body">
        <div className="cart-container">
          <h2>🛒 Chọn sản phẩm</h2>

          <div className="progress-bar">
            <div className="step active">Chọn sản phẩm</div>
            <div className="step">Thông tin đặt hàng</div>
            <div className="step">Hoàn tất đặt hàng</div>
          </div>

          {/* Sản phẩm 1 */}
          <div className="cart-item">
            <img src={mac1} alt="Laptop" />
            <div className="item-info">
              <h3>
                HP OmniBook 5 Flip 2-in-1 | Intel Core 5 120U 8GB 512GB Intel
                Graphics 14" Touch (New)
              </h3>
              <p className="price">
                Giá: <strong>14.990.000 ₫</strong>
              </p>
              <div className="quantity-wrapper">
                <span className="label">Số lượng:</span>
                <div className="quantity">
                  <button className="minus">-</button>
                  <input type="text" value="1" readOnly />
                  <button className="plus">+</button>
                </div>
              </div>
              <p className="total">
                Tổng tiền: <strong>14.990.000 ₫</strong>
              </p>
            </div>
            <button className="delete-btn">🗑</button>
          </div>

          {/* Sản phẩm 2 */}
          <div className="cart-item">
            <img src={laptop1} alt="Laptop" />
            <div className="item-info">
              <h3>
                HP OmniBook 5 Flip 2-in-1 | Intel Core 5 120U 8GB 512GB Intel
                Graphics 14" Touch (New)
              </h3>
              <p className="price">
                Giá: <strong>14.990.000 ₫</strong>
              </p>
              <div className="quantity-wrapper">
                <span className="label">Số lượng:</span>
                <div className="quantity">
                  <button className="minus">-</button>
                  <input type="text" value="1" readOnly />
                  <button className="plus">+</button>
                </div>
              </div>
              <p className="total">
                Tổng tiền: <strong>14.990.000 ₫</strong>
              </p>
            </div>
            <button className="delete-btn">🗑</button>
          </div>

          {/* Tổng kết giỏ hàng */}
          <div className="cart-summary">
            <p>
              Tổng tiền tạm tính: <span>14.990.000 ₫</span>
            </p>

            <div className="discount">
              <input type="text" placeholder="Nhập mã giảm giá" />
              <button>Áp dụng</button>
            </div>

            <p>
              Giảm giá: <span>0 ₫</span>
            </p>
            <h3>
              Tổng tiền thanh toán: <span>14.990.000 ₫</span>
            </h3>

            <div className="cart-buttons">
              <button className="btn-primary">
                <Link to="/checkcart" style={{ color: "white" }}>
                  Tiến hành đặt hàng
                </Link>
              </button>
              <button className="btn-secondary">Chọn thêm sản phẩm khác</button>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="banner">
        <div className="container">
          <img src={banner3} alt="Banner" />
        </div>
      </section> */}

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

export default Cart;
