import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import banner1 from "../assets/images/banner-1.png";
// import banner2 from "../assets/images/banner-2.png";
// import banner3 from "../assets/images/banner-3.png";
import laptopdell from "../assets/images/dell-lapptop.png";
import youtube from "../assets/images/youtub.png";

import { Link } from "react-router-dom";
const Category = () => {
  return (
    <>
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
      {/* banner */}
      <section className="banner">
        <div className="slider">
          <div className="slides">
            <img src={banner1} alt="Banner 1" className="active" />
            {/* <img src={banner2} alt="Banner 2" />
            <img src={banner3} alt="Banner 3" /> */}
          </div>

          <div className="dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>
      <div>
        {/* Bộ lọc */}
        <div className="filters">
          <select>
            <option>Nhu cầu</option>
            <option>Văn phòng</option>
            <option>Gaming</option>
          </select>
          <select>
            <option>Mức giá</option>
            <option>Dưới 10 triệu</option>
            <option>10 - 20 triệu</option>
          </select>
          <select>
            <option>Sắp xếp theo</option>
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
          </select>
        </div>

        {/* Danh mục */}
        <div className="categories">
          <button>Văn phòng</button>
          <button>Gaming</button>
          <button>Đồ họa - Kỹ thuật</button>
          <button>Cao cấp - sang trọng</button>
          <button>Mỏng nhẹ</button>
          <button>Sinh viên</button>
          <button>Cảm ứng</button>
          <button>Pin trâu</button>
        </div>

        {/* Danh sách sản phẩm */}
        <section className="product-category">
          <div className="container">
            <div className="product-list">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <div className="product-card" key={index}>
                    <img src={laptopdell} alt="MacBook Pro" />
                    <h3>MacBook Pro M1 13inch 16GB 256GB</h3>
                    <p className="price-new">16.490.000đ</p>
                    <div className="price-info">
                      <span className="price-old">23.990.000đ</span>
                      <span className="discount">Giảm 31%</span>
                    </div>
                    <p className="compare">
                      <i className="fa-regular fa-heart"></i> Yêu Thích
                    </p>
                    <button type="button" className="btn-success">
                      <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
                      hàng
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Nút xem thêm */}
        <div className="cart-buttons" style={{ marginBottom: "20px" }}>
          <button className="btn btn-primary">Xem thêm 200 sản phẩm</button>
        </div>
      </div>
      {/* footer */}
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

export default Category;
