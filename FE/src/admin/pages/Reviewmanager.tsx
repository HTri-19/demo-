import "../assets/css/Review.css";
const Reviewmanager = () => {
  return (
    <div className="review-page">
      {/* PAGE HEADER */}
      <div className="main">
        <div className="page-header">
          <h2>Quản lý đánh giá sản phẩm</h2>
        </div>

        {/* FILTERS */}
        <div className="filter-box">
          <input
            type="text"
            placeholder="Tìm theo sản phẩm, khách hàng..."
            className="filter-input"
          />

          <select className="filter-select">
            <option>Tất cả số sao</option>
            <option>5 sao</option>
            <option>4 sao</option>
            <option>3 sao</option>
            <option>2 sao</option>
            <option>1 sao</option>
          </select>

          <select className="filter-select">
            <option>Tất cả trạng thái</option>
            <option>Hiển thị</option>
            <option>Ẩn</option>
          </select>

          <button className="btn">Lọc</button>
        </div>

        {/* REVIEW TABLE */}
        <div className="table-box">
          <table className="review-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sản phẩm</th>
                <th>Khách hàng</th>
                <th>Số sao</th>
                <th>Nội dung</th>
                <th>Ngày đánh giá</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {/* Fake row 1 */}
              <tr>
                <td>1</td>
                <td>Laptop Gaming Acer Nitro 5</td>
                <td>Nguyễn Văn A</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td>Sản phẩm dùng rất tốt, chạy mượt.</td>
                <td>10/11/2024</td>
                <td>
                  <span className="status active">Hiển thị</span>
                </td>
                <td>
                  <button className="action-btn edit">Ẩn</button>
                  <button className="action-btn delete">Xóa</button>
                </td>
              </tr>

              {/* Fake row 2 */}
              <tr>
                <td>2</td>
                <td>Chuột Logitech G102</td>
                <td>Trần Thị B</td>
                <td>⭐⭐⭐⭐</td>
                <td>Ổn trong tầm giá, hơi nhẹ.</td>
                <td>08/11/2024</td>
                <td>
                  <span className="status hide">Đã ẩn</span>
                </td>
                <td>
                  <button className="action-btn edit">Hiện</button>
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

export default Reviewmanager;
