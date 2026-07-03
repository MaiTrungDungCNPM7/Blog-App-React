import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const userIdFilter = searchParams.get('userId') || '';

  const apiUrl = userIdFilter 
    ? `https://jsonplaceholder.typicode.com/posts?userId=${userIdFilter}`
    : 'https://jsonplaceholder.typicode.com/posts';

  const { data: posts, loading, error } = useFetch(apiUrl);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ userId: value });
    } else {
      setSearchParams({});
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500 font-medium">Đang tải danh sách bài viết...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-medium">Đã xảy ra lỗi: {error.message}</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách bài viết</h2>

        {/* Bộ lọc bài viết tinh chỉnh bằng Tailwind */}
        <div className="flex items-center gap-2">
          <label htmlFor="user-select" className="text-sm font-medium text-gray-600 whitespace-nowrap">Lọc theo tác giả:</label>
          <select 
            id="user-select" 
            value={userIdFilter} 
            onChange={handleFilterChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm focus:border-[#1A56A3] focus:outline-none"
          >
            <option value="">-- Tất cả tác giả --</option>
            <option value="1">Tác giả 1</option>
            <option value="2">Tác giả 2</option>
            <option value="3">Tác giả 3</option>
          </select>
        </div>
      </div>

      {/* Responsive Grid: 1 cột mobile → 2 cột md → 3 cột lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map(post => (
          /* PostCard component */
          <article 
            key={post.id} 
            className="flex flex-col justify-between bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <div>
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-[#1A56A3] ring-1 ring-inset ring-blue-700/10 mb-3">
                User {post.userId}
              </span>
              {/* Truncate title 2 dòng nhờ line-clamp-2 */}
              <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                {post.body}
              </p>
            </div>
            
            <Link 
              to={`/posts/${post.id}`} 
              className="inline-flex items-center font-semibold text-sm text-[#1A56A3] hover:text-blue-800 mt-auto transition-colors"
            >
              Đọc tiếp <span className="ml-1">→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Posts;