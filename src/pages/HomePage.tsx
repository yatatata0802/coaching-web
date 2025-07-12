import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, HelpCircle, Settings, Target, Eye } from "lucide-react";
import SectionDivider from "../components/SectionDivider";
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
    // ヒーローセクションシネマティック登場
    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    // セクションのスクロール連動アニメーション
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
      <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
        {/* アンビエント背景効果 */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        </div>

        {/* ヒーローセクション - ヘッダー高さを考慮 */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-center items-center px-4 header-safe-padding sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent">
              矢田谷 充則
              <span className="block text-xl sm:text-2xl md:text-3xl text-[#d4af37] font-medium mt-2">
                (Yatagai Mitsunori)
              </span>
            </h1>
            {/* 顔写真（削除） */}
            {/* <div className="flex justify-center mb-4">
              <img
                src="/profile.jpg"
                alt="矢田谷充則"
                className="w-32 h-40 object-cover shadow-lg border-4 border-[#d4af37]"
              />
            </div> */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg sm:text-xl md:text-2xl text-[#d4af37] font-semibold mb-6 sm:mb-8"
            >
              魅セルジブン × 踊ルココロ
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-base sm:text-lg md:text-xl leading-relaxed space-y-3 sm:space-y-4 px-2 mb-8"
            >
              <p className="jp-text-optimal text-balance">
                "このまま"で、本当にいいのか？──と問い続けるあなたへ。
              </p>
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
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-6 rounded-2xl bg-[#06C755] text-white font-bold text-xl sm:text-2xl shadow-2xl hover:bg-[#32e67f] transition-all duration-300 transform hover:scale-105"
                style={{ minWidth: 320 }}
              >
                {/* LINE公式アイコンSVG（白抜き） */}
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
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
            </div>
          </motion.div>
        </section>

        <SectionDivider variant="wave" />

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

                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
                  <div className="mt-8 space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
                    <p>
                      20年間、公安警察官として生きてきた私は、常に"仮面"を被り、自分を押し殺してきました。「安定」と「期待」に応え続ける日々の中で、心の奥底ではずっと、「このままで、本当にいいのか？」という問いが消えませんでした。
                    </p>
                    <p></p>
                    <p>
                      もっと自由に、自分らしく生きたい──。その強い想いに気づいたとき、心身は限界を迎えました。しかし、それは「壊れた」のではなく、「脱皮」だったのです。あのどん底を乗り越えたからこそ、私は独自の"ブランディング思考"を手に入れました。
                    </p>
                    <p></p>
                    <p>
                      今、私は自身の「挑戦」の象徴として、筋トレや格闘技を通じて理想の自分を体現しています。そして、そこで培った「継続力」や「自己変革」の経験を活かし、「人生を作品として生きる」人を増やす活動に情熱を注いでいます。
                    </p>
                    <p></p>
                    <p>
                      さあ、あなたの"本当の物語"を、私と一緒にデザインしませんか？──これは、あなただけの人生を取り戻す、記念すべき「最初のページ」です。
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mt-8 sm:mt-10">
                  <VisualGuide type="arrow-right" delay={1}>
                    <MobileOptimizedButton
                      onClick={() => navigate("/profile")}
                      icon={User}
                      variant="primary"
                      size="lg"
                    >
                      〜 PROFILE 〜
                    </MobileOptimizedButton>
                  </VisualGuide>
                </div>
                {/* noteへの導線追加 */}
                <div className="flex justify-center mt-6">
                  <a
                    href="https://note.com/YOUR_NOTE_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#181818] to-[#333] text-[#ffd700] font-semibold text-base shadow-md border-2 border-[#d4af37] hover:bg-[#222] hover:text-[#fff] transition-all duration-300 text-center"
                    style={{ minWidth: 220 }}
                  >
                    ＞＞ 物語の“本編”を読む（note第1話へ）
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider variant="diagonal" />

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

        <SectionDivider variant="curve" />

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

        <SectionDivider variant="wave" flip />

        {/* LINE登録エリア - 新設 */}
        <section
          ref={addToRefs}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#06C755]/20 via-[#32e67f]/10 to-[#06C755]/20 border border-[#06C755]/40 rounded-2xl sm:rounded-3xl text-center backdrop-blur-sm relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* 背景アニメーション */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#06C755]/10 to-[#32e67f]/10 rounded-2xl sm:rounded-3xl blur-xl opacity-50" />

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                  🎁 LINE特典プレゼント
                </h2>
                <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
                  あなたの「変わりたい」を具体的な行動に変える
                  <br className="hidden sm:block" />
                  <span className="text-[#32e67f] font-bold">無料特典</span>
                  をプレゼント！
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-3 text-left">
                    <span className="text-[#32e67f] text-2xl">✓</span>
                    <span className="text-white">
                      「変わりたい」を「変われる」に変える思考法
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-left">
                    <span className="text-[#32e67f] text-2xl">✓</span>
                    <span className="text-white">
                      継続力を身につける習慣化のコツ
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-left">
                    <span className="text-[#32e67f] text-2xl">✓</span>
                    <span className="text-white">
                      心と身体のバランスを整える方法
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    window.open("https://lin.ee/MX41vXf", "_blank")
                  }
                  className="flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-6 rounded-2xl bg-[#06C755] text-white font-bold text-xl sm:text-2xl shadow-2xl hover:bg-[#32e67f] transition-all duration-300 transform hover:scale-105 mx-auto"
                  style={{ minWidth: 320 }}
                >
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
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
                  ＞＞ LINE特典を受け取る
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider variant="diagonal" />

        {/* 統合されたメインCTAセクション - 強力な訴求力 */}
        <section
          ref={addToRefs}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#e53935]/20 via-[#d4af37]/20 to-[#ffd700]/20 border border-[#e53935]/40 rounded-2xl sm:rounded-3xl text-center backdrop-blur-sm relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* 背景アニメーション */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#e53935]/20 to-[#ffd700]/20 rounded-2xl sm:rounded-3xl blur-xl opacity-50" />

              {/* 注目を集める要素 */}
              <VisualGuide
                type="attention-grabber"
                className="absolute top-4 right-4"
              ></VisualGuide>

              <div className="relative z-10">
                {/* --- LINE登録エリア --- */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#d4af37] mb-6 sm:mb-8 jp-text-optimal text-balance">
                  あなたの物語を、ここから始めませんか。
                </h3>
                <div className="bg-black/30 p-6 sm:p-8 rounded-lg mb-8 sm:mb-10">
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4">
                    この公式LINEは、単なる情報配信の場ではありません。
                    <br />
                    私が日々挑戦する中で得た気づきや、YouTubeでは語りきれない思考のプロセス。
                    <br />
                    そして、あなたと同じように「今の自分を変えたい」と願う人々に向けて、私が伝えたい大切なメッセージを、一つひとつ丁寧にお届けする場所です。
                  </p>
                  <p className="text-lg sm:text-xl text-[#ffd700] font-bold mb-2">
                    登録してくださった方には、感謝のしるしとして、私が自分と向き合うために作成した
                    <strong>『最初の一歩を踏み出すためのヒント』</strong>
                    をプレゼントしています。
                  </p>
                  <p className="text-base text-gray-400">
                    もちろん、無理な勧誘などは一切ありません。
                    <br />
                    あなたのペースで、私の言葉や活動に触れていただければ幸いです。
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() =>
                      window.open("https://lin.ee/MX41vXf", "_blank")
                    }
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#06C755] text-white font-bold text-lg sm:text-xl shadow-lg hover:bg-[#32e67f] transition-all duration-300"
                    style={{ minWidth: 280 }}
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
                </div>
                <div className="mt-6 text-sm text-gray-400">
                  ✓ 無理な勧誘は一切ありません ✓ 秘密厳守 ✓ 24時間以内返信
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
        {/* フッター：個別作戦会議リンク */}
        <footer className="text-center pb-8 text-xs text-gray-500">
          <a
            href="/contact"
            className="underline hover:text-[#e53935] transition-colors"
          >
            覚悟が決まった方へ：個別作戦会議の申し込み
          </a>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
