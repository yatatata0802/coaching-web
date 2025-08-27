import React from 'react';
import { motion } from 'framer-motion';

interface ThumbZoneProps {
  children: React.ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  className?: string;
}

const ThumbZone: React.FC<ThumbZoneProps> = ({ 
  children, 
  position = 'bottom-right',
  className = '' 
}) => {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-4 sm:bottom-8 sm:right-6',
    'bottom-left': 'fixed bottom-6 left-4 sm:bottom-8 sm:left-6',
    'bottom-center': 'fixed bottom-6 left-1/2 transform -translate-x-1/2 sm:bottom-8'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${positionClasses[position]} z-50 ${className}`}
      style={{
        // スマホの親指操作エリア最適化
        bottom: 'max(24px, env(safe-area-inset-bottom))',
        right: position.includes('right') ? 'max(16px, env(safe-area-inset-right))' : undefined,
        left: position.includes('left') ? 'max(16px, env(safe-area-inset-left))' : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ThumbZone;