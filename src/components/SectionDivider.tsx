import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'wave' | 'diagonal' | 'curve';
  color?: string;
  flip?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  variant = 'wave', 
  color = '#d4af37',
  flip = false 
}) => {
  const getPath = () => {
    switch (variant) {
      case 'diagonal':
        return flip 
          ? "M0,0 L100,100 L0,100 Z"
          : "M0,100 L100,0 L100,100 Z";
      case 'curve':
        return flip
          ? "M0,100 Q50,0 100,100 L100,100 L0,100 Z"
          : "M0,0 Q50,100 100,0 L100,100 L0,100 Z";
      default: // wave
        return flip
          ? "M0,100 Q25,50 50,100 T100,100 L100,100 L0,100 Z"
          : "M0,0 Q25,50 50,0 T100,0 L100,100 L0,100 Z";
    }
  };

  return (
    <div className="relative w-full h-24 overflow-hidden">
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id={`gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d={getPath()}
          fill={`url(#gradient-${variant})`}
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity="0.6"
        />
      </motion.svg>
    </div>
  );
};

export default SectionDivider;