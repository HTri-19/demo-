import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Adduser.css";
import { createUser } from "../api/userApi";
import { UserFormPayload } from "../../interface/IUser";

const Adduser = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<UserFormPayload>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    status: "active",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
    setError(null);

    if (!formValues.password || !formValues.password.trim()) {
      setError("Mật khẩu không được để trống.");
      return;
    }

    setSubmitting(true);
    try {
      await createUser({
        ...formValues,
        phone: formValues.phone?.trim() || undefined,
        password: formValues.password.trim(),
      });
      navigate("/admin/usermanager");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tạo người dùng. Vui lòng thử lại.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="user-page">
      <div className="main">
        <div className="page-header">
          <h2>Thêm người dùng</h2>
          <Link to="/admin/usermanager">
            <button type="button" className="btn cancel">
              Quay lại
            </button>
          </Link>
        </div>

        <div className="add-user-container">
          <form className="add-user-form" onSubmit={handleSubmit}>
            <div className="left-column">
              <div className="form-group">
                <label>Ảnh đại diện</label>
                <input type="file" className="upload-input" disabled />
              </div>

              <div className="form-group">
                <label>Quyền người dùng</label>
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
            </div>

            <div className="right-column">
              <div className="form-group">
                <label>Họ và tên</label>
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
                <label>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Nhập mật khẩu..."
                  value={formValues.password ?? ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="actions">
                <button
                  type="submit"
                  className="btn primary save-btn"
                  disabled={submitting}
                >
                  {submitting ? "Đang thêm..." : "Thêm người dùng"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
