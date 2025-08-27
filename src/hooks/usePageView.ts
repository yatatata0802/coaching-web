import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { incrementPageView } from "../lib/supabase";

export const usePageView = () => {
  const location = useLocation();
  const hasCounted = useRef(false);
  const lastPath = useRef<string>("");

  useEffect(() => {
    console.log("🔄 usePageView useEffect 実行:", {
      currentPath: location.pathname,
      lastPath: lastPath.current,
      hasCounted: hasCounted.current,
      timestamp: new Date().toISOString(),
    });

    // 初回レンダリング時とパス変更時にカウント
    const countPageView = async () => {
      try {
        console.log("📊 ページビューカウント開始:", location.pathname);
        await incrementPageView(location.pathname);
        console.log("✅ ページビューカウント完了:", location.pathname);
        hasCounted.current = true;
        lastPath.current = location.pathname;
      } catch (error) {
        console.error("❌ PVカウントエラー:", error);
        console.error("❌ エラー詳細:", {
          pathname: location.pathname,
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : String(error),
        });
      }
    };

    // パスが変更された場合、または初回の場合にカウント
    if (location.pathname !== lastPath.current || !hasCounted.current) {
      console.log("🎯 ページビューカウント実行条件満たす:", {
        pathChanged: location.pathname !== lastPath.current,
        notCounted: !hasCounted.current,
      });
      countPageView();
    } else {
      console.log("⏭️ ページビューカウントスキップ:", {
        reason: "同じパスで既にカウント済み",
        pathname: location.pathname,
      });
    }
  }, [location.pathname]);

  // 初回レンダリング時にも確実にカウント
  useEffect(() => {
    console.log("🚀 初回レンダリング useEffect 実行:", {
      pathname: location.pathname,
      hasCounted: hasCounted.current,
      timestamp: new Date().toISOString(),
    });

    if (!hasCounted.current) {
      const countPageView = async () => {
        try {
          console.log("📊 初回ページビューカウント:", location.pathname);
          await incrementPageView(location.pathname);
          console.log("✅ 初回ページビューカウント完了:", location.pathname);
          hasCounted.current = true;
          lastPath.current = location.pathname;
        } catch (error) {
          console.error("❌ 初回PVカウントエラー:", error);
          console.error("❌ 初回エラー詳細:", {
            pathname: location.pathname,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : String(error),
          });
        }
      };
      countPageView();
    } else {
      console.log("⏭️ 初回カウントスキップ:", {
        reason: "既にカウント済み",
        pathname: location.pathname,
      });
    }
  }, []);

  return null;
};
