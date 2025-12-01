import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Poducts.css";
import { fetchProducts } from "../api/productApi";
import type {
  IAdminProduct,
  ProductStatus,
} from "../../interface/IAdminProduct";

const statusLabels: Record<ProductStatus, string> = {
  active: "Đang bán",
  unactive: "Ngừng bán",
};

const Productmanager = () => {
  const [products, setProducts] = useState<IAdminProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ProductStatus>(
    "all"
  );

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Không thể tải danh sách sản phẩm."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const categoryOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => {
      if (product.category?.name) {
        set.add(product.category.name);
      }
    });
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const description = product.description?.toLowerCase() ?? "";
      const categoryName = product.category?.name?.toLowerCase() ?? "";
      const matchesSearch =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        description.includes(keyword) ||
        categoryName.includes(keyword);

      const matchesCategory =
        categoryFilter === "all"
          ? true
          : product.category?.name === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ? true : product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  const getProductThumbnail = (product: IAdminProduct) =>
    product.thumbnail ||
    `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(
      product.name
    )}`;

  const formatPrice = (price?: number | null) =>
    typeof price === "number" ? `${price.toLocaleString("vi-VN")}₫` : "--";

  const formatStock = (stock?: number | null) =>
    typeof stock === "number" ? stock : "--";

  const getStatusMeta = (status?: ProductStatus | null) => {
    if (!status) {
      return {
        label: "Chưa cập nhật",
        className: "status",
      };
    }

    return {
      label: statusLabels[status],
      className: `status ${status === "active" ? "in-stock" : "out-stock"}`,
    };
  };

  return (
    <div className="product-page">
      <div className="main">
        <div className="page-header">
          <h2>Quản lý sản phẩm</h2>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="filter-box">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="filter-input"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "all" | ProductStatus)
            }
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang bán</option>
            <option value="unactive">Ngừng bán</option>
          </select>

          <button type="button" className="btn" onClick={resetFilters}>
            Đặt lại
          </button>
          <button type="button" className="btn" onClick={loadProducts}>
            Làm mới
          </button>

          <Link to="/admin/addproduct">
            <button className="btn primary add-product-btn">
              + Thêm sản phẩm
            </button>
          </Link>
        </div>

        <div className="table-box">
          <table className="product-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Danh mục</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="table-message">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              )}

              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="empty-state">
                    Không tìm thấy sản phẩm phù hợp.
                  </td>
                </tr>
              )}

              {!loading &&
                filteredProducts.map((product, index) => {
                  const statusMeta = getStatusMeta(product.status);
                  return (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={getProductThumbnail(product)}
                          className="product-img"
                          alt={product.name}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{formatPrice(product.price)}</td>
                      <td>{formatStock(product.stock)}</td>
                      <td>{product.category?.name ?? "--"}</td>
                      <td>
                        <span className={statusMeta.className}>
                          {statusMeta.label}
                        </span>
                      </td>
                      <td>
                        <Link to={`/admin/editproduct/${product.id}`}>
                          <button className="action-btn edit">Sửa</button>
                        </Link>
                        <button className="action-btn delete">Xóa</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productmanager;
