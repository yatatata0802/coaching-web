import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, Users } from 'lucide-react';

interface OptimizedCTAProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'urgent' | 'social-proof';
  size?: 'md' | 'lg' | 'xl';
  urgency?: string;
  socialProof?: string;
  className?: string;
  fullWidth?: boolean;
}

const OptimizedCTA: React.FC<OptimizedCTAProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'lg',
  urgency,
  socialProof,
  className = '',
  fullWidth = false
}) => {
  const baseClasses = `
    relative group flex items-center justify-center gap-3 
    font-bold border-none rounded-full cursor-pointer 
    transition-all duration-300 outline-none overflow-hidden
    mobile-touch-target
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-[#181818]
      hover:from-[#ffd700] hover:via-[#fffbe6] hover:to-[#ffd700]
      hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)]
      transform hover:scale-105 hover:-translate-y-1
    `,
    urgent: `
      bg-gradient-to-r from-[#e53935] via-[#d4af37] to-[#ffd700] text-white
      hover:from-[#ffd700] hover:via-[#d4af37] hover:to-[#e53935]
      hover:shadow-[0_15px_50px_rgba(229,57,53,0.6)]
      transform hover:scale-105 hover:-translate-y-1
      animate-pulse
    `,
    'social-proof': `
      bg-gradient-to-r from-[#4caf50] via-[#d4af37] to-[#ffd700] text-white
      hover:from-[#ffd700] hover:via-[#d4af37] hover:to-[#4caf50]
      hover:shadow-[0_12px_40px_rgba(76,175,80,0.5)]
      transform hover:scale-105 hover:-translate-y-1
    `
  };

  const sizeClasses = {
    md: 'px-8 py-4 text-base min-h-[48px]',
    lg: 'px-10 py-5 text-lg min-h-[52px]',
    xl: 'px-12 py-6 text-xl min-h-[56px]'
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 緊急性表示 */}
      {urgency && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 px-4 py-2 bg-[#e53935]/20 border border-[#e53935]/50 rounded-full text-[#e53935] text-sm font-bold"
        >
          <Clock size={16} className="animate-pulse" />
          {urgency}
        </motion.div>
      )}

      {/* メインCTAボタン */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      >
        {/* 背景アニメーション */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        {/* ボタンコンテンツ */}
        <div className="relative z-10 flex items-center gap-3">
          {variant === 'urgent' && <Zap size={20} className="animate-bounce" />}
          {variant === 'social-proof' && <Users size={20} />}
          <span>{children}</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </div>

        {/* リップル効果 */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300" />
      </motion.button>

      {/* 社会的証明 */}
      {socialProof && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-gray-400 text-sm"
        >
          <div className="flex text-[#ffd700] text-xs">★★★★★</div>
          <span>{socialProof}</span>
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedCTA;