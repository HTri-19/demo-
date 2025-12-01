import { Link } from "react-router-dom";
import "../assets/css/EditOrder.css";

const EditOrder = () => {
  return (
    <div className="edit-order-page">
      <div className="main">
        {/* PAGE HEADER */}
        <div className="page-header">
          <h2>Chỉnh sửa đơn hàng</h2>
          <Link to="/admin/ordermanager">
            <button className="btn cancel back-btn">Quay lại</button>
          </Link>
        </div>

        <div className="edit-order-container">
          <form className="edit-order-form">
            {/* LEFT COLUMN */}
            <div className="left-column">
              <div className="form-group">
                <label>Mã đơn hàng</label>
                <input type="text" defaultValue="#DH001" readOnly />
              </div>

              <div className="form-group">
                <label>Khách hàng</label>
                <input type="text" defaultValue="Nguyễn Văn A" />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" defaultValue="0909123456" />
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <textarea rows={4} defaultValue="123 Nguyễn Trãi, Hà Nội" />
              </div>

              <div className="form-group">
                <label>Tổng tiền</label>
                <input type="number" defaultValue={2500000} />
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <select defaultValue="pending">
                  <option value="pending">Chờ xử lý</option>
                  <option value="shipping">Đang giao</option>
                  <option value="success">Hoàn thành</option>
                  <option value="canceled">Đã hủy</option>
                </select>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="right-column">
              <div className="form-group">
                <label>Sản phẩm trong đơn</label>

                <div className="order-products">
                  <div className="order-product-row">
                    <span className="name">Laptop Acer Nitro 5</span>
                    <span className="qty">x1</span>
                    <span className="price">22.500.000₫</span>
                  </div>

                  <div className="order-product-row">
                    <span className="name">Chuột Logitech G102</span>
                    <span className="qty">x2</span>
                    <span className="price">700.000₫</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea rows={5} placeholder="Ghi chú thêm..." />
              </div>

              <button className="save-btn btn primary">
                Cập nhật đơn hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
