import "../assets/css/Profile.css";

const Profile = () => {
  return (
    <div className="product-page">
      <div className="main">
        {/* PAGE HEADER */}
        <div className="page-header">
          <h2>Thêm sản phẩm mới</h2>
        </div>

        {/* PRODUCT FORM BOX */}
        <div className="add-product-container">
          <form className="add-product-form">
            {/* LEFT COLUMN */}
            <div className="left-column">
              {/* IMAGE UPLOAD */}
              <div className="form-group">
                <label>Ảnh sản phẩm</label>
                <input type="file" name="image" className="upload-input" />
              </div>

              {/* CATEGORY */}
              <div className="form-group">
                <label>Danh mục</label>
                <select name="category">
                  <option value="">-- Chọn danh mục --</option>
                  <option value="Laptop">Laptop</option>
                  <option value="PC">PC</option>
                  <option value="Phụ kiện">Phụ kiện</option>
                </select>
              </div>

              {/* STATUS */}
              <div className="form-group">
                <label>Trạng thái</label>
                <select name="status">
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Hết hàng">Hết hàng</option>
                </select>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="right-column">
              <div className="form-group">
                <label>Tên sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nhập tên sản phẩm..."
                />
              </div>

              <div className="form-group">
                <label>Giá</label>
                <input type="number" name="price" placeholder="VD: 15000000" />
              </div>

              <div className="form-group">
                <label>Tồn kho</label>
                <input type="number" name="stock" placeholder="VD: 10" />
              </div>

              <div className="form-group">
                <label>Mô tả sản phẩm</label>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="Nhập mô tả sản phẩm..."
                ></textarea>
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" className="btn primary save-btn">
                Lưu sản phẩm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
