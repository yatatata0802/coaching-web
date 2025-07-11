import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { incrementPageView } from "../lib/supabase";

export const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    // ページビューをカウント
    const countPageView = async () => {
      try {
        await incrementPageView(location.pathname);
      } catch (error) {
        console.error("PVカウントエラー:", error);
      }
    };

    // ページロード時にカウント
    countPageView();
  }, [location.pathname]);

  return null;
};
