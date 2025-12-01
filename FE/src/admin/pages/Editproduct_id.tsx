import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/css/editproduct.css";
import { fetchProductById, updateProduct } from "../api/productApi";
import type {
  ProductFormPayload,
  ProductStatus,
} from "../../interface/IAdminProduct";

type FormState = {
  name: string;
  categoryId: string;
  description: string;
  status: ProductStatus;
};

const DEFAULT_FORM_STATE: FormState = {
  name: "",
  categoryId: "",
  description: "",
  status: "active",
};

const statusLabels: Record<ProductStatus, string> = {
  active: "Đang bán",
  unactive: "Ngừng bán",
};

const Editproduct_id = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormState>(DEFAULT_FORM_STATE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Thiếu mã sản phẩm. Vui lòng quay lại danh sách.");
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const product = await fetchProductById(id);

        if (!product) {
          setError("Không tìm thấy sản phẩm.");
          return;
        }

        setFormValues({
          name: product.name ?? "",
          categoryId: String(product.category_id ?? ""),
          description: product.description ?? "",
          status: (product.status as ProductStatus) ?? "active",
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Không thể tải thông tin sản phẩm.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) {
      setError("Thiếu mã sản phẩm. Vui lòng tải lại trang.");
      return;
    }

    if (!formValues.name.trim()) {
      setError("Tên sản phẩm không được để trống.");
      return;
    }

    const parsedCategory = Number(formValues.categoryId);
    if (Number.isNaN(parsedCategory) || parsedCategory <= 0) {
      setError("Danh mục không hợp lệ.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload: ProductFormPayload = {
      name: formValues.name.trim(),
      category_id: parsedCategory,
      description: formValues.description.trim() || "",
      status: formValues.status,
    };

    try {
      await updateProduct(id, payload);
      navigate("/admin/productmanager");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể cập nhật sản phẩm. Vui lòng thử lại.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-product-page">
      <div className="main">
        <div className="page-header">
          <Link to="/admin/productmanager">
            <button className="btn cancel back-btn">Quay lại</button>
          </Link>
          <h2>Chỉnh sửa sản phẩm</h2>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading-state">Đang tải thông tin sản phẩm...</div>
        ) : (
          <div className="edit-product-container">
            <form className="edit-product-form" onSubmit={handleSubmit}>
              <div className="left-column">
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Danh mục (ID)</label>
                  <input
                    type="number"
                    min={1}
                    name="categoryId"
                    value={formValues.categoryId}
                    onChange={handleChange}
                    placeholder="VD: 3"
                    required
                  />
                  <small className="hint">
                    Bạn có thể lấy danh sách ID danh mục từ trang quản trị.
                  </small>
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    name="status"
                    value={formValues.status}
                    onChange={handleChange}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="right-column">
                <div className="form-group">
                  <label>Mô tả sản phẩm</label>
                  <textarea
                    name="description"
                    rows={10}
                    value={formValues.description}
                    onChange={handleChange}
                    placeholder="Mô tả chi tiết sản phẩm..."
                  />
                </div>

                <button
                  type="submit"
                  className="save-btn btn primary"
                  disabled={saving}
                >
                  {saving ? "Đang lưu..." : "Cập nhật sản phẩm"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editproduct_id;

