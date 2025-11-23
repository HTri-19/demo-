import { Link } from "react-router-dom";
import "../assets/css/Users.css";

const Usermanager = () => {
  return (
    <div className="user-page">
      {/* PAGE HEADER */}
      <div className="main">
        <div className="page-header">
          <h2>Quản lý người dùng</h2>
        </div>

        {/* FILTERS + ADD BUTTON */}
        <div className="filter-box">
          <input
            type="text"
            placeholder="Tìm người dùng..."
            className="filter-input"
          />

          <select className="filter-select">
            <option>Tất cả quyền</option>
            <option>Khách hàng</option>
            <option>Quản trị viên</option>
          </select>

          <button className="btn">Lọc</button>

          {/* Button thêm người dùng */}
          <Link to="/admin/adduser">
            <button className="btn primary add-user-btn">
              + Thêm người dùng
            </button>
          </Link>
        </div>

        {/* USER TABLE */}
        <div className="table-box">
          <table className="user-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh đại diện</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Quyền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <img
                    src="https://i.imgur.com/4YQZfTg.png"
                    className="user-avatar"
                  />
                </td>
                <td>Nguyễn Văn A</td>
                <td>nguyen@gmail.com</td>
                <td>0909123456</td>
                <td>Khách hàng</td>
                <td>
                  <span className="status active">Hoạt động</span>
                </td>
                <td>
                  <Link to="/admin/edituser">
                    <button className="action-btn edit">Sửa</button>
                  </Link>
                  <button className="action-btn delete">Khóa</button>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>
                  <img
                    src="https://i.imgur.com/Zc7sR7C.png"
                    className="user-avatar"
                  />
                </td>
                <td>Trần Thị B</td>
                <td>tran@gmail.com</td>
                <td>0988234567</td>
                <td>Quản trị viên</td>
                <td>
                  <span className="status banned">Đã khóa</span>
                </td>
                <td>
                  <Link to="/admin/edituser">
                    <button className="action-btn edit">Sửa</button>
                  </Link>
                  <button className="action-btn delete">Khóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination right">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
        </div>
      </div>
    </div>
  );
};

export default Usermanager;
