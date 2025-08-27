import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { incrementPageView } from "../lib/supabase";

export const usePageView = () => {
  const location = useLocation();
  const hasCounted = useRef(false);

  useEffect(() => {
    // 初回レンダリング時とパス変更時にカウント
    const countPageView = async () => {
      try {
        console.log("📊 ページビューカウント:", location.pathname);
        await incrementPageView(location.pathname);
        console.log("✅ ページビューカウント完了:", location.pathname);
        hasCounted.current = true;
      } catch (error) {
        console.error("❌ PVカウントエラー:", error);
      }
    };

    // ページロード時にカウント
    countPageView();
  }, [location.pathname]);

  // 初回レンダリング時にも確実にカウント
  useEffect(() => {
    if (!hasCounted.current) {
      const countPageView = async () => {
        try {
          console.log("📊 初回ページビューカウント:", location.pathname);
          await incrementPageView(location.pathname);
          console.log("✅ 初回ページビューカウント完了:", location.pathname);
          hasCounted.current = true;
        } catch (error) {
          console.error("❌ 初回PVカウントエラー:", error);
        }
      };
      countPageView();
    }
  }, []);

  return null;
};
