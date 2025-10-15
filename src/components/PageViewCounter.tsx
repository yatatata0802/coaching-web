import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const PageViewCounter: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 text-gray-400 text-sm"
    >
      <Eye size={14} />
      <span>累積閲覧数: ---</span>
    </motion.div>
  );
};

export default PageViewCounter;