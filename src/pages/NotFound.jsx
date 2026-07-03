import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xl mx-auto my-10 px-6">
      <h1 className="text-7xl font-extrabold text-red-500 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Rất tiếc, không tìm thấy trang này!</h2>
      <p className="text-gray-500 mb-6">Đường dẫn bạn đang truy cập có thể đã bị thay đổi hoặc không tồn tại.</p>
      <Link 
        to="/" 
        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#1A56A3] hover:bg-blue-800 rounded-lg shadow transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}

export default NotFound;