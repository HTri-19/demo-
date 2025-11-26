import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import payment from "../assets/images/visa.png";
import { IProduct } from "../interface/IProduct";
import mac1 from "../assets/images/mac-1.png";
import listmac1 from "../assets/images/1690449389_1686_963918ca16d8561c0c042be5706d8581.png";
import listmac2 from "../assets/images/1690449390_1686_7c1c6c85d8006d7104fd4d906da93ac1.png";
import listmac3 from "../assets/images/1690449390_1686_7c1c6c85d8006d7104fd4d906da93ac1.png";
import listmac4 from "../assets/images/1690449389_1686_8e1e359506032d5266aff4801e44607c.png";
import listmac5 from "../assets/images/1690449389_1686_f104ef7b0ae38f78d09ad5993a4ac1a3.png";
import mac4 from "../assets/images/mac-4.png";
const ProductId = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log("Lỗi fetch chi tiết sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ padding: 50 }}>Đang tải sản phẩm...</div>;
  if (!product)
    return (
      <div style={{ padding: 50, color: "red" }}>Không tìm thấy sản phẩm.</div>
    );

  return (
    <>
      {/* HEADER */}
      <header className="main-header">
        <div className="container header-inner">
          <Link to="/">
            <div className="logo">
              <img src={Frame65} alt="T&T Center" />
            </div>
          </Link>

          <nav className="header-nav">
            <a className="menu-btn">
              <i className="fa-solid fa-bars"></i> Danh mục
            </a>
            <a className="location-btn">
              <i className="fa-solid fa-location-dot"></i> Xem giá tại Hà Nội
            </a>
          </nav>

          <div className="search-box">
            <input type="text" placeholder="Nhập tên sản phẩm..." />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="header-actions">
            <Link to="/cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </Link>
            <Link to="/login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* BODY */}
      <section className="body-NE">
        <div className="container-product">
          {/* LEFT */}
          <div className="product-left">
            <div className="main-image">
              <img
                src={
                  product?.image
                    ? product.image
                    : "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={product.name}
              />
            </div>

            {/* THUMBNAIL (nếu bạn có thể bổ sung từ API sau) */}
            <div className="thumbnail-list">
              {/* <img
                src={
                  product?.image
                    ? product.image
                    : "https://via.placeholder.com/100?text=No+Img"
                }
                className="active"
              /> */}
              <img src={mac1} className="active" alt="Thumbnail 1" />
              <img src={listmac1} alt="Thumbnail 2" />
              <img src={listmac2} alt="Thumbnail 3" />
              <img src={listmac3} alt="Thumbnail 4" />
              <img src={listmac4} alt="Thumbnail 5" />
              <img src={listmac5} alt="Thumbnail 6" />
            </div>

            {/* THÔNG TIN / MÔ TẢ */}
            <div className="product-policy" style={{ marginTop: 20 }}>
              <h3>Mô tả sản phẩm</h3>
              <p>
                {product.description
                  ? product.description
                  : "Chưa có mô tả cho sản phẩm này."}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="product-right">
            <h2>{product.name}</h2>

            <div className="price-box">
              <div className="price-main">
                {product.price
                  ? product.price.toLocaleString() + "đ"
                  : "Đang cập nhật giá"}
              </div>
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
          </div>
        </div>
      </section>
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
            <h3>Tổng đài hỗ trợ</h3>
            <p>
              Hotline: <strong>0898.143.789</strong>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:ttcentersale@gmail.com">ttcentersale@gmail.com</a>
            </p>
          </div>

          <div className="footer-column">
            <h3>Thanh toán</h3>
            <div className="payment-icons">
              <img src={payment} alt="Visa" />
            </div>

            <h3>Vận chuyển</h3>
            <div className="shipping-icons">
              <img src={vanchuyen} alt="GHN" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social">
            <p>Liên kết mạng xã hội</p>
            <div className="social-icons">
              <a>
                <img src={facebook} />
              </a>
              <a>
                <img src={tiktok} />
              </a>
              <a>
                <img src={youtube} />
              </a>
              <a>
                <img src={zalo} />
              </a>
            </div>
          </div>

          <div className="certificates">
            <img src={bocongthuong} />
            <img src={dmca} />
          </div>
        </div>
      </footer>
    </>
  );
};

export default ProductId;
