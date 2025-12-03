import "./App.css";
import "./assets/form.css";
import "./assets/product.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Cart from "./component/Cart";
import Checkcart from "./component/Checkcart";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Productdetail from "./component/Productdetail";
import Category from "./component/Category";
import News from "./component/News";
import NewsDetail from "./component/NewsDetail";
import ForgotPassword from "./component/ForgotPassword"; // Import component mới
import ResetPassword from "./component/ResetPassword"; // Sửa path này
import Addproduct from "./admin/pages/Addproduct";
import Addorder from "./admin/pages/Addorder";
import Adduser from "./admin/pages/Adduser";
import Addpost from "./admin/pages/Addpost";
import Adminlayout from "./admin/pages/Adminlayout";
import Dashboard from "./admin/pages/Dashboard";
import Productmanager from "./admin/pages/Productmanager";
import Ordermanager from "./admin/pages/Ordermanager";
import Usermanager from "./admin/pages/Usermanager";
import Postmanager from "./admin/pages/Postmanager";
import Reviewmanager from "./admin/pages/Reviewmanager";
import Profile from "./admin/pages/Profile";
import EditProduct from "./admin/pages/EditProduct";
import Editproduct_id from "./admin/pages/Editproduct_id";
import EditOrder from "./admin/pages/EditOrder";
import EditUser from "./admin/pages/EditUser";
import EditPost from "./admin/pages/EditPost";
import ProductId from "./component/ProductId";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regiter" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkcart" element={<Checkcart />} />
        <Route path="/product_detail" element={<Productdetail />} />
        <Route path="/category" element={<Category />} />
        <Route path="/news" element={<News />} />
        <Route path="/newsdetail" element={<NewsDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        <Route path="/product/:id" element={<ProductId />} />
        {/* ROUTE MỚI */}
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* ADMIN ROUTES (WRAPPED IN ADMINLAYOUT) */}
        <Route path="/admin" element={<Adminlayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productmanager" element={<Productmanager />} />
          <Route path="ordermanager" element={<Ordermanager />} />
          <Route path="usermanager" element={<Usermanager />} />
          <Route path="postmanager" element={<Postmanager />} />
          <Route path="reviewmanager" element={<Reviewmanager />} />
          <Route path="profile" element={<Profile />} />
          {/* phần ADD */}
          <Route path="addproduct" element={<Addproduct />} />
          <Route path="addorder" element={<Addorder />} />
          <Route path="adduser" element={<Adduser />} />
          <Route path="addpost" element={<Addpost />} />
          {/* Phần EDIT */}
          <Route path="editproduct" element={<EditProduct />} />
          <Route path="editproduct/:id" element={<Editproduct_id />} />
          <Route path="editorder" element={<EditOrder />} />
          <Route path="edituser/:id" element={<EditUser />} />
          <Route path="editpost" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
