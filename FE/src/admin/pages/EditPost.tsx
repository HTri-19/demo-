import { Link } from "react-router-dom";
import "../assets/css/EditPost.css";

const EditPost = () => {
  return (
    <div className="post-page">
      <div className="main">
        {/* PAGE HEADER */}
        <div className="page-header">
          <Link to="/admin/postmanager">
            <button className="btn cancel">Quay lại</button>
          </Link>
          <h2>Chỉnh sửa bài viết</h2>
        </div>

        {/* EDIT FORM */}
        <div className="form-box">
          <div className="form-group">
            <label>Tiêu đề bài viết</label>
            <input type="text" placeholder="Nhập tiêu đề..." />
          </div>

          <div className="form-group">
            <label>Tác giả</label>
            <input type="text" placeholder="Nhập tên tác giả..." />
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
            <label>Trạng thái</label>
            <select>
              <option>Đã đăng</option>
              <option>Bản nháp</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nội dung</label>
            <textarea
              rows={10}
              placeholder="Nhập nội dung bài viết..."
            ></textarea>
          </div>

          <div className="form-actions">
            <button className="btn primary">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
