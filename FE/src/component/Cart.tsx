import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";

interface CartItem {
  variant_id: number;
  product_name: string;
  model_name: string;
  sku: string;
  price: number;
  quantity: number;
  ram_name: string | null;
  ram_value: string | null;
  storage_name: string | null;
  storage_value: string | null;
  warranty_months: number;
}

interface CartData {
  items: CartItem[];
  total_items: number;
  total_price: number;
  is_empty: boolean;
}

const Cart = () => {
  const [cart, setCart] = useState<CartData>({
    items: [],
    total_items: 0,
    total_price: 0,
    is_empty: true,
  });

  // Lấy giỏ hàng từ API khi load trang
  const fetchCart = async () => {
    try {
      const res = await axios.get("/cart"); // API route /cart với middleware web
      if (res.data.success) {
        setCart(res.data.data);
      }
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Cập nhật số lượng
  const updateQuantity = async (variantId: number, quantity: number) => {
    try {
      await axios.put(`/cart/${variantId}`, { quantity });
      fetchCart(); // Reload cart sau khi update
    } catch (err: any) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      }
      console.error("Lỗi update số lượng:", err);
    }
  };

  // Xóa sản phẩm
  const removeItem = async (variantId: number) => {
    try {
      await axios.delete(`/cart/${variantId}`);
      fetchCart(); // Reload cart sau khi xóa
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
    }
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
            <a href="#" className="menu-btn">
              <i className="fa-solid fa-bars"></i> Danh mục
            </a>
            <a href="#" className="location-btn">
              <i className="fa-solid fa-location-dot"></i> Xem giá tại Hà Nội
            </a>
          </nav>
        </div>
      </header>

      {/* BODY */}
      <section className="section-body">
        <div className="cart-container">
          <h2>🛒 Giỏ hàng của bạn</h2>

          <div className="progress-bar">
            <div className="step active">Chọn sản phẩm</div>
            <div className="step">Thông tin đặt hàng</div>
            <div className="step">Hoàn tất đặt hàng</div>
          </div>

          {cart.items.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            cart.items.map((item) => (
              <div key={item.variant_id} className="cart-item">
                <div className="item-info">
                  <h3>{item.product_name}</h3>
                  <p>
                    RAM: {item.ram_name} ({item.ram_value})
                  </p>
                  <p>
                    Storage: {item.storage_name} ({item.storage_value})
                  </p>
                  <p className="price">
                    Giá: <strong>{item.price.toLocaleString()} ₫</strong>
                  </p>
                  <div className="quantity-wrapper">
                    <span className="label">Số lượng:</span>
                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.variant_id,
                            item.quantity > 1 ? item.quantity - 1 : 1
                          )
                        }
                      >
                        -
                      </button>
                      <input type="text" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          updateQuantity(item.variant_id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="total">
                    Tổng:{" "}
                    <strong>
                      {(item.price * item.quantity).toLocaleString()} ₫
                    </strong>
                  </p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => removeItem(item.variant_id)}
                >
                  🗑
                </button>
              </div>
            ))
          )}

          {/* Tổng kết giỏ hàng */}
          <div className="cart-summary">
            <p>
              Tổng tiền tạm tính:{" "}
              <span>{cart.total_price.toLocaleString()} ₫</span>
            </p>
            <h3>
              Tổng tiền thanh toán:{" "}
              <span>{cart.total_price.toLocaleString()} ₫</span>
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h3>Về T&T Center</h3>
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
      </footer>
    </>
  );
};

export default Cart;
