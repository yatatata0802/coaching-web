import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'highlighted' | 'glass';
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'rounded-2xl p-8 md:p-6 transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white/[0.04] border border-white/10 hover:bg-white/[0.06]',
    highlighted: 'bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/20 border border-[#d4af37]/40',
    glass: 'bg-white/5 backdrop-blur-sm border border-[#d4af37]/20 hover:border-[#d4af37]/40'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;