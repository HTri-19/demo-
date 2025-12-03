import { Link } from "react-router-dom";
import "../assets/css/AddPost.css";
const Addpost = () => {
  return (
    <div className="add-post-page">
      <div className="main">
        {/* PAGE HEADER */}
        <div className="page-header">
          <h2>Thêm bài viết mới</h2>
          {/* BACK BUTTON */}
          <Link to="/admin/postmanager">
            <button className="btn cancel back-btn">Quay lại</button>
          </Link>
        </div>

        {/* WRAPPER */}
        <div className="add-post-container">
          <form className="add-post-form">
            {/* LEFT - BASIC INFO */}
            <div className="left-column">
              <div className="form-group">
                <label>Tiêu đề bài viết</label>
                <input type="text" placeholder="Nhập tiêu đề..." />
              </div>

              <div className="form-group">
                <label>Danh mục</label>
                <select>
                  <option>Máy ảnh</option>
                  <option>Ống kính</option>
                  <option>Phụ kiện</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ảnh thumbnail</label>
                <input type="file" className="upload-input" />
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <select>
                  <option>Đã đăng</option>
                  <option>Bản nháp</option>
                </select>
              </div>
            </div>

            {/* RIGHT - CONTENT */}
            <div className="right-column">
              <div className="form-group">
                <label>Nội dung bài viết</label>
                <textarea
                  rows={12}
                  placeholder="Nhập nội dung bài viết..."
                ></textarea>
              </div>

              <button className="save-btn btn primary">Lưu bài viết</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addpost;
