import React from 'react';
import { Link } from 'react-router-dom';


// Định nghĩa Interface (Kiểu dữ liệu) cho một bài viết
interface Article {
  id: number;
  title: string;
  summary: string;
  image: string;
  category: string;
}

// Dữ liệu tin tức giả định
const NEWS_DATA: Article[] = [
  { id: 1, title: 'Top 5 Laptop Tốt Nhất Dành Cho Tân Sinh Viên', summary: 'Tổng hợp 5 mẫu laptop có hiệu năng tốt, thiết kế bền bỉ và giá cả phải chăng, rất phù hợp cho sinh viên bắt đầu năm học mới.', image: 'https://placehold.co/600x400/06b6d4/ffffff?text=LAPTOP+SINH+VIEN', category: 'Laptop' },
  { id: 2, title: 'Hàng MDM là gì? Có nên mua Macbook MDM hay không?', summary: 'Tìm hiểu chi tiết về các thiết bị Macbook MDM (Mobile Device Management) và những rủi ro, lợi ích khi quyết định mua chúng.', image: 'https://placehold.co/600x400/4ade80/ffffff?text=MACBOOK+MDM', category: 'Macbook' },
  { id: 3, title: 'Top 7 Cửa Hàng Sửa Chữa Laptop Uy Tín Tại TPHCM', summary: 'Danh sách 7 địa chỉ sửa chữa laptop được đánh giá cao về chuyên môn, thái độ phục vụ và linh kiện chính hãng tại TPHCM.', image: 'https://placehold.co/600x400/f87171/ffffff?text=SUA+CHUA+UY+TIN', category: 'Dịch vụ' },
  { id: 4, title: 'Hàng Refurbished là gì? Có nên mua hàng Apple Refurbished không?', summary: 'Giải thích về hàng Refurbished và đưa ra lời khuyên liệu bạn có nên đầu tư vào các sản phẩm Apple Refurbished để tiết kiệm chi phí.', image: 'https://placehold.co/600x400/fbbf24/ffffff?text=REFURBISHED+APPLE', category: 'Review' },
];

// Component Card Tin tức
const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
      <Link to={`/news/${article.id}`} className="block">
        <img 
          className="h-48 w-full object-cover" 
          src={article.image} 
          alt={article.title} 
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
            e.currentTarget.onerror = null; 
            e.currentTarget.src = "https://placehold.co/600x400/cccccc/333333?text=No+Image"; 
          }}
        />
        <div className="p-4">
          <span className="text-xs font-semibold uppercase text-cyan-600 mb-1 inline-block">{article.category}</span>
          <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-cyan-700 transition duration-300">
            {article.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">{article.summary}</p>
          <div className="flex justify-end mt-3">
             <span className="inline-flex items-center text-cyan-600 font-semibold text-sm">
                Đọc thêm ChevronRight className="w-4 h-4 ml-1" 
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};


const News: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-cyan-500 pb-2">
          Tin tức Công nghệ Mới
        </h1>
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS_DATA.map((news) => (
            <ArticleCard key={news.id} article={news} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
             <Link 
                to="/news" // Giả lập nút Xem tất cả
                className="bg-cyan-600 text-white px-8 py-3 rounded-full hover:bg-cyan-700 transition duration-300 shadow-lg text-lg font-semibold"
              >
                Xem tất cả Tin tức
              </Link>
        </div>
      </div>
    </div>
  );
};

export default News;