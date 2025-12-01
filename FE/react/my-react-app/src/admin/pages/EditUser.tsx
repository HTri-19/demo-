import { Link } from "react-router-dom";
import "../assets/css/EditUsers.css";

const EditUser = () => {
  return (
    <div className="user-page">
      <div className="main">
        {/* PAGE HEADER */}
        <div className="page-header">
          <Link to="/admin/usermanager">
            <button className="btn cancel">Quay lại</button>
          </Link>
          <h2>Chỉnh sửa người dùng</h2>
        </div>

        {/* FORM */}
        <div className="form-box">
          <div className="form-group">
            <label>Tên người dùng</label>
            <input type="text" placeholder="Nhập tên người dùng..." />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập email..." />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="text" placeholder="Nhập số điện thoại..." />
          </div>

          <div className="form-group">
            <label>Quyền</label>
            <select>
              <option>Khách hàng</option>
              <option>Quản trị viên</option>
            </select>
          </div>

          <div className="form-group">
            <label>Trạng thái</label>
            <select>
              <option>Hoạt động</option>
              <option>Bị khóa</option>
            </select>
          </div>

          {/* ACTION BUTTONS */}
          <div className="form-actions">
            <button className="btn primary">Lưu thay đổi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
