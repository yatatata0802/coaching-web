import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { incrementPageView } from "../lib/supabase";

export const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    console.log("🔄 usePageView useEffect 実行:", {
      currentPath,
      timestamp: new Date().toISOString(),
    });

    const countPageView = async () => {
      try {
        console.log("📊 ページビューカウント開始:", currentPath);
        await incrementPageView(currentPath);
        console.log("✅ ページビューカウント完了:", currentPath);
      } catch (error) {
        console.error("❌ PVカウントエラー:", error);
        console.error("❌ エラー詳細:", {
          pathname: currentPath,
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : String(error),
        });
      }
    };

    console.log("🎯 ページビューカウント実行:", {
      path: currentPath,
    });
    countPageView();
  }, [location.pathname]);

  return null;
};
