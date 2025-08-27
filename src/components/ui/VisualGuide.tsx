import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

interface VisualGuideProps {
  type:
    | "arrow-down"
    | "arrow-right"
    | "pulse-dot"
    | "glow-border"
    | "attention-grabber";
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}

const VisualGuide: React.FC<VisualGuideProps> = ({
  type,
  className = "",
  delay = 0,
  children,
}) => {
  const renderGuide = () => {
    switch (type) {
      case "arrow-down":
        return (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay,
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={`flex flex-col items-center text-[#d4af37] ${className}`}
          >
            <ArrowDown size={24} className="animate-bounce" />
            {children && <span className="text-xs mt-1">{children}</span>}
          </motion.div>
        );

      case "arrow-right":
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay,
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={`flex items-center text-[#d4af37] ${className}`}
          >
            <ArrowRight size={20} className="animate-pulse mr-2" />
            {children}
          </motion.div>
        );

      case "pulse-dot":
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay, duration: 1.5, repeat: Infinity }}
            className={`w-3 h-3 bg-[#d4af37] rounded-full relative ${className}`}
          >
            <div className="absolute inset-0 bg-[#d4af37] rounded-full animate-ping opacity-75" />
            <div className="absolute inset-0 bg-[#d4af37] rounded-full animate-pulse" />
          </motion.div>
        );

      case "glow-border":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
            className={`relative ${className}`}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] rounded-lg blur opacity-30 animate-pulse" />
            <div className="relative">{children}</div>
          </motion.div>
        );

      case "attention-grabber":
        return (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ delay, duration: 2, repeat: Infinity }}
            className={`relative ${className}`}
          >
            {children}
          </motion.div>
        );

      default:
        return children;
    }
  };

  return renderGuide();
};

export default VisualGuide;
