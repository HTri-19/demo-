import { Link } from "react-router-dom";
import "../assets/css/Post.css";

const PostManager = () => {
  return (
    <div className="post-page">
      {/* PAGE HEADER */}
      <div className="main">
        <div className="page-header">
          <h2>Quản lý bài viết</h2>
        </div>

        {/* FILTERS + ADD BUTTON */}
        <div className="filter-box">
          <input
            type="text"
            placeholder="Tìm bài viết..."
            className="filter-input"
          />

          <select className="filter-select">
            <option>Tất cả danh mục</option>
            <option>Máy ảnh</option>
            <option>Ống kính</option>
            <option>Phụ kiện</option>
          </select>

          <select className="filter-select">
            <option>Tất cả trạng thái</option>
            <option>Đã đăng</option>
            <option>Bản nháp</option>
          </select>

          <button className="btn">Lọc</button>

          {/* ADD POST BUTTON aligned right */}
          <Link to="/admin/addpost">
            <button className="btn primary add-post-btn">
              + Thêm bài viết
            </button>
          </Link>
        </div>

        {/* POST TABLE */}
        <div className="table-box">
          <table className="post-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Tác giả</th>
                <th>Danh mục</th>
                <th>Ngày đăng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Hướng dẫn chọn máy ảnh cho người mới</td>
                <td>Nguyễn Văn A</td>
                <td>Máy ảnh</td>
                <td>10/11/2024</td>
                <td>
                  <span className="status success">Đã đăng</span>
                </td>
                <td>
                  <Link to="/admin/editpost">
                    <button className="action-btn edit">Sửa</button>
                  </Link>
                  <button className="action-btn delete">Xóa</button>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>Top 5 lens phù hợp để chụp chân dung</td>
                <td>Lê Minh Đức</td>
                <td>Ống kính</td>
                <td>05/11/2024</td>
                <td>
                  <span className="status draft">Bản nháp</span>
                </td>
                <td>
                  <Link to="/admin/editpost">
                    <button className="action-btn edit">Sửa</button>
                  </Link>
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

export default PostManager;
