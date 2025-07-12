import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/main");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* アンビエントライト効果 */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* メインコンテンツ */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-center">
        <div className="max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
          >
            このまま終わっていいの？
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl sm:text-2xl mb-8 font-light"
          >
            毎朝、同じ顔。
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl sm:text-2xl mb-8 font-light"
          >
            毎日、同じルート。
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-xl sm:text-2xl mb-8 font-light"
          >
            心が、どこか置き去りのまま。
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-lg sm:text-xl mb-12 text-gray-300"
          >
            「こんなはずじゃない」って、気づいてるはずだ。
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(212, 175, 55, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-[#181818] font-bold py-4 px-8 sm:py-5 sm:px-12 rounded-full text-xl sm:text-2xl hover:shadow-2xl transition-all duration-300"
          >
            最初の一歩を踏み出す
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
