import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, DivideIcon as LucideIcon } from 'lucide-react';

interface MobileOptimizedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'cta';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const MobileOptimizedButton: React.FC<MobileOptimizedButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  className = '',
  fullWidth = false,
  disabled = false,
  loading = false
}) => {
  const baseClasses = `
    relative flex items-center justify-center gap-2 sm:gap-3 
    font-bold border-none rounded-full cursor-pointer 
    transition-all duration-300 outline-none
    mobile-touch-target overflow-hidden
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#181818] 
      hover:from-[#ffd700] hover:to-[#d4af37] hover:shadow-[0_8px_32px_rgba(212,175,55,0.4)]
      active:scale-95
    `,
    secondary: `
      bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-[#181818] 
      hover:from-[#fffbe6] hover:to-[#ffd700] hover:shadow-[0_8px_32px_rgba(255,215,0,0.4)]
      active:scale-95
    `,
    outline: `
      bg-transparent text-[#d4af37] border-2 border-[#d4af37]/50 
      hover:bg-[#d4af37] hover:text-[#181818] hover:border-[#d4af37]
      active:scale-95
    `,
    cta: `
      bg-gradient-to-r from-[#e53935] via-[#d4af37] to-[#ffd700] text-white
      hover:from-[#ffd700] hover:via-[#d4af37] hover:to-[#e53935]
      hover:shadow-[0_12px_40px_rgba(229,57,53,0.4)]
      active:scale-95 animate-pulse
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-base min-h-[48px]',
    xl: 'px-10 py-5 text-xl min-h-[52px]'
  };

  return (
    <motion.button
      onClick={disabled || loading ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
    >
      {/* シマー効果 */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      )}
      
      {/* ローディングスピナー */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <div className={`relative z-10 flex items-center gap-2 sm:gap-3 ${loading ? 'opacity-0' : ''}`}>
        {Icon && <Icon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />}
        <span>{children}</span>
        <ArrowRight size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} className="group-hover:translate-x-1 transition-transform" />
      </div>
      
      {/* リップル効果 */}
      <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-active:scale-100 transition-transform duration-300" />
    </motion.button>
  );
};

export default MobileOptimizedButton;