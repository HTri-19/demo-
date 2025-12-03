import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/css/editproduct.css";
import { fetchProductById, updateProduct } from "../api/productApi";
import { fetchRams, fetchStorages, fetchCategories } from "../api/optionsApi";
import type {
  ProductFormPayload,
  ProductStatus,
  IAdminProduct,
  IRamOption,
  IStorageOption,
  ICategoryOption,
} from "../../interface/IAdminProduct";

type CoreFormState = {
  name: string;
  categoryId: string;
  description: string;
  status: ProductStatus;
};

type ImageDraft = { id?: number; image: string };

type VariantDraft = {
  id?: number;
  sku?: string;
  model_name?: string;
  price?: number | string;
  quantity?: number | string;
  ram_id?: number | null;
  storage_id?: number | null;
  stock?: number | string | null;
  warranty_months?: number | string | null;
};

const DEFAULT_CORE: CoreFormState = {
  name: "",
  categoryId: "",
  description: "",
  status: "active",
};

const statusLabels: Record<ProductStatus, string> = {
  active: "Đang bán",
  unactive: "Ngừng bán",
};

const normalizeImages = (product?: IAdminProduct): ImageDraft[] => {
  if (!product?.images) return [];
  return product.images.map((img) => ({ id: img.id, image: img.image }));
};

const normalizeVariants = (product?: IAdminProduct): VariantDraft[] => {
  if (!product?.variants) return [];
  return product.variants.map((v) => ({
    id: v.id,
    sku: v.sku,
    model_name: v.model_name,
    price: v.price,
    quantity: v.quantity,
    ram_id: v.ram_id ?? null,
    storage_id: v.storage_id ?? null,
    stock: v.stock ?? null,
    warranty_months: v.warranty_months ?? null,
  }));
};

