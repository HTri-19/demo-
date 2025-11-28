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
import type { IProduct } from "../interface/IProduct";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [variants, setVariants] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rams, setRams] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [storages, setStorages] = useState<any[]>([]);
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const res = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
  //       setProduct(res.data);
  //     } catch (err) {
  //       console.log("Lỗi fetch chi tiết sản phẩm:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);
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

    const fetchVariants = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/product_variants?product_id=${id}`
        );
        setVariants(res.data);
      } catch (err) {
        console.log("Lỗi fetch biến thể:", err);
      }
    };

    const fetchRams = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/rams");
        setRams(res.data);
      } catch (err) {
        console.log("Lỗi fetch RAM:", err);
      }
    };
    const fetchStorages = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/storages");
        setStorages(res.data);
      } catch (err) {
        console.log("Lỗi fetch storage:", err);
      }
    };

    fetchProduct();
    fetchVariants();
    fetchRams();
    fetchStorages();
  }, [id]);
  if (loading) return <div style={{ padding: 50 }}>Đang tải sản phẩm...</div>;
  if (!product)
    return (
      <div style={{ padding: 50, color: "red" }}>Không tìm thấy sản phẩm.</div>
    );
  const getRamValue = (id: number | null) => {
    const ram = rams.find((r) => r.id === id);
    return ram ? ram.value : "Không có RAM";
  };

  const getStorageValue = (id: number | null) => {
    const st = storages.find((s) => s.id === id);
    return st ? st.value : "Không có Storage";
  };

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
            {/* PRICE BOX */}
            {/* <div className="price-box">
              {variants.length > 0 ? (
                <>
                  <div className="price-main">
                    {variants[0].price_new
                      ? variants[0].price_new.toLocaleString() + "đ"
                      : "Đang cập nhật giá mới"}
                  </div>
                  <div className="price-old">
                    {variants[0].price_old
                      ? variants[0].price_old.toLocaleString() + "đ"
                      : ""}
                  </div>
                  {variants[0].price_old && variants[0].price_new ? (
                    <div className="discount">
                      Giảm{" "}
                      {Math.round(
                        ((variants[0].price_old - variants[0].price_new) /
                          variants[0].price_old) *
                          100
                      )}
                      %
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="price-main">
                  {product.price
                    ? product.price.toLocaleString() + "đ"
                    : "Đang cập nhật giá"}
                </div>
              )}
            </div> */}
            <div className="price-box">
              {variants.length > 0 ? (
                <>
                  {/* GIÁ MỚI */}
                  <div className="price-main">
                    {variants[0].price_new
                      ? Number(variants[0].price_new).toLocaleString("vi-VN") +
                        "đ"
                      : "Đang cập nhật giá mới"}
                  </div>

                  {/* GIÁ CŨ + GIẢM GIÁ (CÙNG 1 DÒNG) */}
                  {variants[0].price_old && variants[0].price_new && (
                    <div className="price-old-wrap">
                      {/* GIÁ CŨ */}
                      <div className="price-old">
                        {Number(variants[0].price_old).toLocaleString("vi-VN") +
                          "đ"}
                      </div>

                      {/* BADGE GIẢM GIÁ */}
                      <div className="discount-badge">
                        Giảm{" "}
                        {Math.round(
                          ((Number(variants[0].price_old) -
                            Number(variants[0].price_new)) /
                            Number(variants[0].price_old)) *
                            100
                        )}
                        %
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="price-main">
                  {product.price
                    ? Number(product.price).toLocaleString("vi-VN") + "đ"
                    : "Đang cập nhật giá"}
                </div>
              )}
            </div>

            <div className="price-trade">
              Thu cũ đổi mới <span>Tiết kiệm đến 3 triệu</span>
            </div>

            {/* OPTION BOX (Bạn có thể nối với variants sau nếu muốn) */}
            <div className="option-box">
              {variants.map((v, index) => (
                <div
                  key={v.id}
                  className={`option-item ${index === 0 ? "active" : ""}`}
                >
                  {getRamValue(v.ram_id)} / {getStorageValue(v.storage_id)}
                </div>
              ))}
            </div>

            {/* NÚT MUA NGAY */}
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

            {/* TRẢ GÓP */}
            <div className="pay-options">
              <button className="btn-pay">
                TRẢ GÓP 0% <span>Qua thẻ tín dụng</span>
              </button>
              <button className="btn-pay">
                TRẢ GÓP QUA CCCD <span>Duyệt nhanh 5 phút</span>
              </button>
            </div>

            {/* HỆ THỐNG CỬA HÀNG */}
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
      {/* GIỚI THIỆU + THÔNG SỐ KỸ THUẬT */}
      <section className="info-specs">
        <div className="container">
          <div className="info-specs-grid">
            {/* LEFT - GIỚI THIỆU SẢN PHẨM */}
            <div className="product-intro">
              <h2>Giới thiệu sản phẩm</h2>
              <p>
                {product.description
                  ? product.description
                  : "Chưa có giới thiệu cho sản phẩm này."}
              </p>
            </div>

            {/* RIGHT - THÔNG SỐ KỸ THUẬT */}
            <div className="product-specs">
              <h2>Thông số kỹ thuật</h2>

              <table className="spec-table">
                <tbody>
                  <tr>
                    <td>CPU</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Card đồ họa</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Dung lượng RAM</td>
                    <td>
                      {variants[0]
                        ? getRamValue(variants[0].ram_id)
                        : "Đang cập nhật"}
                    </td>
                  </tr>
                  <tr>
                    <td>Ổ cứng</td>
                    <td>
                      {variants[0]
                        ? getStorageValue(variants[0].storage_id)
                        : "Đang cập nhật"}
                    </td>
                  </tr>
                  <tr>
                    <td>Kích thước màn hình</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Pin</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Cổng giao tiếp</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* BÌNH LUẬN SẢN PHẨM */}
      <section className="comment-section">
        <div className="container">
          <h2>Bình luận sản phẩm</h2>

          {/* FORM NHẬP BÌNH LUẬN */}
          <div className="comment-form">
            <input type="text" placeholder="Nhập tên của bạn..." />
            <textarea placeholder="Viết bình luận..." rows={4}></textarea>
            <button className="btn-submit">Gửi bình luận</button>
          </div>

          {/* DANH SÁCH BÌNH LUẬN */}
          <div className="comment-list">
            <div className="comment-item">
              <strong>Nguyễn Văn A</strong>
              <p>Sản phẩm dùng rất tốt, giao hàng nhanh.</p>
            </div>

            <div className="comment-item">
              <strong>Minh Trí</strong>
              <p>Máy chạy mượt, pin ổn, đáng tiền.</p>
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
