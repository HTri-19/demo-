import { Link } from "react-router-dom";
import "../assets/css/EditProduct.css";

const EditProduct = () => {
  return (
    <div className="edit-product-page">
      <div className="main">
        {/* PAGE HEADER */}
        <div className="page-header">
          {/* BACK BUTTON */}
          <Link to="/admin/productmanager">
            <button className="btn cancel back-btn">Quay lại</button>
          </Link>
          <h2>Chỉnh sửa sản phẩm</h2>
        </div>

        {/* WRAPPER */}
        <div className="edit-product-container">
          <form className="edit-product-form">
            {/* LEFT COLUMN */}
            <div className="left-column">
              <div className="form-group">
                <label>Tên sản phẩm</label>
                <input type="text" defaultValue="Laptop Gaming Acer Nitro 5" />
              </div>

              <div className="form-group">
                <label>Giá</label>
                <input type="number" defaultValue={22500000} />
              </div>

              <div className="form-group">
                <label>Tồn kho</label>
                <input type="number" defaultValue={15} />
              </div>

              <div className="form-group">
                <label>Danh mục</label>
                <select defaultValue="laptop">
                  <option value="laptop">Laptop</option>
                  <option value="pc">PC</option>
                  <option value="accessory">Phụ kiện</option>
                </select>
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <select defaultValue="in-stock">
                  <option value="in-stock">Còn hàng</option>
                  <option value="out-stock">Hết hàng</option>
                </select>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="right-column">
              <div className="form-group">
                <label>Mô tả sản phẩm</label>
                <textarea
                  rows={10}
                  defaultValue="Laptop cấu hình mạnh, chạy mượt mọi tác vụ."
                />
              </div>

              <div className="form-group">
                <label>Ảnh sản phẩm</label>
                <input type="file" className="upload-input" />
              </div>

              <button className="save-btn btn primary">
                Cập nhật sản phẩm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
