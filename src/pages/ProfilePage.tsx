import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import SEO from '../components/SEO';
import { useProcessProfileStory } from '../hooks/useProcessProfileStory.tsx';
import { PROFILE_PAGE_DATA } from '../constants/content';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const { titleParts, basicProfile, storyContent } = PROFILE_PAGE_DATA;

  const processedStory = useProcessProfileStory(storyContent);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="PROFILE | 矢田谷充則の物語"
        description="公安警察官として20年間勤務した経験と、GCS認定コーチとしての専門知識を活かし、個人の目標達成と行動変容を支援する矢田谷充則の公式プロフィールページです。"
        keywords="矢田谷充則,プロフィール,GCS認定コーチ,元公安警察官,公安警察,筋トレ,ムエタイ,大阪,人生設計,継続力,目標達成,行動変容"
        type="person"
        author={{
          name: "矢田谷充則",
          jobTitle: "GCS認定コーチ, 元公安警察官",
          description: "公安警察官として20年間勤務した経験と、GCS認定コーチとしての専門知識を活かし、個人の目標達成と行動変容を支援する専門家.",
          knowsAbout: ["コーチング", "目標達成", "行動変容", "継続力", "公安警察", "警察官", "筋トレ", "ムエタイ", "人生設計"],
          alumniOf: "関西外国語大学",
          gender: "male",
          sameAs: ["https://www.ginza-coach.com/coaches/view.cgi?username=2505FB4944"],
        }}
      />
      <div className="min-h-screen font-sans header-safe-padding pb-12 sm:pb-16 relative overflow-hidden">
        <section className="text-center py-8 sm:py-12 lg:py-16 px-4 sm:px-5 relative z-10 overflow-hidden pt-[var(--header-top-desktop)] md:pt-[var(--header-top-mobile)]">
          {/* Title Animation */}
          <div className="relative flex justify-center items-center mb-6 sm:mb-8 z-2 px-2">
            <div className="w-full max-w-4xl">
              {titleParts.map((part, partIndex) => (
                <div key={partIndex} className={`flex justify-center flex-wrap ${part.breakAfter ? "mb-2 sm:mb-4" : ""}`}>
                  {Array.from(part.text).map((char: string, charIndex: number) => (
                    <motion.span
                      key={`${partIndex}-${charIndex}`}
                      className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[0.04em] sm:tracking-[0.06em] md:tracking-[0.08em] mx-[0.02em] sm:mx-[0.03em] md:mx-[0.04em]"
                      style={{ textShadow: "0 0 16px #e53935, 0 0 32px #fff", filter: "drop-shadow(0 0 8px #e53935)" }}
                      initial={{ y: 80, opacity: 0, scale: 0.7, rotate: -30 + charIndex * 2, filter: "blur(6px)" }}
                      whileInView={{ y: 0, opacity: 1, scale: 1.1, rotate: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.12 + (partIndex * 20 + charIndex) * 0.04, duration: 0.7, type: "spring", stiffness: 400, damping: 18 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <img src="/profile.jpg" alt="矢田谷充則" className="w-32 h-40 object-cover shadow-lg border-4 border-[#d4af37]" />
          </div>

          {/* Basic Profile */}
          <div className="max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-10 p-4 sm:p-6 bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/20 border border-[#d4af37]/40 rounded-2xl text-left border-l-[5px] border-[#e53935] text-sm sm:text-base">
            {basicProfile.map((line, index) => (
              <div key={index} className="mb-1">{line}</div>
            ))}
          </div>

          {/* My Story Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-5 relative z-10 jp-text-optimal text-balance">
            {processedStory}
          </section>

          {/* GCS Coach Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-5 relative z-10 mb-10 sm:mb-12 mt-16 pb-32">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/20 border border-[#d4af37]/40 rounded-2xl text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-2">GCS認定コーチ</h2>
              <p className="text-gray-300 text-base mb-4">
                銀座コーチングスクールにて体系的なコーチングスキルを習得。厳格な基準をクリアした、プロのコーチです。
                <a href="https://www.ginza-coach.com/coaches/view.cgi?username=2505FB4944" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#d4af37] font-bold underline ml-2 hover:text-[#ffd700] transition-colors">
                  ▶︎認定コーチ詳細を見る <span className="text-xs">↗</span>
                </a>
              </p>
            </div>
          </section>

          {/* LINE CTA Button */}
          <div className="flex justify-center my-8">
            <button
              onClick={() => window.open("https://lin.ee/MX41vXf", "_blank")}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#06C755] text-white font-bold text-xl sm:text-2xl shadow-2xl hover:bg-[#32e67f] transition-all duration-300 transform hover:scale-105 max-w-xs"
              style={{ minWidth: 220 }}
            >
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="12" fill="#fff" />
                <path d="M20 8C12.268 8 6 13.477 6 20.222c0 3.77 2.49 7.09 6.32 9.13l-1.01 3.7a1 1 0 0 0 1.45 1.13l4.09-2.23c1.01.14 2.06.22 3.15.22 7.732 0 14-5.477 14-12.222C34 13.477 27.732 8 20 8Z" fill="#06C755" />
                <path d="M27.5 19.5h-2m-3 0h-2m-3 0h-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
              LINEで特典を受け取る
            </button>
          </div>

          {/* Note CTA (Bottom Fixed) */}
          <div className="fixed bottom-0 left-0 w-full z-50 p-4 sm:p-6 bg-[#0a0a0a]/90 backdrop-blur-sm border-t border-[#d4af37]/30 flex justify-center items-center">
            <a href="https://note.com/coach_yatagai" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-[#181818] to-[#333] text-[#ffd700] font-semibold text-base sm:text-lg shadow-md border-2 border-[#d4af37] hover:bg-[#222] hover:text-[#fff] transition-all duration-300 text-center" style={{ minWidth: 200 }}>
              noteで、元公安警察官の『人生逆転劇』を読む
            </a>
          </div>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-28 right-5 sm:bottom-10 sm:right-10 bg-[#d4af37] text-[#181818] p-3 rounded-full shadow-lg z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;