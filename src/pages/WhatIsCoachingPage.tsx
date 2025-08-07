import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Zap, Users } from "lucide-react";
import VisualGuide from "../components/ui/VisualGuide";
import ParticleBackground from "../components/ParticleBackground";
import SEO from "../components/SEO";
import { SERVICES_PAGE_DATA } from "../constants/content";

const WhatIsCoachingPage: React.FC = () => {
  return (
    <div className="min-h-screen header-safe-padding relative overflow-hidden">
      <SEO
        title="コーチングとは？ | 矢田谷充則のパーソナルコーチング"
        description="矢田谷充則がコーチングの真髄を解説。コンサルティングとの違い、コーチングで得られる変化、そして「変わりたい」あなたへのメッセージを深く掘り下げます."
        keywords="コーチングとは, コーチング, パーソナルコーチング, 矢田谷充則, コンサルティング, 自己理解, 目標達成, 行動変容, 変わりたい"
      />
      {/* Enhanced Background Effects */}
      <ParticleBackground />

      {/* Additional Background Elements (Removed as redundant with ParticleBackground) */}

      <div className="max-w-5xl mx-auto px-8 relative z-20 md:px-4">
        {/* Enhanced Hero Section */}
        <motion.section
          className="text-center py-12 sm:py-16 md:py-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VisualGuide type="pulse-dot" className="mx-auto mb-6" />
          <motion.h1
            className="text-6xl font-bold text-[#d4af37] mb-4 font-serif md:text-4xl"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            What's Coaching?
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-300 mb-12 font-serif md:text-xl md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            魅セルジブン×踊ルココロ 〜人生をデザインする〜
          </motion.p>
        </motion.section>

        {/* Enhanced Content Sections */}
        <div className="space-y-16 md:space-y-8">
          {SERVICES_PAGE_DATA.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                className={`p-8 md:p-6 backdrop-blur-sm rounded-2xl relative shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 ${
                  index === SERVICES_PAGE_DATA.length - 1
                    ? "bg-gradient-to-br from-[#e53935]/10 via-[#d4af37]/5 to-[#e53935]/10 border-2 border-[#e53935]/30 hover:border-[#e53935]/50 hover:scale-1.02"
                    : "bg-white/5 border border-[#d4af37]/20 hover:border-[#d4af37]/40 hover:y-[-5px]"
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={
                  index === SERVICES_PAGE_DATA.length - 1
                    ? { scale: 1.02 }
                    : { y: -5, scale: 1.02 }
                }
              >
                <VisualGuide type="glow-border" delay={index * 0.3}>
                  <div className="flex items-center mb-6">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                      className="mr-4"
                    >
                      <Icon size={32} className="text-[#d4af37]" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-[#d4af37] font-serif md:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                </VisualGuide>

                <motion.div
                  className="text-sm text-gray-200 leading-normal space-y-4 md:text-base text-center max-w-xs mx-auto jp-text-optimal"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                >
                  <motion.p
                    className={`text-gray-200`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.2 + 0.1,
                      duration: 0.5,
                    }}
                  >
                    {section.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ナビゲーションボタン削除済み。LINE・noteボタンのみ残す */}
        {/* 必要に応じてLINE特典案内を追加する場合は、以下のように挿入できます */}
        {/* <div className="text-center text-[#d4af37] font-bold text-lg mb-4">
          LINEにご登録いただいた方限定で、公安式・『人生脚本』タイプ別診断をプレゼント中！
        </div> */}
        <div className="flex flex-col items-center gap-4 justify-center my-8">
          <button
            onClick={() => window.open("https://lin.ee/MX41vXf", "_blank")}
            className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#06C755] text-white font-bold text-xl sm:text-2xl shadow-2xl hover:bg-[#32e67f] transition-all duration-300 transform hover:scale-105 mx-auto"
            style={{ minWidth: 220 }}
          >
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="#fff" />
              <path
                d="M20 8C12.268 8 6 13.477 6 20.222c0 3.77 2.49 7.09 6.32 9.13l-1.01 3.7a1 1 0 0 0 1.45 1.13l4.09-2.23c1.01.14 2.06.22 3.15.22 7.732 0 14-5.477 14-12.222C34 13.477 27.732 8 20 8Z"
                fill="#06C755"
              />
              <path
                d="M27.5 19.5h-2m-3 0h-2m-3 0h-2"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            LINEで特典を受け取る
          </button>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default WhatIsCoachingPage;
