import { Link } from "react-router-dom";
import "../assets/css/Addproduct.css";
const Addproduct = () => {
  return (
    <div className="product-page">
      <div className="main">
        {/* HEADER */}
        <div className="page-header">
          <h2>Thêm sản phẩm mới</h2>
          <Link to="/admin/productmanager">
            <button className="btn cancel">Quay lại</button>
          </Link>
        </div>

        {/* FORM BOX */}
        <div
          className="form-box"
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <form className="product-form">
            {/* IMAGE */}
            <div className="form-group">
              <label>Ảnh sản phẩm:</label>
              <input type="file" name="image" />
            </div>

            {/* NAME */}
            <div className="form-group">
              <label>Tên sản phẩm:</label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên sản phẩm..."
              />
            </div>

            {/* PRICE */}
            <div className="form-group">
              <label>Giá:</label>
              <input type="number" name="price" placeholder="VD: 2500000" />
            </div>

            {/* STOCK */}
            <div className="form-group">
              <label>Tồn kho:</label>
              <input type="number" name="stock" placeholder="VD: 10" />
            </div>

            {/* CATEGORY */}
            <div className="form-group">
              <label>Danh mục:</label>
              <select name="category">
                <option value="">-- Chọn danh mục --</option>
                <option value="Laptop">Laptop</option>
                <option value="PC">MacBook</option>
              </select>
            </div>

            {/* STATUS */}
            <div className="form-group">
              <label>Trạng thái:</label>
              <select name="status">
                <option value="Còn hàng">Còn hàng</option>
                <option value="Hết hàng">Hết hàng</option>
              </select>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn primary"
              style={{ marginTop: "15px" }}
            >
              Lưu sản phẩm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
