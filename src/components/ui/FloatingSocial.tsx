import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X } from 'lucide-react';
import SocialLinks from './SocialLinks';
import ThumbZone from './ThumbZone';

const FloatingSocial: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ThumbZone position="bottom-left">
      <div className="relative">
        {/* メインボタン */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-gradient-to-r from-[#d4af37] to-[#ffd700] rounded-full shadow-2xl flex items-center justify-center text-[#181818] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 mobile-touch-target"
          aria-label="SNSリンクを開く"
        >
          {isExpanded ? <X size={20} /> : <Share2 size={20} />}
        </motion.button>

        {/* 展開メニュー */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              className="absolute bottom-16 left-0 bg-black/95 backdrop-blur-sm border border-[#d4af37]/50 rounded-2xl p-4 shadow-2xl"
              style={{
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
              }}
            >
              <div className="text-[#d4af37] font-bold text-sm mb-3 text-center">
                Follow Me
              </div>
              <SocialLinks variant="vertical" size="md" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThumbZone>
  );
};

export default FloatingSocial;