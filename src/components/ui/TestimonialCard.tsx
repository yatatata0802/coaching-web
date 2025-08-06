import React from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '../../types';
import { ArrowRight } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-[#d4af37]/20 transition-shadow duration-300 flex flex-col"
    >
      <div className="flex items-center mb-4">
        {/* <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#d4af37]" /> */}
        <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center border-2 border-[#d4af37]">
          <span className="text-2xl font-bold text-white">{testimonial.name.charAt(0)}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </div>

      <div className="my-6 space-y-4">
        <div className="relative p-4 rounded-lg bg-black/30">
          <p className="text-sm font-semibold text-gray-400 mb-1">Before</p>
          <p className="text-base text-white">{testimonial.before}</p>
        </div>

        <div className="flex justify-center items-center my-2">
            <ArrowRight className="text-[#d4af37] animate-pulse" size={24} />
        </div>

        <div className="relative p-4 rounded-lg bg-[#d4af37]/10">
          <p className="text-sm font-semibold text-[#d4af37] mb-1">After</p>
          <p className="text-base font-semibold text-white">{testimonial.after}</p>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <p className="text-base text-gray-300 leading-relaxed italic">"{testimonial.quote}"</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
