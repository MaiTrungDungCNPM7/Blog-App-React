import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function PostDetail() {
  const { id } = useParams(); // Lấy 'id' từ cấu hình tuyến đường /posts/:id
  const navigate = useNavigate();

  const { data: post, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (loading) return <p>Đang tìm kiếm bài viết...</p>;
  if (error) return <p style={{ color: 'red' }}>Không thể tải bài viết hoặc bài viết không tồn tại.</p>;

  return (
    <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '6px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ padding: '8px 12px', cursor: 'pointer', marginBottom: '15px', background: '#f5f5f5', border: '1px solid #ccc', borderRadius: '4px' }}
      >
        ← Quay lại
      </button>

      {post && (
        <article>
          <h1 style={{ color: '#222', marginTop: 0 }}>{post.title}</h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Mã số bài viết: #{post.id} | Người đăng: User {post.userId}</p>
          <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
          <p style={{ lineHeight: '1.6', color: '#444' }}>{post.body}</p>
        </article>
      )}
    </div>
  );
}

export default PostDetail;