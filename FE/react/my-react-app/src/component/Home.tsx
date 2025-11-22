import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import banner3 from "../assets/images/banner-3.png";
import lap1 from "../assets/images/lap-1.png";
import mac1 from "../assets/images/mac-1.png";
import mac2 from "../assets/images/mac-2.png";
import mac4 from "../assets/images/mac-4.png";
import mac3 from "../assets/images/mac-3.png";
import laptop1 from "../assets/images/laptop-seller-1.png";
import welcome from "../assets/images/welcome.png";
import laptop2 from "../assets/images/laptop-serller-2.png";
import laptopdell from "../assets/images/dell-lapptop.png";
import laptopcu1 from "../assets/images/laptopcu.png";
import laptopcu2 from "../assets/images/laptopcu2.png";
import laptopcu3 from "../assets/images/laptopcu3.png";
import laptopcu4 from "../assets/images/laptopcu4.png";
import Asusvivobook1 from "../assets/images/Asusvivobook1.png";
import Asusvivobook2 from "../assets/images/Asusvivobook2.jpg";
import Asusvivobook3 from "../assets/images/Asusvivobook3.png";
import Asusvivobook4 from "../assets/images/Asusvivobook4.png";
import daile from "../assets/images/daile.png";
import backtoshool from "../assets/images/back-to-school-2025.png";
import muoithangmuoi from "../assets/images/10-10-sale.png";
import tintuc1 from "../assets/images/tintuc1.png";
import fix from "../assets/images/fix.png";
import macboo from "../assets/images/macboo-mdm.png";
import hangapple from "../assets/images/hang-apple-refurbished-la-gi-co-nen-mua-hang-apple-refurbished-khong-1697107354.png";
import { Link } from "react-router-dom";

