import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/SearchProduct.css";
import { IProduct } from "../interface/IProduct";

const SearchProduct = ({ query }: { query: string }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Hàm fetch có useCallback để tránh cảnh báo ESLint
  const fetchSearch = useCallback(async () => {
    if (!query.trim()) {
      setProducts([]);
      setShowResult(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/products/search?keyword=${encodeURIComponent(
          query
        )}`
      );

      const data = res.data?.data || [];
      setProducts(data);
      setShowResult(true);
    } catch (err) {
      console.log("Lỗi fetch:", err);
    }
  }, [query]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  return (
    <>
      {showResult && (
        <div className="search-result-box">
          <h4 className="suggest-title">Sản phẩm gợi ý</h4>

          {products.length === 0 && (
            <p className="no-result">Không tìm thấy sản phẩm...</p>
          )}

          {products.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="search-item"
            >
              <img
                src={item.image || "/no-image.png"}
                alt={item.name}
                className="search-img"
              />
              <div className="search-info">
                <p className="search-name">{item.name}</p>
                {item.price && (
                  <p className="search-price">{item.price.toLocaleString()}đ</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchProduct;
