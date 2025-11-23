import { Link } from "react-router-dom";
import "../assets/css/Adduser.css";
const Adduser = () => {
  return (
    <div className="user-page">
      <div className="main">
        {/* PAGE HEADER */}
        <div className="page-header">
          <h2>Thêm người dùng</h2>
          <Link to="/admin/usermanager">
            <button type="button" className="btn cancel">
              Quay lại
            </button>
          </Link>
        </div>

        {/* FORM WRAPPER */}
        <div className="add-user-container">
          <form className="add-user-form">
            {/* LEFT COLUMN */}
            <div className="left-column">
              <div className="form-group">
                <label>Ảnh đại diện</label>
                <input type="file" className="upload-input" />
              </div>

              <div className="form-group">
                <label>Quyền người dùng</label>
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
            </div>

            {/* RIGHT COLUMN */}
            <div className="right-column">
              <div className="form-group">
                <label>Họ và tên</label>
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
                <label>Mật khẩu</label>
                <input type="password" placeholder="Nhập mật khẩu..." />
              </div>

              {/* ACTION BUTTONS */}
              <div className="actions">
                <button type="submit" className="btn primary save-btn">
                  Thêm người dùng
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
