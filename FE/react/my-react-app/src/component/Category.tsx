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
// import laptopdell from "../assets/images/dell-lapptop.png";
import youtube from "../assets/images/youtub.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IProduct } from "../interface/IProduct";
import type { ICategory } from "../interface/ICategory";
import type { IProductVariant } from "../interface/IProductVariant";
const Category = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch("http://127.0.0.1:8000/api/product");
        const rawProduct = await productRes.json();

        const variantRes = await fetch(
          "http://127.0.0.1:8000/api/product_variants"
        );
        const rawVariant = await variantRes.json();

        // Tự động lấy field đúng (có thể là data hoặc không)
        const productsArray = Array.isArray(rawProduct)
          ? rawProduct
          : rawProduct.data;
        const variantsArray = Array.isArray(rawVariant)
          ? rawVariant
          : rawVariant.data;

        if (!productsArray) {
          console.error("❌ API PRODUCT không có dữ liệu hợp lệ:", rawProduct);
          return;
        }
        if (!variantsArray) {
          console.error("❌ API VARIANT không có dữ liệu hợp lệ:", rawVariant);
          return;
        }

        // Merge variant vào product
        const merged = productsArray.map((p: IProduct) => {
          const variants = variantsArray.filter(
            (v: IProductVariant) => v.product_id === p.id
          );
          return { ...p, variants };
        });

        // Tạo danh mục
        const uniqueCategories: ICategory[] = [];
        merged.forEach((p: IProduct & { variants: IProductVariant[] }) => {
          if (
            p.category &&
            !uniqueCategories.some((c) => c.id === p.category.id)
          ) {
            uniqueCategories.push(p.category);
          }
        });

        setCategories(uniqueCategories);
        setProducts(merged);
        setFilteredProducts(merged);
      } catch (error) {
        console.error("❌ Lỗi API:", error);
      }
    };

    fetchData();
  }, []);

  // FILTER BY CATEGORY
  const handleFilterCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);

    if (categoryName === "") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (p) =>
        p.category &&
        p.category.name.toLowerCase() === categoryName.toLowerCase()
    );

    setFilteredProducts(filtered);
  };
  // FILTER BY PRICE
  const handleFilterPrice = (value: string) => {
    setPriceFilter(value);

    let list = [...products];

    if (value === "under10") {
      list = list.filter(
        (p) => p.variants?.[0] && Number(p.variants[0].price_new) < 10000000
      );
    }

    if (value === "10to20") {
      list = list.filter(
        (p) =>
          p.variants?.[0] &&
          Number(p.variants[0].price_new) >= 10000000 &&
          Number(p.variants[0].price_new) <= 80000000
      );
    }

    setFilteredProducts(list);
  };

  // SORT BY PRICE
  const handleSortPrice = (value: string) => {
    setSortOrder(value);

    const list = [...filteredProducts];

    if (value === "asc") {
      list.sort(
        (a, b) =>
          Number(a.variants?.[0]?.price_new || 0) -
          Number(b.variants?.[0]?.price_new || 0)
      );
    }

    if (value === "desc") {
      list.sort(
        (a, b) =>
          Number(b.variants?.[0]?.price_new || 0) -
          Number(a.variants?.[0]?.price_new || 0)
      );
    }

    setFilteredProducts(list);
  };
  const getProductImage = (item: IProduct) => {
    // Nếu API có ảnh
    if (item.images && item.images !== "") {
      return `http://127.0.0.1:8000/api/product_images/${item.images}`;
    }

    // Nếu sản phẩm không có ảnh → dùng ảnh mặc định
    return "/images/no-image.png";
  };

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
          {/* FILTER CATEGORY */}
          <select
            value={selectedCategory}
            onChange={(e) => handleFilterCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Tất cả danh mục</option>

            {categories.map((cate) => (
              <option key={cate.id} value={cate.name}>
                {cate.name}
              </option>
            ))}
          </select>
          <select
            value={priceFilter}
            onChange={(e) => handleFilterPrice(e.target.value)}
          >
            <option value="">Mức giá</option>
            <option value="under10">Dưới 10 triệu</option>
            <option value="10to20">10 - 20 triệu trở lên</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => handleSortPrice(e.target.value)}
          >
            <option value="">Sắp xếp theo</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>

        {/* Danh sách sản phẩm */}
        <section className="product-category">
          <div className="container">
            <div className="product-list">
              {filteredProducts.map((item) => (
                <div className="product-card" key={item.id}>
                  <img src={getProductImage(item)} alt={item.name} />

                  <h3>{item.name}</h3>
                  {item.variants && item.variants.length > 0 ? (
                    <>
                      <p className="price-new">
                        {Number(item.variants[0].price_new).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        đ
                      </p>

                      <div className="price-info">
                        <span className="price-old">
                          {Number(item.variants[0].price_old).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          đ
                        </span>

                        <span className="discount">
                          Giảm{" "}
                          {Math.round(
                            (1 -
                              Number(item.variants[0].price_new) /
                                Number(item.variants[0].price_old)) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </>
                  ) : (
                    <p>Không có giá</p>
                  )}
                  <p className="compare">
                    <i className="fa-regular fa-heart"></i> Yêu thích
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
