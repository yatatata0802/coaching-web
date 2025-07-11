import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Eye, Zap, Users } from "lucide-react";
import VisualGuide from "../components/ui/VisualGuide";
import ParticleBackground from "../components/ParticleBackground";
import SEO from "../components/SEO";

const WhatIsCoachingPage: React.FC = () => {
  const sections = [
    {
      title: "コーチングとは",
      icon: Target,
      content: [
        `コーチングとは、自分の中にある"本音"を引き出す対話の技術です。\n\n本当は気づいているはずなんです。このままじゃ、何か違うって。\nでも、どう変えればいいのかは自分でもわからない。\nその"もやもや"を、ちゃんと形にしていくのがコーチングです。`,
      ],
    },
    {
      title: "コンサルとの違い",
      icon: Eye,
      content: [
        `コンサルは、やり方や答えを与えてくれます。\nでも、コーチングは問いかけます。\n\n「正解」より、「本音」。\n「こうすべき」より、「どうしたい？」\n\n主役は、いつだってあなた自身。\n他人の人生じゃなく、"自分の人生"を取り戻すプロセス。`,
      ],
    },
    {
      title: "コーチングを受けると、どうなる？",
      icon: Zap,
      content: [
        `「ほんまは、こう生きたかったんや」って、自分の本音に気づけるようになる。\n\n自己理解が深まり、なぜしんどかったのか、どう生きたいのかが、ハッキリしてくる。\n\nゴールが明確になり、行動が加速する。\n\n成長が習慣化し、淡々と前に進める自分になってる。`,
      ],
    },
    {
      title: "最後に",
      icon: Users,
      content: [
        `🔥 このまま終わらせますか？\n\n毎日同じことを繰り返して、「こんなはずじゃなかった」と後悔する人生を。\n\nそれとも、今すぐ行動を起こして、「やっぱりやってよかった」と言える人生を選びますか？\n\n⏰ 人生を変えるタイミングは、いつだって「今」。`,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white header-safe-padding relative overflow-hidden">
      <SEO
        title="コーチングとは？ | 矢田谷充則のパーソナルコーチング"
        description="矢田谷充則がコーチングの真髄を解説。コンサルティングとの違い、コーチングで得られる変化、そして「変わりたい」あなたへのメッセージを深く掘り下げます。"
        keywords="コーチングとは, コーチング, パーソナルコーチング, 矢田谷充則, コンサルティング, 自己理解, 目標達成, 行動変容, 変わりたい"
      />
      {/* Enhanced Background Effects */}
      <ParticleBackground />

      {/* Additional Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e53935]/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ffd700]/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

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
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className={`p-8 md:p-6 backdrop-blur-sm rounded-2xl relative shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 ${
                index === sections.length - 1
                  ? "bg-gradient-to-br from-[#e53935]/10 via-[#d4af37]/5 to-[#e53935]/10 border-2 border-[#e53935]/30 hover:border-[#e53935]/50 hover:scale-1.02"
                  : "bg-white/5 border border-[#d4af37]/20 hover:border-[#d4af37]/40 hover:y-[-5px]"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={
                index === sections.length - 1
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
                    <section.icon size={32} className="text-[#d4af37]" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-[#d4af37] font-serif md:text-2xl">
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
                {section.content.map((line, lineIndex) => (
                  <motion.p
                    key={lineIndex}
                    className={`${line === "" ? "h-2" : ""} ${
                      index === sections.length - 1 &&
                      lineIndex === section.content.length - 1
                        ? "text-[#e53935] font-bold text-xl"
                        : "text-gray-200"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.2 + lineIndex * 0.1,
                      duration: 0.5,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: line.replace(/\n/g, "<br/>"),
                    }}
                  />
                ))}
              </motion.div>

              {index === sections.length - 1 && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {/* 無料相談を申し込むボタン削除 */}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ナビゲーションボタン削除済み。LINE・noteボタンのみ残す */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-8">
          {/* LINE登録ボタン */}
          <button
            onClick={() => window.open("https://lin.ee/MX41vXf", "_blank")}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#06C755] text-white font-bold text-lg sm:text-xl shadow-lg hover:bg-[#32e67f] transition-all duration-300"
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
            ＞＞ LINEで、最初の一歩を踏み出すヒントを受け取る
          </button>
          {/* note誘導ボタン */}
          <a
            href="https://note.com/YOUR_NOTE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-[#181818] to-[#333] text-[#ffd700] font-semibold text-base sm:text-lg shadow-md border-2 border-[#d4af37] hover:bg-[#222] hover:text-[#fff] transition-all duration-300 text-center"
            style={{ minWidth: 200 }}
          >
            ＞＞ 物語の“本編”を読む（note第1話へ）
          </a>
        </div>

        <div className="h-20"></div>
      </div>

      <style>{`
        @keyframes lightParticleFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-15px) translateX(5px) scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-25px) translateX(-3px) scale(0.9);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-10px) translateX(8px) scale(1.2);
            opacity: 0.9;
          }
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default WhatIsCoachingPage;
