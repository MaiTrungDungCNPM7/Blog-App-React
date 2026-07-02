import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch'; // Thay thế bằng đường dẫn thực tế tới hook của bạn

function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lấy ra giá trị userId từ URL (nếu không có thì mặc định là chuỗi rỗng)
  const userIdFilter = searchParams.get('userId') || '';

  // Xây dựng API URL động dựa trên filter hiện tại
  const apiUrl = userIdFilter 
    ? `https://jsonplaceholder.typicode.com/posts?userId=${userIdFilter}`
    : 'https://jsonplaceholder.typicode.com/posts';

  const { data: posts, loading, error } = useFetch(apiUrl);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ userId: value }); // Cập nhật URL thành: /posts?userId=X
    } else {
      setSearchParams({}); // Xóa bỏ param nếu chọn "Tất cả tác giả"
    }
  };

  if (loading) return <p>Đang tải danh sách bài viết...</p>;
  if (error) return <p style={{ color: 'red' }}>Đã xảy ra lỗi: {error.message}</p>;

  return (
    <div>
      <h2>Danh sách bài viết</h2>

      {/* Bộ lọc bài viết theo Tác giả */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="user-select" style={{ marginRight: '10px' }}>Lọc theo tác giả:</label>
        <select id="user-select" value={userIdFilter} onChange={handleFilterChange}>
          <option value="">-- Tất cả tác giả --</option>
          <option value="1">Tác giả 1</option>
          <option value="2">Tác giả 2</option>
          <option value="3">Tác giả 3</option>
        </select>
      </div>

      {/* Hiển thị danh sách kết quả */}
      <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
        {posts?.map(post => (
          <li key={post.id}>
            {/* Mỗi bài viết là một Link dẫn thẳng tới Route chi tiết */}
            <Link to={`/posts/${post.id}`} style={{ color: '#0056b3', textDecoration: 'none' }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;