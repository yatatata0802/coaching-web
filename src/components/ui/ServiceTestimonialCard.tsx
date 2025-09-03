import React from "react";
import { motion } from "framer-motion";
import { ServicePageTestimonial } from "../../types";
import { Clock, ArrowDown } from "lucide-react";

interface ServiceTestimonialCardProps {
  testimonial: ServicePageTestimonial;
  index: number;
}

const ServiceTestimonialCard: React.FC<ServiceTestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  return (
    <motion.div
      key={testimonial.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className="relative rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#181818]/80 to-[#0a0a0a]/90 shadow-xl p-6 hover:shadow-2xl hover:shadow-[#d4af37]/10 transition-all duration-300"
    >
      {/* カテゴリバッジ */}
      <div className="absolute -top-3 left-6">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#d4af37]/20 text-[#d4af37]">
          {testimonial.category}
        </span>
      </div>

      {/* お客様情報 */}
      <div className="text-center mb-6 pt-4">
        <h3 className="text-lg font-bold text-[#d4af37] mb-2">
          {testimonial.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {testimonial.age}・{testimonial.job}
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-[#d4af37]">
          <Clock size={12} />
          <span>{testimonial.duration}</span>
        </div>
      </div>

      {/* Before */}
      <div className="rounded-xl bg-gradient-to-br from-[#e53935]/20 to-[#181818]/60 border border-[#e53935]/40 p-4 mb-4">
        <div className="text-sm font-bold text-[#e53935] mb-2">Before</div>
        <p className="text-gray-300 text-xs leading-relaxed">
          {testimonial.before}
        </p>
      </div>

      {/* 変化の矢印 */}
      <div className="flex justify-center my-3">
        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <ArrowDown className="text-[#d4af37]" size={32} />
        </motion.div>
      </div>

      {/* After */}
      <div className="rounded-xl bg-gradient-to-br from-[#1e3a1e]/20 to-[#181818]/60 border border-green-700/40 p-4 mb-4">
        <div className="text-sm font-bold text-green-400 mb-2">After</div>
        <p className="text-gray-300 text-xs leading-relaxed">
          {testimonial.after}
        </p>
      </div>

      {/* 改善数値 */}
      <div className="rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#181818]/60 border border-[#d4af37]/40 p-3 mb-4">
        <div className="text-sm font-bold text-[#d4af37] mb-1">改善結果</div>
        <p className="text-gray-300 text-xs">{testimonial.improvement}</p>
      </div>

      {/* お客様の声 */}
      <div className="rounded-xl bg-gradient-to-br from-[#181818]/80 to-[#333]/80 border border-gray-500/30 p-4">
        <div className="text-sm font-bold text-gray-200 mb-2">お客様の声</div>
        <p className="text-gray-300 text-xs leading-relaxed italic">
          "{testimonial.testimonial}"
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceTestimonialCard;
