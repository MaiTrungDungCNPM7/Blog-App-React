import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';

// Component Layout dùng chung cho toàn bộ ứng dụng
function MainLayout() {
  // Hàm xử lý active class cho NavLink
  const navLinkClass = ({ isActive }) => 
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-[#1A56A3] font-semibold' : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navbar: Sticky, backdrop blur, logo trái, links phải */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo bên trái */}
          <NavLink to="/" className="text-xl font-bold text-gray-800 tracking-tight">
            Dung Mai's <span className="text-[#1A56A3]">Blog</span>
          </NavLink>

          {/* Links bên phải */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>Trang chủ</NavLink>
            <NavLink to="/posts" className={navLinkClass}>Bài viết</NavLink>
          </div>
        </div>
      </nav>

      {/* Nơi hiển thị nội dung của các Route con (Home, Posts, PostDetail...) */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet /> {/* Đây là một route lồng vào đặc biệt có tác dụng giữ cho thanh navbar luôn ở trên đầu trang */}
        {/* Nó là một cái khung ép cho các route con như post hay content chỉ hiển thị trong này mà không động vào navbar */}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Route cha bọc lấy các Route con để chia sẻ chung thanh Navbar */}
      <Route path="/" element={<MainLayout />}> {/* Main layout luôn mặc định ở màn hình */}
        <Route index element={<Home />} /> {/* Trang chủ */}
        <Route path="posts" element={<Posts />} /> {/* Danh sách bài viết */}
        <Route path="posts/:id" element={<PostDetail />} /> {/* Lọc bài viết theo user id */}
        <Route path="*" element={<NotFound />} /> {/* Nếu phát hiện đường link không giống bất kỳ mẫu nào ở trên sẽ sang trang 404 */}
      </Route>
    </Routes>
  );
}

export default App;