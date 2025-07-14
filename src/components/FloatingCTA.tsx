import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileText, X, Zap, Clock, Users } from "lucide-react";
import ThumbZone from "./ui/ThumbZone";

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleContact = () => {
    navigate("/contact?plan=無料相談");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ThumbZone position="bottom-right">
          <div className="relative">
            {/* パルスリング - 視線誘導強化 */}
            <div className="absolute inset-0 rounded-full bg-[#d4af37] opacity-20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-[#d4af37] opacity-30 animate-ping animation-delay-75"></div>
            <div className="absolute inset-0 rounded-full bg-[#e53935] opacity-15 animate-ping animation-delay-150"></div>

            {/* メインボタン - スマホ最適化 */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#e53935] rounded-full shadow-2xl flex items-center justify-center text-[#181818] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 mobile-touch-target"
              aria-label="無料相談を申し込む"
              style={{
                background: "linear-gradient(45deg, #d4af37, #ffd700, #e53935)",
                animation: "pulse 2s infinite",
              }}
            >
              <FileText size={22} className="animate-bounce" />
            </motion.button>

            {/* 展開メニュー - スマホ最適化 & 視線誘導 */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  className="absolute bottom-20 right-0 bg-black/95 backdrop-blur-sm border-2 border-[#d4af37]/50 rounded-2xl p-4 w-80 sm:w-96 shadow-2xl"
                  style={{
                    boxShadow:
                      "0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.1)",
                  }}
                >
                  {/* ヘッダー */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <h3 className="text-[#d4af37] font-bold text-base sm:text-lg">
                        無料相談受付中
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-gray-400 hover:text-white transition-colors mobile-touch-target p-1"
                      aria-label="メニューを閉じる"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* 緊急性を演出 */}
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-[#e53935]/20 border border-[#e53935]/50 rounded-lg p-2 mb-3 text-center flex items-center justify-center"
                  >
                    <Clock size={14} className="mr-2 text-[#e53935]" />
                    <span className="text-[#e53935] text-xs font-bold">
                      今月限定3名様
                    </span>
                  </motion.div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    あなたの"変わりたい"を
                    <br />
                    今すぐ相談してみませんか？
                  </p>

                  {/* 社会的証明 */}
                  <div className="bg-[#d4af37]/10 rounded-lg p-3 mb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-[#ffd700] text-xs">★★★★★</div>
                      <span className="text-gray-300 text-xs ml-2 flex items-center">
                        <Users size={12} className="mr-1" />
                        初回セッション無料
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">
                      "人生が変わりました！" - 30代男性
                    </p>
                  </div>

                  <motion.button
                    onClick={handleContact}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#e53935] via-[#d4af37] to-[#ffd700] text-white font-bold py-4 rounded-lg transition-all duration-300 mobile-touch-target text-sm sm:text-base relative overflow-hidden"
                  >
                    {/* シマー効果 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center justify-center">
                      <Zap size={16} className="mr-2" />
                      無料で人生を変える第一歩を踏み出す
                    </span>
                  </motion.button>

                  {/* 安心要素 */}
                  <div className="text-center mt-3">
                    <p className="text-gray-500 text-xs">
                      🔒 完全無料・秘密厳守・24時間以内返信
                    </p>
                  </div>

                  <div className="text-xs text-gray-400 mt-2">
                    初回セッション完全無料
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ThumbZone>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
