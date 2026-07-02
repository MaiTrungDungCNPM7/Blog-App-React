import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <h1 style={{ fontSize: '3rem', color: '#dc3545', margin: '0' }}>404</h1>
      <h2>Rất tiếc, không tìm thấy trang này!</h2>
      <p>Đường dẫn bạn đang truy cập có thể đã bị thay đổi hoặc không tồn tại.</p>
      <Link to="/" style={{ color: '#007bff' }}>Quay về trang chủ</Link>
    </div>
  );
}

export default NotFound;