import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, TrendingUp, Heart, CheckCircle, Clock } from "lucide-react";
import SEO from "../components/SEO";
import ParticleBackground from "../components/ParticleBackground";
import SectionDivider from "../components/SectionDivider";

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "行動変容支援",
      subtitle: "「変わりたい」を「変われる」に",
      description:
        "頭では分かってるのに行動できない。そんなあなたの心の壁を取り除き、確実に一歩を踏み出せるようサポートします。",
      icon: Target,
      color: "#e53935",
      features: [
        "目標設定とアクションプランの作成",
        "行動の障壁となる思考パターンの特定",
        "小さな成功体験の積み重ね",
        "継続的なモチベーション管理",
      ],
      benefits: [
        "3ヶ月で行動力が劇的に向上",
        "先延ばし癖が改善される",
        "自信を持って挑戦できるようになる",
      ],
      testimonial: {
        text: "今まで何をやっても続かなかった私が、3ヶ月で人生が変わりました。",
        author: "30代 会社員 T.Mさん",
      },
    },
    {
      title: "自己管理強化",
      subtitle: "継続する力を身につける",
      description:
        "三日坊主から卒業し、目標達成に不可欠な「継続する力」を科学的アプローチで育てます。",
      icon: TrendingUp,
      color: "#d4af37",
      features: [
        "習慣化のメカニズム理解",
        "時間管理とエネルギー管理",
        "セルフモニタリング技術",
        "挫折からの立ち直り方",
      ],
      benefits: [
        "習慣化成功率90%以上",
        "時間の使い方が劇的に改善",
        "ストレス耐性が向上",
      ],
      testimonial: {
        text: "毎日の習慣が身につき、仕事もプライベートも充実しています。",
        author: "40代 経営者 K.Sさん",
      },
    },
    {
      title: "心と身体のサポート",
      subtitle: "内面と外見の両方から変革",
      description:
        "筋トレや運動を通じて得た継続のコツを活かし、メンタルとフィジカルの両面からバランスの取れたサポートを提供します。",
      icon: Heart,
      color: "#4caf50",
      features: [
        "メンタルとフィジカルの相互作用理解",
        "ストレス管理とリカバリー",
        "パフォーマンス向上のための生活習慣",
        "自信構築のためのボディメイク",
      ],
      benefits: [
        "心身ともに健康的な変化",
        "自信と魅力が大幅アップ",
        "エネルギーレベルが向上",
      ],
      testimonial: {
        text: "見た目も心も変わって、周りからの反応が全然違います。",
        author: "20代 フリーランス A.Hさん",
      },
    },
  ];

  const pricingPlans = [
    {
      name: "ベーシック",
      price: "月額 15,000円",
      duration: "3ヶ月コース",
      features: [
        "月1回のセッション（60分）",
        "チャットサポート",
        "目標設定・進捗管理",
        "基本的な習慣化サポート",
      ],
      popular: false,
      description: "初めてコーチングを受ける方におすすめ",
    },
    {
      name: "スタンダード",
      price: "月額 25,000円",
      duration: "6ヶ月コース",
      features: [
        "月2回のセッション（60分）",
        "24時間チャットサポート",
        "目標設定・進捗管理",
        "習慣化サポート",
        "継続的なモチベーション管理",
      ],
      popular: true,
      description: "最も選ばれているプラン",
    },
    {
      name: "プレミアム",
      price: "月額 40,000円",
      duration: "12ヶ月コース",
      features: [
        "月3回のセッション（90分）",
        "24時間優先チャットサポート",
        "完全オーダーメイドプログラム",
        "継続的なモチベーション管理",
        "成果保証制度",
      ],
      popular: false,
      description: "本気で変わりたい方へ",
    },
  ];

  // お客様の声・ビフォーアフター事例
  const testimonials = [
    {
      name: "T.Mさん",
      age: "30代",
      job: "会社員",
      before: "何をやっても続かず、自己嫌悪に陥る日々",
      after: "3ヶ月で行動力が劇的に向上し、新しいことに挑戦できるようになった",
      improvement: "習慣化成功率 90%",
      duration: "3ヶ月コース",
      category: "行動変容支援",
      testimonial:
        "今まで何をやっても続かなかった私が、3ヶ月で人生が変わりました。矢田谷さんの指導のおかげで、目標を達成する力が身につきました。",
    },
    {
      name: "K.Sさん",
      age: "40代",
      job: "経営者",
      before: "時間管理ができず、仕事とプライベートのバランスが取れない",
      after: "毎日の習慣が身につき、仕事もプライベートも充実している",
      improvement: "時間管理効率 150%向上",
      duration: "6ヶ月コース",
      category: "自己管理強化",
      testimonial:
        "毎日の習慣が身につき、仕事もプライベートも充実しています。矢田谷さんの継続的なサポートのおかげで、理想のライフスタイルを実現できました。",
    },
    {
      name: "A.Hさん",
      age: "20代",
      job: "フリーランス",
      before: "自信がなく、人前に立つのが苦手",
      after: "見た目も心も変わって、周りからの反応が全然違う",
      improvement: "自信度 200%向上",
      duration: "12ヶ月コース",
      category: "心と身体のサポート",
      testimonial:
        "見た目も心も変わって、周りからの反応が全然違います。矢田谷さんの心身両面からのサポートで、本当に変われました。",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#181818] text-white header-safe-padding pb-12 sm:pb-16 mobile-safe-area relative overflow-hidden">
      <SEO
        title="コーチングサービス | 矢田谷充則の提供サービスと料金"
        description="矢田谷充則が提供する行動変容支援、自己管理強化、心と身体のサポートといったコーチングサービスの詳細と料金プランをご紹介します。あなたの「変わりたい」を現実にする最適なプランを見つけてください。"
        keywords="コーチングサービス, 料金プラン, 行動変容支援, 自己管理強化, 心と身体のサポート, 矢田谷充則, パーソナルコーチング, 目標達成, 習慣化, 筋トレ"
      />
      {/* パーティクル背景 */}
      <ParticleBackground />
      {/* グロー背景エフェクト */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e53935]/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ffd700]/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* ヒーローセクション */}
        <section className="text-center py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent drop-shadow-lg">
              SERVICES
            </h1>

            <p className="text-xl sm:text-2xl text-[#d4af37] font-semibold mb-4 drop-shadow">
              あなたの"変わりたい"を現実にする
            </p>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed">
              あなたの目標とライフスタイルに合わせて、最適なプランをお選びいただけます。継続的なサポートで、確実な変化を実現します。
            </p>
          </motion.div>

          {/* 社会的証明 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8 sm:mb-12"
          >
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Target size={20} />
              <span className="font-bold">目標設定</span>
              <span className="text-gray-300">から実現まで</span>
            </div>
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Heart size={20} />
              <span className="font-bold">心身両面</span>
              <span className="text-gray-300">のサポート</span>
            </div>
            <div className="flex items-center gap-2 text-[#d4af37]">
              <TrendingUp size={20} />
              <span className="font-bold">継続的な</span>
              <span className="text-gray-300">成長支援</span>
            </div>
          </motion.div>
        </section>

        {/* 料金プランセクション */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#d4af37] mb-4">
              料金プラン
            </h2>
            <p className="text-lg text-gray-300">
              あなたの目標と予算に合わせてお選びください
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className={`relative p-6 sm:p-8 rounded-2xl border shadow-xl transition-all duration-300 backdrop-blur-sm
                  ${
                    plan.popular
                      ? "bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/20 border-[#d4af37]/60 transform scale-105"
                      : "bg-white/5 border-white/10 hover:border-[#d4af37]/40"
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-4 py-1 bg-[#e53935] text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                      人気No.1
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-[#d4af37] mb-1 drop-shadow-lg">
                    {plan.price}
                  </div>
                  <p className="text-sm text-gray-400">{plan.duration}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="text-[#d4af37] mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/contact")}
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 shadow-md
                    ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#e53935] to-[#d4af37] text-white hover:from-[#d4af37] hover:to-[#e53935]"
                        : "bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#181818] hover:from-[#ffd700] hover:to-[#d4af37]"
                    }
                  `}
                >
                  このプランで始める
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 料金プランセクション - 改善版 */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#d4af37] mb-6 drop-shadow-lg">
                料金プラン
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                あなたの目標とライフスタイルに合わせて、最適なプランをお選びいただけます。
                <br className="hidden sm:block" />
                継続的なサポートで、確実な変化を実現します。
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? "border-[#d4af37] bg-gradient-to-br from-[#d4af37]/10 to-[#ffd700]/5 shadow-2xl shadow-[#d4af37]/20"
                      : "border-[#d4af37]/30 bg-gradient-to-br from-[#181818]/80 to-[#0a0a0a]/90 hover:border-[#d4af37]/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#181818] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ 人気No.1
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#d4af37] mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-white">
                        {plan.price}
                      </span>
                    </div>
                    <span className="text-[#d4af37] font-medium">
                      {plan.duration}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle
                          className="text-[#d4af37] mt-1 flex-shrink-0"
                          size={20}
                        />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate("/contact")}
                    className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#181818] hover:from-[#ffd700] hover:to-[#d4af37]"
                        : "bg-gradient-to-r from-[#181818] to-[#333] text-[#d4af37] border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-[#181818]"
                    }`}
                  >
                    このプランで始める
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider variant="wave" />

        {/* お客様の声・ビフォーアフター事例セクション */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#d4af37] mb-6 drop-shadow-lg">
                お客様の声・ビフォーアフター事例
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                実際にコーチングを受けた方々の変化をご紹介します。
                <br className="hidden sm:block" />
                あなたも同じような変化を体験できるかもしれません。
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
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
                    <div className="text-sm font-bold text-[#e53935] mb-2">
                      Before
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {testimonial.before}
                    </p>
                  </div>

                  {/* 変化の矢印 */}
                  <div className="flex justify-center my-3">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#d4af37]/80 to-[#ffd700]/80 border border-[#d4af37]/60 text-[#181818] font-bold text-xs shadow-md">
                      ↓ 変化
                    </div>
                  </div>

                  {/* After */}
                  <div className="rounded-xl bg-gradient-to-br from-[#1e3a1e]/20 to-[#181818]/60 border border-green-700/40 p-4 mb-4">
                    <div className="text-sm font-bold text-green-400 mb-2">
                      After
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {testimonial.after}
                    </p>
                  </div>

                  {/* 改善数値 */}
                  <div className="rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#181818]/60 border border-[#d4af37]/40 p-3 mb-4">
                    <div className="text-sm font-bold text-[#d4af37] mb-1">
                      改善結果
                    </div>
                    <p className="text-gray-300 text-xs">
                      {testimonial.improvement}
                    </p>
                  </div>

                  {/* お客様の声 */}
                  <div className="rounded-xl bg-gradient-to-br from-[#181818]/80 to-[#333]/80 border border-gray-500/30 p-4">
                    <div className="text-sm font-bold text-gray-200 mb-2">
                      お客様の声
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed italic">
                      "{testimonial.testimonial}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 注意書き */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mt-12"
            >
              <p className="text-xs text-gray-400">
                ※すべて本人の同意のもと、内容の一部を再構成して掲載しています。
              </p>
            </motion.div>
          </div>
        </section>

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
      </div>
    </div>
  );
};

export default ServicesPage;
