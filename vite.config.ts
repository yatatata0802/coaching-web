import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Netlifyでは常にルートパス

  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // 警告の閾値を1MBに設定
    rollupOptions: {
      output: {
        manualChunks: {
          // コアライブラリ
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          // アニメーション関連
          motion: ["framer-motion", "gsap"],
          // UI関連
          icons: ["lucide-react"],
          // 3D関連（大きなバンドル）
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          // チャート関連
          charts: ["@nivo/core", "@nivo/sankey"],
          // その他のユーティリティ
          utils: ["date-fns", "react-ga4"],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
      "gsap",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
  // 開発サーバーの最適化
  server: {
    port: 3000,
    open: true,
  },
});