const Home = () => {
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
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </Link>
            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* BANNER */}
      <section className="banner">
        <div className="container">
          <img src={banner3} alt="Banner" />
        </div>
      </section>

      {/* PRODUCT CATEGORY SECTION */}
      <section className="product-category">
        <div className="container">
          <h2>Sản phẩm mới nhất</h2>
          <div className="product-list mt-5">
            <div className="product-card">
              <img src={lap1} alt="Macbook" />
              <h3>MacBook Pro M1 13inch 16GB 256GB</h3>
              <p className="price-new">16.490.000đ</p>
              <div className="price-info">
                <span className="price-old">23.990.000đ</span>
                <span className="discount">Giảm 31%</span>
              </div>
              <p className="compare">
                <i className="fa-regular fa-heart"></i> Yêu Thích
              </p>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={mac1} alt="Macbook" />
              <h3>Macbook Air M2 13inch 16GB 256GB | New</h3>
              <p className="price-new">19.290.000đ</p>
              <div className="price-info">
                <span className="price-old">25.490.000đ</span>
                <span className="discount">Giảm 24%</span>
              </div>
              <p className="compare">
                <i className="fa-regular fa-heart"></i> Yêu Thích
              </p>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={laptop1} alt="Macbook" />
              <h3>
                Lenovo LOQ 2024 15IAX9E | Core i5-12450HX 12GB 512GB RTX 2050
                4GB 15.6'' FHD 144Hz (New)
              </h3>
              <p className="price-new">16.790.000</p>
              <div className="price-info">
                <span className="price-old">20.490.000 </span>
                <span className="discount">Giảm 8%</span>
              </div>
              <p className="compare">
                <i className="fa-regular fa-heart"></i> Yêu Thích
              </p>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={mac3} alt="Macbook" />
              <h3>Macbook Pro 14inch M1 Pro 16GB 1TB | New</h3>
              <p className="price-new">29.990.000đ</p>
              <div className="price-info">
                <span className="price-old">42.990.000đ</span>
                <span className="discount">Giảm 30%</span>
              </div>
              <p className="compare">
                <i className="fa-regular fa-heart"></i> Yêu Thích
              </p>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="welcome">
        <div className="container">
          <img src={welcome} alt="Welcome" />
        </div>
      </section>

      {/* < FLASH SALE SECTION  */}
      <section className="flash-sale">
        <div className="container">
          <div className="flash-sale-header">
            <div className="flash-title">⚡ FLASH SALE ĐẦU TUẦN</div>
            <div className="countdown">
              Kết thúc sau:
              <span className="time">1 ngày</span>
              <span className="time">02 giờ</span>
              <span className="time">15 phút</span>
            </div>
          </div>

          <div className="product-list-item mt-5">
            <div className="product-card">
              <img src={laptopdell} alt="MacBook Pro" />
              <h3>
                Dell Inspiron 14 5445 (2024) | Ryzen 7 - 8840HS RAM 16GB SSD
                512GB 2.2K (New)
              </h3>
              <p className="price-new">15.790.000 đ</p>
              <div className="price-info">
                <span className="price-old">17.490.000 đ</span>
                <span className="discount">Giảm 31%</span>
              </div>
              {/* <p class="compare">➕ Thêm vào so sánh</p>  */}
              <button type="submit" className="btn-sales">
                còn 7/15 suất
              </button>
            </div>

            <div className="product-card">
              <img src={mac4} alt="MacBook Air" />
              <h3>MacBook Pro M3 Pro 14 inch (18GB 512GB) | New CPO</h3>
              <p className="price-new">36.990.000 đ</p>
              <div className="price-info">
                <span className="price-old">52.490.000đ</span>
                <span className="discount">Giảm 24%</span>
              </div>
              <button type="submit" className="btn-sales">
                còn 7/15 suất
              </button>
            </div>

            <div className="product-card">
              <img src={mac3} alt="MacBook Pro 14" />
              <h3>Macbook Pro 14inch M1 Pro 16GB 1TB | New</h3>
              <p className="price-new">29.990.000đ</p>
              <div className="price-info">
                <span className="price-old">42.990.000đ</span>
                <span className="discount">Giảm 8%</span>
              </div>
              <button type="submit" className="btn-sales">
                còn 7/15 suất
              </button>
            </div>

            <div className="product-card">
              <img src={laptop1} alt="MacBook Pro 14" />
              <h3>
                Lenovo LOQ 2024 15IAX9E | Core i5-12450HX 12GB 512GB RTX 2050
                4GB 15.6'' FHD 144Hz
              </h3>
              <p className="price-new">16.790.000đ</p>
              <div className="price-info">
                <span className="price-old">20.490.000đ</span>
                <span className="discount">Giảm 30%</span>
              </div>
              <button type="submit" className="btn-sales">
                còn 7/15 suất
              </button>
            </div>

            <div className="product-card">
              <img src={laptop2} alt="MacBook Air" />
              <h3>
                HP OmniBook X Flip 14 inch 2-in-1AMD Copilot+ PC | AMD Ryzen AI
                5 340 16GB 512GB AMD Radeon 840M (New)
              </h3>
              <p className="price-new">18.990.000đ</p>
              <div className="price-info">
                <span className="price-old">21.490.000đ</span>
                <span className="discount">Giảm 24%</span>
              </div>
              <button type="submit" className="btn-sales">
                còn 7/15 suất
              </button>
            </div>
          </div>

          <div className="see-more">
            <button className="tab mt-5">Xem tất cả</button>
          </div>
        </div>
      </section>

      {/* <NEWEST PRODUCTS SECTION  */}
      <section className="product-category mt-5">
        <div className="container">
          <div className="category-header">
            <h2>Laptop cũ</h2>
            <div className="category-tabs">
              <div className="tab active">Phụ Kiện Laptop</div>
              <div className="tab">Thiết Bị Mạng</div>
              <div className="tab">Phụ Kiện PC</div>
              <button className="see-all">Xem tất cả</button>
            </div>
          </div>

          <div className="product-list">
            <div className="product-card">
              <img src={laptopcu1} alt="MacBook laptopcu" />
              <h3>
                Acer Nitro 5 AN515-57 | Core i5-11400H 8GB 512GB GTX 1650 15.6''
                FHD IPS 144Hz{" "}
              </h3>
              <p className="price-new"> 12.490.000đ</p>
              <div className="price-info">
                <span className="price-old">14.990.000đ</span>
                <span className="discount"> GGiảm 17% </span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={laptopcu2} alt="laptopcu2" />
              <h3>
                ASUS TUF A15 FA506 I Ryzen 7-4800H 16GB 512GB GTX 1650 144Hz
              </h3>
              <p className="price-new">11.990.000đ</p>
              <div className="price-info">
                <span className="price-old">12.990.000đ</span>
                <span className="discount">Giảm 8%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={laptopcu3} alt="laptopcu3" />
              <h3>
                Dell Latitude 7400 2in1 | Core i7 - 8665U Ram 16GB SSD 512GB
                14'' FHD IPS Touch{" "}
              </h3>
              <p className="price-new">10.990.000đ</p>
              <div className="price-info">
                <span className="price-old">12.990.000đ</span>
                <span className="discount">Giảm 15%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={laptopcu4} alt="laptopcu4" />
              <h3>
                Dell Gaming G15 5520 | Core i5 - 12500H Ram 16GB SSD 512GB RTX
                3050{" "}
              </h3>
              <p className="price-new">14.990.000đ</p>
              <div className="price-info">
                <span className="price-old">18.990.000đ</span>
                <span className="discount">Giảm 21%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* MACBOOK SECTION  */}
      <section className="product-category mt-5">
        <div className="container">
          <div className="category-header">
            <h2>Macbook</h2>
            <div className="category-tabs">
              <div className="tab active">Macbook Pro</div>
              <div className="tab">Macbook Air</div>
              <div className="tab">Macbook Cũ</div>
              <div className="tab">Mac Mini - iMac</div>
              <button className="see-all">Xem tất cả</button>
            </div>
          </div>

          <div className="product-list">
            <div className="product-card">
              <Link to="/product_detail">
                <img src={mac1} alt="MacBook Pro" />
                <h3>Macbook Air M2 13inch 16GB 256GB | New</h3>
              </Link>
              <p className="price-new">19.290.000đ</p>
              <div className="price-info">
                <span className="price-old">25.490.000đ</span>
                <span className="discount">Giảm 24%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={mac2} alt="MacBook Air" />
              <h3>Macbook Pro M2 13inch 16GB 512GB</h3>
              <p className="price-new">22.990.000đ</p>
              <div className="price-info">
                <span className="price-old">34.490.000 đ</span>
                <span className="discount">Giảm 24%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={mac3} alt="MacBook Pro 14" />
              <h3>Macbook Pro 14inch M1 Pro 16GB 1TB | New</h3>
              <p className="price-new">29.990.000đ</p>
              <div className="price-info">
                <span className="price-old">42.990.000đ</span>
                <span className="discount">Giảm 8%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={mac4} alt="MacBook Pro 14" />
              <h3>MacBook Pro M3 Pro 14 inch (18GB 512GB) | New CPO</h3>
              <p className="price-new">36.990.000đ</p>
              <div className="price-info">
                <span className="price-old">52.490.000đ</span>
                <span className="discount">Giảm 30%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Asusvivobook  */}
      <section className="product-category mt-5">
        <div className="container">
          <div className="category-header">
            <h2>Asusvivobook</h2>
            <div className="category-tabs">
              <div className="tab active">Asusvivobook</div>
              <div className="tab">Asusvivobook</div>
              <div className="tab">Asusvivobook</div>
              <div className="tab">Mac Mini - iMac</div>
              <button className="see-all">Xem tất cả</button>
            </div>
          </div>

          <div className="product-list">
            <div className="product-card">
              <img src={Asusvivobook1} alt=" Asusvivobook " />
              <h3>Laptop ASUS VivoBook Go 14 E1404FA-NK177W</h3>
              <p className="price-new"> 11.890.000đ</p>
              <div className="price-info">
                <span className="price-old">14.490.000đ</span>
                <span className="discount">Giảm 31%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={Asusvivobook2} alt="MacBook Air" />
              <h3>
                Asus Vivobook Go 14 E1404FA-EB482W | Ryzen 5 - 7520U RAM 16GB
                SSD 512GB 14inch FHD (New)
              </h3>
              <p className="price-new">11.890.000đ</p>
              <div className="price-info">
                <span className="price-old"> 14.990.000đ</span>
                <span className="discount">Giảm 21%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={Asusvivobook3} alt="MacBook Pro 14" />
              <h3>
                Asus Vivobook S14 S3407VA-LY046W | Core i5-13420H 16GB 512GB
                Intel UHD Graphics 14inch WUXGA (New)
              </h3>
              <p className="price-new">16.690.000đ</p>
              <div className="price-info">
                <span className="price-old">17.490.000đ</span>
                <span className="discount">Giảm 5%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>

            <div className="product-card">
              <img src={Asusvivobook4} alt="MacBook Pro 14" />
              <h3>
                Asus Vivobook S 14 Q423SA 2025 | Ultra 5 226V 16GB 512GB Intel®
                Arc™ Graphics 14'' WUXGA OLED (New)
              </h3>
              <p className="price-new">16.390.000đ</p>
              <div className="price-info">
                <span className="price-old">18.490.000đ</span>
                <span className="discount">Giảm 11%</span>
              </div>
              <button type="submit" className="btn-success">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* khuyến mãi  */}
      <section className="promo">
        <div className="container">
          <div className="section-header">
            <h3>Khuyến mãi</h3>
            <a href="#">Xem tất cả</a>
          </div>

          <div className="promo-banners">
            <a href="#">
              <img src={muoithangmuoi} alt="Promo 1" />
            </a>
            <a href="#">
              <img src={backtoshool} alt="Promo 2" />
            </a>
            <a href="#">
              <img src={daile} alt="Promo 3" />
            </a>
          </div>
        </div>
      </section>
      {/* Tin tức  */}
      <section className="news">
        <div className="container">
          <div className="section-header">
            <h3>Tin tức</h3>
            <a href="#">Xem tất cả</a>
          </div>

          <div className="news-list">
            <div className="news-item">
              <a href="#">
                <img src={tintuc1} alt="Tin tức 1" />
                <h4>Top 5 Laptop Tốt Nhất Dành Cho Tân Sinh Viên</h4>
              </a>
            </div>
            <div className="news-item">
              <a href="#">
                <img src={macboo} alt="Tin tức 2" />
                <h4>Hàng MDM là gì? Có nên mua Macbook MDM hay không?</h4>
              </a>
            </div>
            <div className="news-item">
              <a href="#">
                <img src={fix} alt="Tin tức 3" />
                <h4>Top 7 Cửa Hàng Sửa Chữa Laptop Uy Tín Tại TPHCM</h4>
              </a>
            </div>
            <div className="news-item">
              <a href="#">
                <img src={hangapple} alt="Tin tức 4" />
                <h4>
                  Hàng Refurbished là gì? Có nên mua hàng Apple Refurbished
                  không?
                </h4>
              </a>
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
export default Home;

