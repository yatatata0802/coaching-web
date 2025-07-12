import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ParticleBackground from "../components/ParticleBackground";
import TypewriterText from "../components/TypewriterText";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // シネマティック登場アニメーション
    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { opacity: 1 },
      { opacity: 0.4, duration: 2, ease: "power2.out" }
    );

    // ビデオフェードイン
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 3, ease: "power2.out" }
      );
    }
  }, []);

  const handleStart = () => {
    // シネマティック退場アニメーション
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => navigate("/main"),
    });
  };

  const titleText = `このまま
終わっていいの？`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] mobile-safe-area">
      {/* パーティクル背景 */}
      <ParticleBackground />

      {/* ビデオ背景 */}
      <div className="absolute inset-0 z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-0"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* シネマティックオーバーレイ */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-black/40 to-black/80"
      />

      {/* コンテンツ - スマホ最適化 */}
      <div className="relative z-30 min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        {/* メインタイトル - スマホ最適化 */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight">
            {titleText.split("\n").map((line, lineIndex) => (
              <div key={lineIndex} className="relative">
                {Array.from(line).map((char, charIndex) => (
                  <motion.span
                    key={`${lineIndex}-${charIndex}`}
                    className="inline-block text-red-500"
                    style={{
                      textShadow: `
                        0 0 20px rgba(255, 0, 0, 0.8),
                        0 0 40px rgba(255, 0, 0, 0.6),
                        0 0 60px rgba(255, 0, 0, 0.4),
                        0 4px 8px rgba(0, 0, 0, 0.8)
                      `,
                      filter: "drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))",
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.3,
                      rotateX: -90,
                      filter: "blur(8px)",
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateX: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      delay: 2.5 + (lineIndex * line.length + charIndex) * 0.1,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            ))}
          </h1>
        </motion.div>

        {/* サブタイトル - タイプライター効果（スマホ最適化） */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="text-lg sm:text-xl md:text-2xl text-[#d4af37] font-medium mb-6 sm:mb-8 space-y-2"
        >
          <div className="h-6 sm:h-8">
            <TypewriterText text="毎朝、同じ顔。" speed={80} />
          </div>
          <div className="h-6 sm:h-8">
            <TypewriterText text="毎日、同じルート。" speed={80} />
          </div>
          <div className="h-6 sm:h-8">
            <TypewriterText text="心が、どこか置き去りのまま。" speed={80} />
          </div>
        </motion.div>

        {/* 説明文 - 改行制御最適化 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 1 }}
          className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 max-w-2xl leading-relaxed px-4 jp-text-optimal text-balance"
        >
          <p>「こんなはずじゃない」って、</p>
          <p>気づいてるはずだ。</p>
        </motion.div>

        {/* CTAボタン - スマホ最適化 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 7, duration: 0.8, ease: "backOut" }}
        >
          <motion.button
            onClick={handleStart}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 20px 40px rgba(212, 175, 55, 0.4), 0 0 60px rgba(255, 215, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 sm:px-12 sm:py-5 text-lg sm:text-xl font-bold bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-[#181818] rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl mobile-touch-target"
          >
            {/* ボタングロー効果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            {/* ボタンテキスト */}
            <span className="relative z-10">最初の一歩を踏み出す</span>

            {/* リップル効果 */}
            <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-active:scale-100 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* スクロールヒント - スマホ最適化 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8, duration: 1 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-[#d4af37] text-xs sm:text-sm flex flex-col items-center mobile-safe-area"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-2"
          >
            ↓
          </motion.div>
          <span>クリックして物語を始める</span>
        </motion.div>
      </div>

      {/* アンビエントライト効果 */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
    </div>
  );
};

export default LandingPage;
