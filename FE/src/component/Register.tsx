import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng

// Import Assets của bạn (Giữ nguyên)
import Frame65 from "../assets/images/Frame 65.png";
import vanchuyen from "../assets/images/vanchuyen.png";
import bocongthuong from "../assets/images/bocongthuong.png";
import dmca from "../assets/images/dmca.png";
import zalo from "../assets/images/zalo.png";
import facebook from "../assets/images/facebook.png";
import tiktok from "../assets/images/tiktok.png";
import youtube from "../assets/images/youtub.png";
import google from "../assets/images/google.png";

// --- Định nghĩa Typescript Interfaces ---
interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  agreeTerms: boolean;
}

interface RegisterResponse {
  message: string;
  token?: string; // Có thể có token sau khi đăng ký
}


// **ĐÃ SỬA ENDPOINT:** Bỏ domain:port nếu Frontend và Backend chạy cùng 1 máy chủ
// Dựa trên lỗi 401, chúng ta dùng endpoint có prefix '/v1'
const API_REGISTER_URL = 'http://127.0.0.1:8000/api/auth/register'; 

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    agreeTerms: false, // Thêm state cho checkbox
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. Hàm xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy name, value, checked từ target
    const { name, value, checked, type } = e.target;
    
    // Xử lý checkbox riêng
    if (type === 'checkbox' && name === 'agreeTerms') {
        setFormData(prevData => ({
            ...prevData,
            [name]: checked,
        }));
    } else {
        // Xử lý các input khác
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }
  };
  

 // 2. Hàm xử lý gửi form (Đăng ký)
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // BƯỚC SỬA: Loại bỏ khoảng trắng ở đầu và cuối (trim)
    const password = formData.password.trim(); 
    const password_confirmation = formData.password_confirmation.trim();

