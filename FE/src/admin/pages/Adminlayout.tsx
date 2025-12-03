import { Link, Outlet, useLocation } from "react-router-dom";
import Frame65 from "../assets/img/Frame 65.png";
const Adminlayout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <Link to="/admin/dashboard">
          <div className="logo">
            <img src={Frame65} alt="Logo" className="logo-img" />
          </div>
        </Link>
        <ul className="menu">
          <Link to="/admin/dashboard">
            <li
              className={
                location.pathname === "/admin/dashboard" ? "active" : ""
              }
            >
              <i className="fa-solid fa-house"></i> Dashboard
            </li>
          </Link>

          <Link to="/admin/productmanager">
            <li
              className={
                location.pathname === "/admin/productmanager" ? "active" : ""
              }
            >
              <i className="fa-solid fa-box-open"></i> Quản lí sản phẩm
            </li>
          </Link>

          <Link to="/admin/ordermanager">
            <li
              className={
                location.pathname === "/admin/ordermanager" ? "active" : ""
              }
            >
              <i className="fa-solid fa-file-invoice-dollar"></i> Quản lý đơn
              hàng
            </li>
          </Link>
          <Link to="/admin/usermanager">
            <li
              className={
                location.pathname === "/admin/usermanager" ? "active" : ""
              }
            >
              <i className="fa-solid fa-users"></i> Quản lí người dùng
            </li>
          </Link>
          <Link to="/admin/postmanager">
            <li
              className={
                location.pathname === "/admin/postmanager" ? "active" : ""
              }
            >
              <i className="fa-solid fa-newspaper"></i> Quản lý bài viết
            </li>
          </Link>
          <Link to="/admin/reviewmanager">
            <li
              className={
                location.pathname === "/admin/reviewmanager" ? "active" : ""
              }
            >
              <i className="fa-solid fa-chart-line"></i> Đánh giá sản phẩm
            </li>
          </Link>
        </ul>
      </div>

      {/* MAIN AREA */}
      <div className="main">
        {/* TOPBAR */}
        <div className="topbar">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" placeholder="Search..." />
          </div>

          <div className="topbar-right">
            <i className="fa-regular fa-envelope icon"></i>
            <i className="fa-regular fa-bell icon"></i>
            <i className="fa-solid fa-layer-group icon"></i>
            <Link to="/admin/profile">
              <div className="profile">
                <img src="https://i.pravatar.cc/40" alt="profile" />
                <span>Hi, Hizrian</span>
              </div>
            </Link>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Adminlayout;
