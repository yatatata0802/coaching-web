import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { incrementPageView } from "../lib/supabase";

export const usePageView = () => {
  const location = useLocation();
  const hasCounted = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const currentPath = location.pathname;
    
    console.log("🔄 usePageView useEffect 実行:", {
      currentPath,
      hasCountedForPath: hasCounted.current[currentPath],
      allCountedPaths: Object.keys(hasCounted.current),
      timestamp: new Date().toISOString(),
    });

    // このパスでまだカウントしていない場合のみカウント
    if (!hasCounted.current[currentPath]) {
      const countPageView = async () => {
        try {
          console.log("📊 ページビューカウント開始:", currentPath);
          await incrementPageView(currentPath);
          console.log("✅ ページビューカウント完了:", currentPath);
          hasCounted.current[currentPath] = true;
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
        reason: "このパスで初回カウント",
      });
      countPageView();
    } else {
      console.log("⏭️ ページビューカウントスキップ:", {
        path: currentPath,
        reason: "このパスで既にカウント済み",
      });
    }
  }, [location.pathname]);

  return null;
};
