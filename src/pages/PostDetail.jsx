import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (loading) return <div className="text-center py-10 text-gray-500 font-medium">Đang tìm kiếm bài viết...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-medium">Không thể tải bài viết hoặc bài viết không tồn tại.</div>;

  return (
    <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm max-w-3xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg shadow-sm transition-colors mb-6 cursor-pointer"
      >
        ← Quay lại
      </button>

      {post && (
        <article>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1A56A3]">Mã số bài viết: #{post.id}</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">
            <div className="w-6 h-6 rounded-full bg-[#1A56A3] text-white flex items-center justify-center text-xs font-bold">U</div>
            <span>Đăng bởi <strong>User {post.userId}</strong></span>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{post.body}</p>
        </article>
      )}
    </div>
  );
}

export default PostDetail;