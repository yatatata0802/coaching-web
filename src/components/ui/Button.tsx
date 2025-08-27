import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ComponentType<{ size?: number }>;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  className = '' 
}) => {
  const baseClasses = 'flex items-center gap-3 font-bold border-none rounded-full cursor-pointer transition-all duration-300 outline-none';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#181818] hover:from-[#fffbe6] hover:to-[#ffd700] hover:text-[#d4af37]',
    secondary: 'bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-[#181818] hover:from-[#fffbe6] hover:to-[#ffd700] hover:text-[#d4af37]',
    outline: 'bg-[#232323] text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-[#181818]'
  };

  const sizeClasses = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  const hoverClasses = 'hover:transform hover:scale-[1.07] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_#ffd700,0_0_32px_#fffbe6]';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses} ${className}`}
    >
      {Icon && <Icon size={20} />}
      {children}
      <ArrowRight size={20} />
    </button>
  );
};

export default Button;