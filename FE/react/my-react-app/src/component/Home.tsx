import Frame65 from "../assets/images/Frame 65.png";
import banner3 from "../assets/images/banner-3.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://127.0.0.1:8000/api/product');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Data từ API:', result);

      const productsArray = Array.isArray(result) ? result : (result.data || result);

      if (Array.isArray(productsArray)) {
        const transformedProducts = productsArray.map(product => {
          console.log(`📦 Product ${product.id}:`, {
            name: product.name,
            variants: product.variants
          });

          return {
            ...product,
            image: product.images && product.images.length > 0
              ? product.images[0].image_url || product.images[0].image
              : product.image || '/placeholder.png',
            variants: product.variants || []
          };
        });

        setProducts(transformedProducts);
        console.log(`✅ Loaded ${transformedProducts.length} products`);
      } else {
        console.warn('⚠️ Data không phải mảng:', productsArray);
        setProducts([]);
      }
    } catch (error) {
      console.error('❌ Lỗi fetch:', error);
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SỬA: Xử lý thêm giỏ hàng với validation tốt hơn
  const handleAddToCart = async (product) => {
    try {
      setAddingToCart(product.id);
      
      console.log('📦 Product data:', product);
      console.log('📦 Variants:', product.variants);
      
      // ✅ Kiểm tra variants có tồn tại không
      if (!product.variants || product.variants.length === 0) {
        alert('❌ Sản phẩm này chưa có biến thể! Vui lòng liên hệ admin.');
        console.error('❌ Product không có variants:', product);
        return;
      }
      
      // ✅ Lấy variant đầu tiên
      const firstVariant = product.variants[0];
      console.log('🔍 First variant:', firstVariant);
      
      // ✅ Kiểm tra variant có ID không
      if (!firstVariant || !firstVariant.id) {
        alert('❌ Variant không hợp lệ!');
        console.error('❌ Variant không có ID:', firstVariant);
        return;
      }
      
      const variantId = firstVariant.id;
      console.log('🛒 Thêm vào giỏ - variant ID:', variantId);
      
      // ✅ Gọi API thêm giỏ hàng
      const result = await addToCart(variantId, 1);
      console.log('📥 Kết quả thêm giỏ:', result);

      if (result.success) {
        alert('✅ ' + (result.message || 'Thêm vào giỏ hàng thành công!'));
      } else {
        alert('❌ ' + (result.message || 'Có lỗi xảy ra!'));
      }
    } catch (error) {
      console.error('❌ Lỗi:', error);
      alert('❌ Lỗi: ' + error.message);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleAddToFavorite = (productId) => {
    console.log('❤️ Thêm vào yêu thích:', productId);
    alert('Thêm vào yêu thích thành công!');
  };

  if (loading) {
    return <div className="text-center py-8 text-lg">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Lỗi: {error}</p>
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

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
            {products && products.length > 0 ? (
              products.map((product) => {
                const discount = product.old_price && product.price
                  ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
                  : 0;

                return (
                  <div key={product.id} className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => e.target.src = '/placeholder.png'}
                      className="product-images"
                    />

                    <h3 className="product-name">{product.name}</h3>

                    <p className="price-new">
                      {product.price
                        ? parseInt(product.price).toLocaleString('vi-VN')
                        : '0'}đ
                    </p>

                    {product.old_price && (
                      <div className="price-info">
                        <span className="price-old">
                          {parseInt(product.old_price).toLocaleString('vi-VN')}đ
                        </span>
                        <span className="discount">Giảm {discount}%</span>
                      </div>
                    )}

                    <button
                      onClick={() => handleAddToFavorite(product.id)}
                      className="compare"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <i className="fa-regular fa-heart"></i> Yêu Thích
                    </button>

                    <button
                      type="button"
                      className="btn-success"
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product.id}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      {addingToCart === product.id ? ' Đang thêm...' : ' Thêm vào giỏ hàng'}
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-center w-full py-8">Không có sản phẩm nào</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;