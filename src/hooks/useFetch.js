import { useState, useEffect } from 'react';

function useFetch(url) {
  // Gộp 3 state riêng lẻ thành 1 Object duy nhất
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Khi URL thay đổi, gọi đúng 1 lệnh setState để reset. Dòng comment ở dưới để ESLint không báo đỏ.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(prevState => ({
      ...prevState,
      loading: true,
      error: null
    })); //Gom hết một cục setState, sau đó mới batching để xử lý một lần render duy nhất

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
        const result = await response.json();
        
        // Cập nhật khi thành công
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        // Cập nhật khi lỗi
        setState({ data: null, loading: false, error: err });
      }
    };

    fetchData();
  }, [url]);

  // Trả về các thuộc tính giống hệt như cũ (hàm dọn rác)
  return { data: state.data, loading: state.loading, error: state.error };
}

export default useFetch;