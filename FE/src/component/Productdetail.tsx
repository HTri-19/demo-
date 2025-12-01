import { Link } from "react-router-dom";
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import mac1 from "../assets/images/mac-1.png";
import mac4 from "../assets/images/mac-4.png";
import listmac1 from "../assets/images/1690449389_1686_963918ca16d8561c0c042be5706d8581.png";
import listmac2 from "../assets/images/1690449390_1686_7c1c6c85d8006d7104fd4d906da93ac1.png";
import listmac3 from "../assets/images/1690449390_1686_7c1c6c85d8006d7104fd4d906da93ac1.png";
import listmac4 from "../assets/images/1690449389_1686_8e1e359506032d5266aff4801e44607c.png";
import listmac5 from "../assets/images/1690449389_1686_f104ef7b0ae38f78d09ad5993a4ac1a3.png";

const Productdetail = () => {
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
      <section className="body-NE">
        <div className="container-product">
          {/* LEFT */}
          <div className="product-left">
            <div className="main-image">
              <img src={mac1} />
            </div>

            <div className="thumbnail-list">
              <img src={mac1} className="active" alt="Thumbnail 1" />
              <img src={listmac1} alt="Thumbnail 2" />
              <img src={listmac2} alt="Thumbnail 3" />
              <img src={listmac3} alt="Thumbnail 4" />
              <img src={listmac4} alt="Thumbnail 5" />
              <img src={listmac5} alt="Thumbnail 6" />
            </div>

            <div className="product-policy">
              <div className="policy-box">
                <h3>Chính sách bán hàng</h3>
                <ul>
                  <li>
                    Bảo hành <b>12 tháng chính hãng</b>
                  </li>
                  <li>
                    Hóa đơn <a href="#">VAT đầy đủ</a>
                  </li>
                  <li>
                    Đổi trả <b>miễn phí trong 7 ngày</b>
                  </li>
                  <li>Miễn phí vận chuyển toàn quốc</li>
                </ul>
              </div>

              <div className="policy-box">
                <h3>Ưu đãi đặc biệt</h3>
                <ul>
                  <li>
                    Giảm ngay <b>500.000đ</b> khi thanh toán online
                  </li>
                  <li>
                    Tặng kèm <b>chuột không dây</b> trị giá 299k
                  </li>
                  <li>
                    Mua kèm <a href="#">phụ kiện giảm 20%</a>
                  </li>
                  <li>Thu cũ đổi mới tiết kiệm đến 3 triệu</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="product-right">
            <div className="price-box">
              <div className="price-main">19.990.000đ</div>
              <div className="price-old">22.000.000đ</div>
              <div className="price-trade">
                Thu cũ đổi mới <span>Tiết kiệm đến 3 triệu</span>
              </div>
            </div>

            <div className="option-box">
              <div className="option-item active">8GB / 256GB SSD</div>
              <div className="option-item">16GB / 512GB SSD</div>
            </div>

            <button
              className="btn-success"
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "13pt",
                fontWeight: "bold",
              }}
            >
              MUA NGAY
            </button>

            <div className="pay-options">
              <button className="btn-pay">
                TRẢ GÓP 0% <span>Qua thẻ tín dụng</span>
              </button>
              <button className="btn-pay">
                TRẢ GÓP QUA CCCD <span>Duyệt nhanh 5 phút</span>
              </button>
            </div>

            <div className="store-box">
              <h3>Hệ thống cửa hàng</h3>
              <ul>
                <li>
                  <strong>TP.HCM:</strong> 123 Nguyễn Trãi, Q.5
                </li>
                <li>
                  <strong>Hà Nội:</strong> 45 Cầu Giấy
                </li>
                <li>
                  <strong>Phan Thiết:</strong> 90 Lê Duẩn
                </li>
                <li>
                  <strong>Đà Lạt:</strong> 90 Lê Duẩn
                </li>
                <li>
                  <strong>Tây Ninh:</strong> 90 Lê Duẩn
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SẢN PHẨM GỢI Ý */}
        <div className="related-products">
          <button className="related-btn">SẢN PHẨM GỢI Ý</button>
          <section className="product-category">
            <div className="container">
              <div className="product-list">
                {[
                  {
                    name: "MacBook Pro M1 13inch 16GB 256GB",
                    priceNew: "16.490.000đ",
                    priceOld: "23.990.000đ",
                    discount: "Giảm 31%",
                  },
                  {
                    name: "Macbook Air M2 13inch 16GB 256GB | New",
                    priceNew: "19.290.000đ",
                    priceOld: "25.490.000đ",
                    discount: "Giảm 24%",
                  },
                  {
                    name: "Macbook Pro 14inch M1 Pro 16GB 512GB",
                    priceNew: "24.790.000đ",
                    priceOld: "26.990.000đ",
                    discount: "Giảm 8%",
                  },
                  {
                    name: "Macbook Pro 14inch M1 Pro 16GB 1TB | New",
                    priceNew: "29.990.000đ",
                    priceOld: "42.990.000đ",
                    discount: "Giảm 30%",
                  },
                ].map((product, index) => (
                  <div className="product-card" key={index}>
                    <img src={mac4} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p className="price-new">{product.priceNew}</p>
                    <div className="price-info">
                      <span className="price-old">{product.priceOld}</span>
                      <span className="discount">{product.discount}</span>
                    </div>
                    <button type="button" className="btn-success">
                      <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
                      hàng
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
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

export default Productdetail;
