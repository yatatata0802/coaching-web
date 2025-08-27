import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // ページ遷移時に最上部にスクロール
    window.scrollTo({
      top: 0,
      behavior: 'auto' // 即座に移動
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;