//     if (password !== password_confirmation) { 
//       setError('Xác nhận mật khẩu không khớp.'); // <== Lỗi bạn đang thấy
//       setLoading(false);
//       return;
// }
    
    // Dữ liệu gửi đi (Chỉ cần gửi 'password' nếu Backend tự xử lý password_confirmation)
    // Trong hàm handleSubmit
      const dataToSend = {
          // SỬA: Thay 'name' bằng 'full_name' (hoặc 'username' nếu 'full_name' không hoạt động)
          name: formData.name.trim(), // Thay đổi key
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          password: password,
          password_confirmation: password_confirmation, 
      };


    try {
      // Gửi yêu cầu POST đến API Backend
      const response = await axios.post<RegisterResponse>(API_REGISTER_URL, dataToSend);

      // 3. Xử lý thành công
      alert(response.data.message || 'Đăng ký thành công! Vui lòng đăng nhập.');
      
      // Chuyển hướng người dùng đến trang đăng nhập
      navigate('/login');
      
    } catch (err: any) {
      // 4. Xử lý lỗi
      let errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.';
      
      if (axios.isAxiosError(err) && err.response) {
          // Log lỗi từ server ra console để xem chi tiết
          console.error("Lỗi từ Server:", err.response.data); // <== Cần xem nội dung này
          console.error("Mã Status:", err.response.status);
        
        // Cố gắng lấy thông báo lỗi từ server
        // Có thể là err.response.data.message, err.response.data.error, hoặc là một mảng lỗi
        errorMessage = err.response.data.message || err.response.data.error || errorMessage;
      } else {
         console.error("Lỗi mạng hoặc không xác định:", err);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN HEADER */}
      <header className="main-header">
        <div className="container header-inner">
          <Link to="/" className="logo"> 
              <img src={Frame65} alt="T&T Center" />
          </Link>
          <nav className="header-nav">
            <a href="category" className="menu-btn">
              <i className="fa-solid fa-bars"></i> Danh mục
            </a>
            <a href="#" className="location-btn">
              <i className="fa-solid fa-location-dot"></i> Xem giá tại Hà Nội
            </a>
          </nav>

          <div className="search-box">
            <input type="text" placeholder="Nhập tên sản phẩm cần tìm..." />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="header-actions">
            <a href="cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
            </a>

            <Link to="/Login" className="login-btn">
              <i className="fa-regular fa-user"></i> Đăng nhập
            </Link>
          </div>
        </div>
      </header>
      
      {/* FORM ĐĂNG KÝ (ĐÃ THÊM LOGIC) */}
      <section className="form-cotrol">
        <div className="login-container">
          <h2>Đăng ký Tài Khoản</h2>
          <form className="login-form" onSubmit={handleSubmit}> {/* THÊM onSubmit */}
            <label>Thông tin đăng nhập</label>

            {/* HIỂN THỊ THÔNG BÁO LỖI */}
            {error && (
                <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '15px' }}>
                    {error}
                </p>
            )}
            
            {/* HỌ VÀ TÊN */}
            <input 
                type="text" 
                name="name" // Đặt name để handleInputChange hoạt động
                placeholder="Họ và tên*" 
                value={formData.name}
                onChange={handleInputChange}
                required 
            />
            {/* SỐ ĐIỆN THOẠI */}
            <input 
                type="tel" 
                name="phone"
                placeholder="Số điện thoại*" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
            />
            {/* EMAIL */}
            <input 
                type="email" 
                name="email"
                placeholder="Email*" 
                value={formData.email}
                onChange={handleInputChange}
                required 
            />
            {/* MẬT KHẨU */}
            <input 
                type="password" 
                name="password"
                placeholder="Nhập mật khẩu*" 
                value={formData.password}
                onChange={handleInputChange}
                required 
            />
            {/* XÁC NHẬN MẬT KHẨU */}
            <input
                type="password"
                name="password_confirmation"
                placeholder="Xác nhận lại mật khẩu*"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
            />
            
            {/* CHECKBOX ĐIỀU KHOẢN */}
            {/* JSX ĐÃ CHỈNH SỬA: Thêm justifyContent: 'flex-end' */}
          <div style={{
              display: 'right', 
              alignItems: 'right', 
              margin: '15px 0', 
              // Thêm paddingLeft để căn chỉnh lề trái với các input
              paddingLeft: '20px' 
          }}>
            {/* <input 
              type="checkbox" 
              id="agree" 
              // ... (các props khác)
              style={{marginRight: '10px'}}
            /> */}
            {/* <label htmlFor="agree" style={{
                marginBottom: '0', 
                fontWeight: 'normal',
                fontSize: '1em',
                lineHeight: '1.2'
            }}>
              Tôi đồng ý với các điều khoản
            </label> */}
          </div>
            
            {/* NÚT ĐĂNG KÝ */}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'ĐĂNG KÝ'}
            </button>
            
            <button type="button" className="btn-google">
              <img src={google} alt="Google" />
              Đăng Ký bằng tài khoản Google
            </button>
            
            <p className="signup-text">
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h3>Về T&T Center</h3>
            <ul>
              <li>
                <a href="#">Về chúng tôi</a>
              </li>
              <li>
                <a href="#">Tuyển dụng</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Chính sách</h3>
            <ul>
              <li>
                <a href="#">Chính sách bảo hành</a>
              </li>
              <li>
                <a href="#">Chính sách bán hàng</a>
              </li>
              <li>
                <a href="#">Chính sách kiểm hàng</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Thông tin</h3>
            <ul>
              <li>
                <a href="#">Hệ thống cửa hàng</a>
              </li>
              <li>
                <a href="#">Hướng dẫn đặt hàng Online</a>
              </li>
              <li>
                <a href="#">Tin tức</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Tổng đài hỗ trợ và bảo hành</h3>
            <p>
              Hotline: <strong>0898.143.789</strong>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:ttcentersale@gmail.com">ttcentersale@gmail.com</a>
            </p>
          </div>

          <div className="footer-column">
            <h3>Phương thức thanh toán</h3>
            <div className="payment-icons">
              <img src="/images/visa.png" alt="Visa" />
            </div>

            <h3>Đơn vị vận chuyển</h3>
            <div className="shipping-icons">
              <img src={vanchuyen} alt="GHN" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social">
            <p>Liên kết mạng xã hội</p>
            <div className="social-icons">
              <a href="#">
                <img src={facebook} alt="Facebook" />
              </a>
              <a href="#">
                <img src={tiktok} alt="TikTok" />
              </a>
              <a href="#">
                <img src={youtube} alt="YouTube" />
              </a>
              <a href="#">
                <img src={zalo} alt="Zalo" />
              </a>
            </div>
          </div>
          <div className="certificates">
            <img src={bocongthuong} alt="Bộ Công Thương" />
            <img src={dmca} alt="DMCA" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Register;