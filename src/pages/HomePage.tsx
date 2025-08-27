import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, HelpCircle, Settings, Target, Eye } from "lucide-react";
import VisualGuide from "../components/ui/VisualGuide";
import MobileOptimizedButton from "../components/ui/MobileOptimizedButton";
import SEO from "../components/SEO";
import { SUPPORT_TARGETS } from "../constants/content";

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 100,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      <SEO
        title="パーソナルコーチング | 矢田谷充則 | 元公安警察官が「変わりたい」をサポート"
        description="元公安警察官として培った洞察力と問題解決能力を活かし、矢田谷充則があなたの「変わりたい」を力強くサポート。目標達成、行動変容、自己実現を目指すパーソナルコーチングを提供します。初回無料相談受付中。"
        keywords="パーソナルコーチング, 矢田谷充則, 元公安警察官, コーチング, 変わりたい, やる気, 続かない, 目標達成, 行動変容, 自己実現, 筋トレ, 継続力, 大阪, 無料相談"
      />
      <main className="min-h-screen font-sans relative overflow-hidden">
        {/* Heroセクション - シンプルなテキスト・CTAのみ */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-24 md:pt-20 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-20 text-center max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mb-4 text-lg sm:text-xl md:text-2xl text-red-500 font-semibold"
              style={{
                textShadow: `
                  0 0 10px rgba(255, 0, 0, 0.7),
                  0 0 20px rgba(255, 0, 0, 0.5)
                `,
              }}
            >
              「このままじゃ、終わりたくない」
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg sm:text-xl md:text-2xl text-[#d4af37] font-semibold mb-6 sm:mb-8"
            >
              元公安警察官が、あなたの人生の"脚本"を書き換える。
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent">
              矢田谷 充則
              <span className="block text-xl sm:text-2xl md:text-3xl text-[#d4af37] font-medium mt-2">
                (Yatagai Mitsunori)
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl text-white font-semibold mt-1">
                自己実現コーチ
              </span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-base sm:text-lg md:text-xl leading-relaxed space-y-3 sm:space-y-4 px-4 sm:px-2 mb-8 max-w-full"
            >
              <VisualGuide type="glow-border" delay={2.5}>
                <p className="text-xl sm:text-2xl font-bold text-[#d4af37]">
                  "なりたい自分"を夢で終わらせない。
                </p>
              </VisualGuide>
              <p>今の自分にモヤモヤしてるなら──</p>
              <p>心と身体の両面から、"なりたい自分"に火をつける。</p>
            </motion.div>
            {/* --- 新CTA配置 --- */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              {/* 主役CTA：LINE特典（LINE公式デザイン） */}
              <button
                onClick={() => window.open("https://lin.ee/MX41vXf", "_blank")}
                className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 rounded-2xl bg-[#06C755] text-white font-bold text-base sm:text-xl lg:text-2xl shadow-2xl hover:bg-[#32e67f] transition-all duration-300 transform hover:scale-105"
                style={{ minWidth: 280 }}
              >
                {/* LINE公式アイコンSVG（白抜き） */}
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  viewBox="0 0 40 40"
                  fill="none"
                >
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
                LINEで「人生脚本」無料診断を受ける
              </button>
            </div>
          </motion.div>
        </section>

        {/* My Storyセクション - 視線誘導最適化 */}
        <section
          ref={addToRefs}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-[#d4af37]/20 via-[#ffd700]/10 to-[#d4af37]/20 border border-[#d4af37]/40 rounded-2xl sm:rounded-3xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* グロー効果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-[#ffd700]/20 rounded-2xl sm:rounded-3xl blur-xl opacity-50" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <VisualGuide type="pulse-dot" className="mr-4" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d4af37] text-center">
                    My Story
                  </h2>
                  <VisualGuide type="pulse-dot" className="ml-4" />
                </div>

                <div className="mt-8 space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
                    <p>
                      タトゥーの針が肌に刺さる瞬間、20年の警察人生に終止符を打った。
                    </p>
                    <p>
                      「警察官はこうあるべき」──そう信じて、ずっと“偽りの自分”を演じてきた。
                      清廉潔白、正しさ、期待に応える優等生。
                      気づけば、人生の脚本はすべて“他人”が書いていた。
                      仮面と鎧を身にまとい続けた結果、心も身体も限界を迎え、うつ状態と診断された。
                      そこからすべてを手放し、コーチングによりゼロから自分の人生を取り戻すまでのリアルな物語があります。
                    </p>
                    <p>
                      「このままで、本当にいいのか？」
                      もし、あなたの心の奥でそう声がしているなら──
                      脚本を“誰か”に書かれた人生から、自分で書き直す人生へ。
                    </p>
                  </div>

                <div className="flex justify-center mt-8 sm:mt-10">
                  <VisualGuide type="arrow-right" delay={1}>
                    <MobileOptimizedButton
                      onClick={() => navigate("/profile")}
                      icon={User}
                      variant="primary"
                      size="lg"
                    >
                      すべての物語を読む
                    </MobileOptimizedButton>
                  </VisualGuide>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* サポートセクション - シンプル表示 */}
        <section
          ref={addToRefs}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="p-6 sm:p-8 lg:p-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl hover:border-[#d4af37]/30 transition-all duration-500"
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center mb-6 sm:mb-8">
                <Target className="text-[#d4af37] mr-4" size={24} />
                <h2 className="text-2xl sm:text-3xl font-bold text-[#d4af37] border-l-4 border-[#d4af37] pl-4 sm:pl-6">
                  こんな方をサポートします
                </h2>
              </div>

              <div className="grid gap-4 sm:gap-6">
                {SUPPORT_TARGETS.map((target, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 sm:p-6 rounded-lg bg-gradient-to-r from-[#d4af37]/10 to-transparent border-l-4 border-[#d4af37] hover:from-[#d4af37]/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <VisualGuide type="pulse-dot" delay={index * 0.2} />
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                          {target.text}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                          {target.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-8 sm:mt-10">
                <VisualGuide type="attention-grabber" delay={1}>
                  <MobileOptimizedButton
                    onClick={() => navigate("/what-coaching")}
                    icon={HelpCircle}
                    variant="secondary"
                    size="lg"
                  >
                    〜 WHAT'S COACHING 〜
                  </MobileOptimizedButton>
                </VisualGuide>
              </div>
            </motion.div>
          </div>
        </section>

        {/* サービスセクション - 視線誘導最適化 */}
        <section
          ref={addToRefs}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="p-6 sm:p-8 lg:p-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl hover:border-[#d4af37]/30 transition-all duration-500"
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center mb-6 sm:mb-8">
                <Settings className="text-[#d4af37] mr-4" size={24} />
                <h2 className="text-2xl sm:text-3xl font-bold text-[#d4af37] border-l-4 border-[#d4af37] pl-4 sm:pl-6">
                  サポート内容
                </h2>
              </div>

              <VisualGuide type="glow-border" delay={0.5}>
                <div className="text-[#d4af37] font-semibold mb-4 sm:mb-6 text-lg sm:text-xl bg-[#d4af37]/10 p-4 rounded-lg text-center">
                  あなたの「変わりたい」を、具体的な「行動」へ。
                </div>
              </VisualGuide>

              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    title: "行動変容支援：",
                    description:
                      "「変わりたい」という漠然とした想いを、具体的な行動へと繋げ、着実に未来を切り拓く勇気を引き出します。",
                    color: "#e53935",
                  },
                  {
                    title: "自己管理強化：",
                    description:
                      "目標達成に不可欠な「継続する力」を、あなたのライフスタイルに合わせて最適化。揺るぎない習慣を構築します。",
                    color: "#d4af37",
                  },
                  {
                    title: "心と身体のサポート：",
                    description:
                      "筋トレや格闘技で培った経験を活かし、心身のバランスを整え、内面から輝く「魅せる自分」を創造します。",
                    color: "#ffd700",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <VisualGuide type="glow-border" delay={index * 0.2}>
                      <div className="p-4 sm:p-6 bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-xl border-l-4 border-[#d4af37] hover:from-[#d4af37]/20 transition-all duration-300">
                        <div className="flex items-center">
                          <Eye
                            className="text-[#d4af37] mr-3 opacity-0 group-hover:opacity-100 transition-opacity"
                            size={20}
                          />
                          <span className="text-[#d4af37] font-bold text-base sm:text-lg">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-white ml-2 text-base sm:text-lg block mt-2">
                          {item.description}
                        </span>
                      </div>
                    </VisualGuide>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-8 sm:mt-10">
                <VisualGuide type="arrow-right" delay={1}>
                  <MobileOptimizedButton
                    onClick={() => navigate("/services")}
                    icon={Settings}
                    variant="primary"
                    size="lg"
                  >
                    〜 SERVICES 〜
                  </MobileOptimizedButton>
                </VisualGuide>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LINE登録特典・あなたの物語セクションを統合 */}
        <section
          ref={addToRefs}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#d4af37]/20 via-[#ffd700]/10 to-[#d4af37]/20 border border-[#d4af37]/40 rounded-2xl sm:rounded-3xl text-center backdrop-blur-sm relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* 背景アニメーション */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-[#ffd700]/10 rounded-2xl sm:rounded-3xl blur-xl opacity-50" />

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 jp-text-optimal text-balance">
                  あなたの物語を、ここから始めませんか。
                </h2>
                <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed jp-text-optimal">
                  LINEにご登録いただいた方限定で、公安式・『人生脚本』タイプ別診断をプレゼント中！
                  <br className="hidden sm:block" />
                  あなたの物語を、ここから始めませんか？
                </p>
                <div className="flex flex-col items-center gap-4 justify-center mt-8">
                  <button
                    onClick={() =>
                      window.open("https://lin.ee/MX41vXf", "_blank")
                    }
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
                    特典を受け取る
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* トップへ戻る - 親指操作エリア最適化 */}
        <div className="text-center py-8 sm:py-12">
          <MobileOptimizedButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            variant="outline"
            size="md"
          >
            トップへ戻る
          </MobileOptimizedButton>
        </div>
        
      </main>
    </>
  );
};

export default HomePage;