import { Link } from "react-router-dom";
import "../assets/css/Orders.css";

const Ordermanager = () => {
  return (
    <div className="order-page">
      <div className="main">
        {/* PAGE HEADER */}
        <div className="page-header">
          <h2>Quản lý đơn hàng</h2>
        </div>

        {/* FILTERS */}
        <div className="filter-box">
          <input
            type="text"
            placeholder="Tìm đơn hàng..."
            className="filter-input"
          />

          <select className="filter-select">
            <option>Tất cả trạng thái</option>
            <option>Chờ xử lý</option>
            <option>Đang giao</option>
            <option>Hoàn thành</option>
            <option>Đã hủy</option>
          </select>

          <button className="btn">Lọc</button>
          <Link to="/admin/addorder">
            <button className="btn primary add-order-btn">
              + Tạo đơn hàng
            </button>
          </Link>
        </div>

        {/* ORDER TABLE */}
        <div className="table-box">
          <table className="order-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã đơn hàng</th>
                <th>Khách hàng</th>
                <th>Địa chỉ</th>
                <th>Tổng tiền</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>#DH001</td>
                <td>Nguyễn Văn A</td>
                <td>123 Nguyễn Trãi, Hà Nội</td> {/* 👉 Địa chỉ */}
                <td>2.500.000₫</td>
                <td>12/11/2024</td>
                <td>
                  <span className="status pending">Chờ xử lý</span>
                </td>
                <td>
                  <Link to="/admin/editorder">
                    <button className="action-btn edit">Sửa</button>
                  </Link>
                  <button className="action-btn delete">Hủy</button>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>#DH002</td>
                <td>Trần Thị B</td>
                <td>45 Hai Bà Trưng, TP.HCM</td> {/* 👉 Địa chỉ */}
                <td>850.000₫</td>
                <td>11/11/2024</td>
                <td>
                  <span className="status success">Hoàn thành</span>
                </td>
                <td>
                  <Link to="/admin/editorder">
                    <button className="action-btn edit">Sửa</button>
                  </Link>
                  <button className="action-btn delete">Hủy</button>
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

export default Ordermanager;
