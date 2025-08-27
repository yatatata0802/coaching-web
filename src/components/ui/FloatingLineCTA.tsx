import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ThumbZone from "./ThumbZone";

const FloatingLineCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000); // ページロードから5秒後に表示
    return () => clearTimeout(timer);
  }, []);

  const handleLineClick = () => {
    window.open("https://line.me/ti/p/@yatagai_coaching", "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ThumbZone position="bottom-left"> {/* 左下に配置 */}
          <motion.button
            onClick={handleLineClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#00B900] to-[#00E676] rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-[0_0_30px_rgba(0,185,0,0.6)] transition-all duration-300 mobile-touch-target"
            aria-label="LINE公式アカウントに登録"
            style={{
              animation: "pulse-line 2s infinite", // LINE専用のパルスアニメーション
            }}
          >
            <MessageCircle size={28} className="animate-bounce" />
            {/* テキストはホバー時などに表示する、または別途考慮 */}
          </motion.button>
        </ThumbZone>
      )}
    </AnimatePresence>
  );
};

export default FloatingLineCTA;
