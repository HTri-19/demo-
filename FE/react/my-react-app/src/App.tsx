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
import ForgotPassword from './component/ForgotPassword'; // Import component mới
import ResetPassword from './component/ResetPassword';  // Sửa path này

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
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ROUTE MỚI */}
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
