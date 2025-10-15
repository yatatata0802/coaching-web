import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ページビューを記録するためのフックでしたが、Supabaseの利用停止に伴い、現在このフックは何も行いません。
 * アプリケーション内の他の箇所でこのフックが呼び出されているため、エラーを防ぐ目的でファイルは残しています。
 */
export const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    // 現在は何もしない
  }, [location.pathname]);

  return null;
};