const Editproduct_id = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [core, setCore] = useState<CoreFormState>(DEFAULT_CORE);
  const [images, setImages] = useState<ImageDraft[]>([]);
  const [variants, setVariants] = useState<VariantDraft[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [rams, setRams] = useState<IRamOption[]>([]);
  const [storages, setStorages] = useState<IStorageOption[]>([]);
  const [categories, setCategories] = useState<ICategoryOption[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [ramData, storageData, categoryData] = await Promise.all([
          fetchRams(),
          fetchStorages(),
          fetchCategories(),
        ]);
        setRams(ramData);
        setStorages(storageData);
        setCategories(categoryData);
      } catch (e) {
        console.warn("Không thể tải RAM/Storage/Category", e);
      }
    };
    loadOptions();
  }, []);

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

        setCore({
          name: product.name ?? "",
          categoryId: String(product.category_id ?? ""),
          description: product.description ?? "",
          status: (product.status as ProductStatus) ?? "active",
        });
        setImages(normalizeImages(product));
        setVariants(normalizeVariants(product));
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

  // ----- Change handlers -----
  const handleCoreChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setCore((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    setImages((prev) => prev.map((img, i) => (i === index ? { ...img, image: value } : img)));
  };
  const addImageRow = () => setImages((prev) => [...prev, { image: "" }]);
  const removeImageRow = (index: number) => setImages((prev) => prev.filter((_, i) => i !== index));

  const handleVariantField = (
    index: number,
    field: keyof VariantDraft,
    value: string | number | null,
  ) => {
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  };

  const addVariantRow = () =>
    setVariants((prev) => [
      ...prev,
      {
        model_name: "",
        price: "",
        quantity: "",
        ram_id: null,
        storage_id: null,
        stock: "",
        warranty_months: "",
      },
    ]);

  const removeVariantRow = (index: number) =>
    setVariants((prev) => prev.filter((_, i) => i !== index));

  // ----- Validations -----
  const validationError = useMemo(() => {
    if (!core.name.trim()) return "Tên sản phẩm không được để trống.";
    const cat = Number(core.categoryId);
    if (Number.isNaN(cat) || cat <= 0) return "Danh mục không hợp lệ.";

    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      if ((v.model_name ?? "").toString().trim().length === 0) {
        return `Biến thể #${i + 1}: Model name không được để trống.`;
      }
      const price = Number(v.price ?? 0);
      if (Number.isNaN(price) || price < 0) {
        return `Biến thể #${i + 1}: Giá không hợp lệ.`;
      }
      const quantity = Number(v.quantity ?? 0);
      if (Number.isNaN(quantity) || quantity < 0) {
        return `Biến thể #${i + 1}: Số lượng không hợp lệ.`;
      }
      const stock = v.stock === "" || v.stock == null ? null : Number(v.stock);
      if (stock != null && (Number.isNaN(stock) || stock < 0)) {
        return `Biến thể #${i + 1}: Tồn kho không hợp lệ.`;
      }
      const warranty =
        v.warranty_months === "" || v.warranty_months == null
          ? null
          : Number(v.warranty_months);
      if (warranty != null && (Number.isNaN(warranty) || warranty < 0)) {
        return `Biến thể #${i + 1}: Bảo hành (tháng) không hợp lệ.`;
      }
    }

    return null;
  }, [core, variants]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) {
      setError("Thiếu mã sản phẩm. Vui lòng tải lại trang.");
      return;
    }
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError(null);

    const parsedCategory = Number(core.categoryId);

    const payload: ProductFormPayload = {
      name: core.name.trim(),
      category_id: parsedCategory,
      description: core.description.trim() || "",
      status: core.status,
      images: images.map((img) => ({ id: img.id, image: img.image.trim() })).filter((i) => i.image.length > 0),
      variants: variants.map((v) => ({
        id: v.id,
        sku: (v.sku || "").trim() || undefined,
        model_name: (v.model_name || "").toString().trim() || undefined,
        price: v.price === "" ? undefined : Number(v.price),
        quantity: v.quantity === "" ? undefined : Number(v.quantity),
        ram_id: v.ram_id ?? null,
        storage_id: v.storage_id ?? null,
        stock: v.stock === "" ? null : Number(v.stock),
        warranty_months: v.warranty_months === "" ? null : Number(v.warranty_months),
      })),
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
                    value={core.name}
                    onChange={handleCoreChange}
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Danh mục</label>
                  <select
                    name="categoryId"
                    value={core.categoryId}
                    onChange={handleCoreChange}
                    required
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select name="status" value={core.status} onChange={handleCoreChange}>
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Mô tả sản phẩm</label>
                  <textarea
                    name="description"
                    rows={10}
                    value={core.description}
                    onChange={handleCoreChange}
                    placeholder="Mô tả chi tiết sản phẩm..."
                  />
                </div>
              </div>

              <div className="right-column">
                {/* Images */}
                <div className="form-group">
                  <label>Ảnh (đường dẫn)</label>
                  {images.map((img, index) => (
                    <div key={index} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <input
                        type="text"
                        placeholder="VD: products/cover.jpg"
                        value={img.image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <button type="button" className="btn" onClick={() => removeImageRow(index)}>
                        Xóa
                      </button>
                    </div>
                  ))}
                  <button type="button" className="btn" onClick={addImageRow}>
                    + Thêm ảnh
                  </button>
                </div>

                {/* Variants */}
                <div className="form-group">
                  <label>Biến thể</label>
                  {variants.map((v, index) => (
                    <div key={index} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 10 }}>
                      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                        <input
                          type="text"
                          placeholder="Model name"
                          value={v.model_name ?? ""}
                          onChange={(e) => handleVariantField(index, "model_name", e.target.value)}
                        />
                        <input
                          type="number"
                          min={0}
                          placeholder="Giá"
                          value={v.price ?? ""}
                          onChange={(e) => handleVariantField(index, "price", e.target.value)}
                        />
                        <input
                          type="number"
                          min={0}
                          placeholder="Số lượng"
                          value={v.quantity ?? ""}
                          onChange={(e) => handleVariantField(index, "quantity", e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="SKU (tùy chọn)"
                          value={v.sku ?? ""}
                          onChange={(e) => handleVariantField(index, "sku", e.target.value)}
                        />
                      </div>
                      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
                        <select
                          value={v.ram_id ?? ""}
                          onChange={(e) => handleVariantField(index, "ram_id", e.target.value ? Number(e.target.value) : null)}
                        >
                          <option value="">-- RAM --</option>
                          {rams.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name} ({r.value})
                            </option>
                          ))}
                        </select>
                        <select
                          value={v.storage_id ?? ""}
                          onChange={(e) => handleVariantField(index, "storage_id", e.target.value ? Number(e.target.value) : null)}
                        >
                          <option value="">-- Storage --</option>
                          {storages.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} ({s.value})
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min={0}
                          placeholder="Tồn kho (optional)"
                          value={v.stock ?? ""}
                          onChange={(e) => handleVariantField(index, "stock", e.target.value)}
                        />
                        <input
                          type="number"
                          min={0}
                          placeholder="Bảo hành (tháng)"
                          value={v.warranty_months ?? ""}
                          onChange={(e) => handleVariantField(index, "warranty_months", e.target.value)}
                        />
                      </div>

                      <div style={{ marginTop: 8 }}>
                        <button type="button" className="btn" onClick={() => removeVariantRow(index)}>
                          Xóa biến thể
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn" onClick={() => addVariantRow()}>
                    + Thêm biến thể
                  </button>
                </div>

                <button type="submit" className="save-btn btn primary" disabled={saving}>
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
