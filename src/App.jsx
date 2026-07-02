// src/App.jsx
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';

// Component Layout dùng chung cho toàn bộ ứng dụng
function MainLayout() {
  const navStyle = ({ isActive }) => ({
    color: isActive ? '#007bff' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: 'none'
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
        <NavLink to="/" style={navStyle}>Trang chủ</NavLink>
        <NavLink to="/posts" style={navStyle}>Bài viết</NavLink>
      </nav>

      {/* Nơi hiển thị nội dung của các Route con (Home, Posts, PostDetail...) */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Route cha bọc lấy các Route con để chia sẻ chung thanh Navbar */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:id" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;