import { Link } from "react-router-dom";
import "../assets/css/Addorder.css";
const Addorder = () => {
  return (
    <div className="order-page">
      <div className="main">
        {/* PAGE HEADER */}
        <div className="page-header">
          <h2>Tạo đơn hàng</h2>

          <Link to="/admin/ordermanager">
            <button className="btn cancel">Quay lại</button>
          </Link>
        </div>

        {/* FORM WRAPPER */}
        <div className="table-box form-box">
          {/* CUSTOMER INFO */}
          <h3 className="section-title">Thông tin khách hàng</h3>

          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" placeholder="Nhập tên khách hàng..." />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="text" placeholder="Nhập số điện thoại..." />
          </div>

          <div className="form-group">
            <label>Địa chỉ</label>
            <input type="text" placeholder="Nhập địa chỉ giao hàng..." />
          </div>

          {/* PRODUCT SECTION */}
          <h3 className="section-title">Sản phẩm</h3>

          <div className="filter-box" style={{ padding: "15px 0" }}>
            <select className="filter-select">
              <option>Chọn sản phẩm</option>
            </select>

            <input
              type="number"
              className="filter-input"
              min={1}
              defaultValue={1}
            />

            <button className="btn primary">+ Thêm</button>
          </div>

          {/* PRODUCT TABLE */}
          <table className="order-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {/* BẠN TỰ ĐỔ DỮ LIỆU BẰNG API SAU */}
              <tr>
                <td>Sản phẩm mẫu</td>
                <td>1</td>
                <td>0₫</td>
                <td>0₫</td>
                <td>
                  <button className="action-btn delete">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* TOTAL */}
          <div
            className="pagination"
            style={{ justifyContent: "flex-end", marginTop: "20px" }}
          >
            <h3>
              Tổng tiền:&nbsp;
              <span style={{ color: "#2563eb" }}>0₫</span>
            </h3>
          </div>

          {/* ACTION BUTTONS */}
          <div
            className="pagination"
            style={{ justifyContent: "flex-end", marginTop: "15px" }}
          >
            <button className="btn cancel">Hủy</button>
            <button className="btn primary">Tạo đơn hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addorder;
