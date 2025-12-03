import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/css/EditUsers.css";
import { fetchUserById, updateUser } from "../api/userApi";
import { UserFormPayload } from "../../interface/IUser";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<UserFormPayload>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    status: "active",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Không tìm thấy người dùng.");
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUserById(id);
        setFormValues({
          name: data.name,
          email: data.email,
          phone: data.phone ?? "",
          password: "",
          role: data.role,
          status: data.status,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Không thể tải dữ liệu người dùng.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) return;

    setSaving(true);
    setError(null);

    try {
      await updateUser(id, {
        ...formValues,
        phone: formValues.phone?.trim() || undefined,
        password: formValues.password?.trim() || undefined,
      });
      navigate("/admin/usermanager");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể cập nhật người dùng. Vui lòng thử lại.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="user-page">
      <div className="main">
        <div className="page-header">
          <Link to="/admin/usermanager">
            <button className="btn cancel">Quay lại</button>
          </Link>
          <h2>Chỉnh sửa người dùng</h2>
        </div>

        {loading ? (
          <p className="loading-state">Đang tải thông tin người dùng...</p>
        ) : (
          <form className="form-box" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên người dùng</label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên người dùng..."
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Nhập email..."
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                placeholder="Nhập số điện thoại..."
                value={formValues.phone ?? ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Quyền</label>
              <select
                name="role"
                value={formValues.role}
                onChange={handleChange}
              >
                <option value="user">Khách hàng</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </div>

            <div className="form-group">
              <label>Trạng thái</label>
              <select
                name="status"
                value={formValues.status}
                onChange={handleChange}
              >
                <option value="active">Hoạt động</option>
                <option value="unactive">Bị khóa</option>
              </select>
            </div>

            <div className="form-group">
              <label>Mật khẩu mới (tuỳ chọn)</label>
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu mới nếu muốn thay đổi..."
                value={formValues.password ?? ""}
                onChange={handleChange}
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
              <button type="submit" className="btn primary" disabled={saving}>
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default EditUser;
