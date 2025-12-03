import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


// Định nghĩa Interface cho bài viết chi tiết
interface ArticleDetail {
    id: number;
    title: string;
    summary: string;
    image: string;
    content: string;
    date: string;
    views: number;
}

// Dữ liệu tin tức chi tiết giả định
const ARTICLE_DETAILS: ArticleDetail[] = [
    { 
        id: 1, 
        title: 'Top 5 Laptop Tốt Nhất Dành Cho Tân Sinh Viên', 
        summary: 'Tổng hợp 5 mẫu laptop có hiệu năng tốt, thiết kế bền bỉ và giá cả phải chăng, rất phù hợp cho sinh viên bắt đầu năm học mới.', 
        image: 'https://placehold.co/800x500/06b6d4/ffffff?text=LAPTOP+A+DETAIL', 
        content: 'Laptop A được trang bị chip Intel Core i9 thế hệ mới nhất, đi kèm với card đồ họa NVIDIA GeForce RTX 4090. Thiết kế vỏ nhôm nguyên khối không chỉ mang lại vẻ ngoài sang trọng mà còn giúp tản nhiệt hiệu quả. Màn hình 16 inch QHD+ với tần số quét 240Hz đảm bảo trải nghiệm chơi game và làm việc đồ họa mượt mà. Đây là lựa chọn hoàn hảo cho những người dùng đòi hỏi hiệu năng tối đa mà vẫn giữ được tính di động. Giá bán khởi điểm: 55,000,000 VNĐ. Nội dung chi tiết tiếp tục mô tả sâu hơn về các tiêu chí chọn laptop cho sinh viên: pin, trọng lượng và độ bền.',
        date: '10/11/2025',
        views: 1250,
    },
    // ... Thêm các bài viết chi tiết khác ở đây ...
    { 
        id: 2, 
        title: 'Hàng MDM là gì? Có nên mua Macbook MDM hay không?', 
        summary: 'Tìm hiểu chi tiết về các thiết bị Macbook MDM (Mobile Device Management) và những rủi ro, lợi ích khi quyết định mua chúng.', 
        image: 'https://placehold.co/800x500/4ade80/ffffff?text=MACBOOK+MDM+DETAIL', 
        content: 'Macbook MDM là những thiết bị được quản lý tập trung bởi một tổ chức hoặc doanh nghiệp. Khi mua các sản phẩm này, người dùng cần lưu ý kiểm tra kỹ tình trạng khóa MDM và chính sách bảo hành. Nếu bạn là người dùng cá nhân, hãy cân nhắc kỹ để tránh các vấn đề phát sinh về sau. Chi tiết về cách kiểm tra và mở khóa MDM cũng được đề cập trong bài viết.',
        date: '05/11/2025',
        views: 890,
    },
    { 
        id: 3, 
        title: 'Top 7 Cửa Hàng Sửa Chữa Laptop Uy Tín Tại TPHCM', 
        summary: 'Danh sách 7 địa chỉ sửa chữa laptop được đánh giá cao về chuyên môn, thái độ phục vụ và linh kiện chính hãng tại TPHCM.', 
        image: 'https://placehold.co/800x500/f87171/ffffff?text=SUA+CHUA+UY+TIN+DETAIL', 
        content: 'Đứng đầu danh sách là cửa hàng A, nổi tiếng với dịch vụ lấy liền và bảo hành dài hạn. Cửa hàng B chuyên sâu về các dòng Macbook, còn cửa hàng C lại có mức giá cạnh tranh. Luôn chọn những nơi có giấy tờ rõ ràng và cam kết về chất lượng linh kiện thay thế. Bài viết cung cấp địa chỉ, số điện thoại và giờ làm việc chi tiết của từng cửa hàng.',
        date: '01/11/2025',
        views: 2100,
    },
    { 
        id: 4, 
        title: 'Hàng Refurbished là gì? Có nên mua hàng Apple Refurbished không?', 
        summary: 'Giải thích về hàng Refurbished và đưa ra lời khuyên liệu bạn có nên đầu tư vào các sản phẩm Apple Refurbished để tiết kiệm chi phí.', 
        image: 'https://placehold.co/800x500/fbbf24/ffffff?text=REFURBISHED+APPLE+DETAIL', 
        content: 'Hàng Refurbished là sản phẩm đã qua sử dụng, được nhà sản xuất hoặc bên thứ ba kiểm tra, sửa chữa và tân trang lại. Đối với Apple Refurbished, đây là lựa chọn tuyệt vời vì chất lượng được kiểm soát nghiêm ngặt. Tuy nhiên, hãy cẩn thận với hàng Refurbished không rõ nguồn gốc. Bài viết chỉ ra các dấu hiệu nhận biết hàng Refurbished chính hãng.',
        date: '28/10/2025',
        views: 1500,
    },
];

const NewsDetail: React.FC = () => {
  // Lấy tham số 'id' (luôn là string) từ URL
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  // State chứa dữ liệu chi tiết của bài viết
  const [newsItem, setNewsItem] = useState<ArticleDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    // Giả lập việc tìm kiếm/fetch dữ liệu tin tức theo ID
    // Phải chuyển đổi id từ string sang number để tìm kiếm
    const foundItem = ARTICLE_DETAILS.find(item => item.id === parseInt(id || '0'));
    
    setTimeout(() => {
      setNewsItem(foundItem || null);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500); // Giả lập thời gian load
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-cyan-600">Đang tải chi tiết tin tức...</div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Lỗi 404 - Không tìm thấy Tin tức</h1>
        <button 
          onClick={() => navigate('/news')} 
          className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition duration-300 flex items-center shadow-md"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại trang Tin tức
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-10">
        
        {/* Quay lại */}
        <button 
          onClick={() => navigate('/news')} 
          className="text-cyan-600 hover:text-cyan-800 transition duration-300 flex items-center mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Quay lại danh sách
        </button>

        {/* Tiêu đề */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          {newsItem.title}
        </h1>
        
        {/* Metadata */}
        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mb-6 border-b pb-4">
            <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> {newsItem.date}
            </span>
            <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" /> {newsItem.views.toLocaleString()} lượt xem
            </span>
        </div>

        {/* Ảnh đại diện */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-md">
          <img 
            className="w-full h-auto object-cover" 
            src={newsItem.image} 
            alt={newsItem.title} 
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                e.currentTarget.onerror = null; 
                e.currentTarget.src = "https://placehold.co/800x500/cccccc/333333?text=No+Image"; 
            }}
          />
        </div>

        {/* Nội dung bài viết */}
        <div className="text-gray-800 space-y-6 text-base">
          <p className="text-xl font-semibold italic text-cyan-700 border-l-4 border-cyan-500 pl-3">
            {newsItem.summary}
          </p>
          <p className="text-justify leading-relaxed">
            {newsItem.content}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-4">Tóm tắt và Khuyến nghị</h2>
          <p className="text-justify leading-relaxed">
            Tất cả các sản phẩm/dịch vụ được đề cập trong bài viết đều được đánh giá khách quan. Quý khách hàng nên cân nhắc nhu cầu cá nhân và ngân sách trước khi đưa ra quyết định mua hàng. Chúng tôi luôn cập nhật những thông tin công nghệ mới nhất để phục vụ bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;