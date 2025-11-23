import { Link } from "react-router-dom";
import "../assets/css/Poducts.css";

const Productmanager = () => {
  return (
    <div className="product-page">
      {/* PAGE HEADER */}
      <div className="main">
        <div className="page-header">
          <h2>Quản lý sản phẩm</h2>
        </div>

        {/* FILTERS + ADD BUTTON */}
        <div className="filter-box">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="filter-input"
          />

          <select className="filter-select">
            <option>Tất cả danh mục</option>
            <option>Laptop</option>
            <option>PC</option>
            <option>Phụ kiện</option>
          </select>

          <select className="filter-select">
            <option>Tất cả trạng thái</option>
            <option>Còn hàng</option>
            <option>Hết hàng</option>
          </select>

          <button className="btn">Lọc</button>

          {/* NÚT THÊM SẢN PHẨM */}

          <Link to="/admin/addproduct">
            <button className="btn primary add-product-btn">
              + Thêm sản phẩm
            </button>
          </Link>
        </div>

        {/* PRODUCT TABLE */}
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
              <tr>
                <td>1</td>
                <td>
                  <img
                    src="https://i.imgur.com/Zc7sR7C.png"
                    className="product-img"
                  />
                </td>
                <td>Laptop Gaming Acer Nitro 5</td>
                <td>22.500.000₫</td>
                <td>15</td>
                <td>Laptop</td>
                <td>
                  <span className="status in-stock">Còn hàng</span>
                </td>
                <td>
                  <Link to="/admin/editproduct">
                    <button className="action-btn edit">Sửa</button>
                  </Link>
                  <button className="action-btn delete">Xóa</button>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>
                  <img
                    src="https://i.imgur.com/4YQZfTg.png"
                    className="product-img"
                  />
                </td>
                <td>Chuột Logitech G102</td>
                <td>350.000₫</td>
                <td>0</td>
                <td>Phụ kiện</td>
                <td>
                  <span className="status out-stock">Hết hàng</span>
                </td>
                <td>
                  <button className="action-btn edit">Sửa</button>
                  <button className="action-btn delete">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
        </div>
      </div>
    </div>
  );
};

export default Productmanager;
