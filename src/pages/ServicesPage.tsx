import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, TrendingUp, Heart, CheckCircle, Clock, ArrowDown } from "lucide-react";
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
      originalPrice: "月額 20,000円",
      salePrice: "月額 15,000円",
      discount: "25%OFF",
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
      originalPrice: "月額 35,000円",
      salePrice: "月額 25,000円",
      discount: "29%OFF",
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
      originalPrice: "月額 50,000円",
      salePrice: "月額 40,000円",
      discount: "20%OFF",
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
      name: "Nさん",
      age: "30代",
      job: "若手公務員",
      before: "「自分のことがわかってない」「長所が見えない」という自己理解の不足。真面目で責任感が強い一方で、コミュニケーションに苦手意識があり、言葉に詰まることもしばしば。面接などでは「体力」「継続力」といった無難な回答しかできず、「しっくりこない」と感じていた。「自分にはユーモアがない」というリミッティングビリーフに縛られていた。",
      after: "野球経験から「仲間を助けたい」という他者貢献の本質に気づき、自分の強みを再発見。心配性＝準備力、慎重さ＝冷静な判断力として“短所を長所に再定義”。「人前で話す」ではなく「1対1で堂々と話せるようになりたい」という現実的な目標へ軸が変化。「質問力を鍛える」ことの意味に気づき、コミュニケーションへの向き合い方が変化。「頼られる存在になりたい」と自信を持って語れるように。",
      improvement: "自己肯定感アップ",
      duration: "コーチングセッション",
      category: "自己理解",
      testimonial:
        "「これって強みになるんですか…？ただの心配性やと思ってました」",
    },
    {
      name: "Iさん",
      age: "40代",
      job: "中間管理職",
      before: "「何となく分かってるつもり」だった思考が、実は整理されていなかった。家庭・仕事・自分の今後に対するモヤモヤが重なり、優先順位や判断軸が不明確な状態。",
      after: "「自分を見つめ直す時間は本当に大切だ」と痛感。長年曖昧だった価値観や方向性が言語化され、思考がスッキリ。コーチング後、「その日から即実践」と行動変容が見られた。",
      improvement: "思考の整理",
      duration: "コーチングセッション",
      category: "キャリアデザイン",
      testimonial:
        "「やたさんの変わりようにも驚いた。昔のギラギラがなくなってて、これがコーチングの力なんやなって思った」",
    },
    {
      name: "Mさん",
      age: "40代",
      job: "現バス運転手",
      before: "転職を目指すも不採用。「年齢的にもう無理かも」という諦めが先行。住宅ローン、発達障害のある娘の育児、人間関係と課題が山積みで、どこから動いていいか分からない状態。",
      after: "「強みを活かして人脈を広げる」という突破口を発見。セッション当日に迷っていた採用担当者へ連絡→即行動に移し、日程調整まで完了。「目標を高く設定するだけで、考え方も行動もガラッと変わる」と自覚。家族にもセッション内容を共有し、妻からも「ちゃんと考えてるやん」と前向きな反応が得られた。",
      improvement: "行動力向上",
      duration: "コーチングセッション",
      category: "転職支援",
      testimonial:
        "「なんか、想像もつかん方向から解決策が出てくる気がするねん」",
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

        {/* 料金プランセクション - 改善版 */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="mb-6">
                <span className="bg-gradient-to-r from-[#e53935] to-[#d4af37] text-white px-6 py-3 rounded-full text-base font-bold shadow-lg animate-pulse">
                  🎉 期間限定セール実施中 🎉
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#d4af37] mb-6 drop-shadow-lg">
                料金プラン
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
                あなたの目標とライフスタイルに合わせて、最適なプランをお選びいただけます。
                <br className="hidden sm:block" />
                継続的なサポートで、確実な変化を実現します。
              </p>
              <p className="text-[#d4af37] font-semibold text-lg mb-4">
                今なら最大29%OFF！この機会をお見逃しなく
              </p>
              <div className="bg-[#e53935]/20 border border-[#e53935]/30 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-[#e53935] font-bold text-sm">
                  ⏰ セール終了まで残り時間
                </p>
                <p className="text-white font-semibold">
                  この価格は期間限定です。お早めにお申し込みください。
                </p>
              </div>
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
                    <div className="relative mb-3">
                      <div className="text-3xl font-bold text-white">
                        {plan.salePrice}
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <span className="bg-[#e53935] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                          {plan.discount}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="line-through text-gray-500 text-sm">
                        {plan.originalPrice}
                      </span>
                      <span className="text-[#d4af37] text-xs font-bold bg-[#d4af37]/20 px-2 py-1 rounded">
                        SALE
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
                    onClick={() => {
                      const formBase =
                        "https://docs.google.com/forms/d/e/1FAIpQLScoWlJM_N0VxRsQr0AkX6sqysjT0Gec9GS7Erp2J2IqP8FsOQ/viewform?usp=header";
                      // Googleフォームの事前入力用パラメータ（フォーム側で設定が必要）
                      // 例: const planParam = `&entry.1234567890=${encodeURIComponent(plan.name)}`;
                      // window.open(formBase + planParam, "_blank");
                      window.open(formBase, "_blank");
                    }}
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

        {/* セッションの実施方法セクション */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#d4af37] mb-6 drop-shadow-lg">
                セッションの実施方法
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#181818]/80 to-[#0a0a0a]/90 shadow-xl p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#d4af37] mb-4">場所</h3>
                  <p className="text-gray-300">対面セッション</p>
                  <p className="text-gray-400 text-sm mt-1">京橋駅（大阪）周辺のカフェ等</p>
                  <p className="text-gray-500 text-xs mt-2">※詳細な場所はご相談の上、決定します。</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#d4af37] mb-4">対応可能日時</h3>
                  <p className="text-gray-300"><span className="font-semibold">平日:</span> 10:00～14:00 / 16:00～19:00</p>
                  <p className="text-gray-300 mt-1"><span className="font-semibold">土日祝:</span> 10:00～19:00</p>
                  <p className="text-gray-400 text-xs mt-3">※平日は、地域の見守り活動のため、通学時間帯はセッションをお休みしております。</p>
                  <p className="text-400 text-xs mt-1">※上記以外の日時についても、お気軽にご相談ください。</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

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
                      <ArrowDown
                        className="text-[#d4af37]"
                        size={32}
                      />
                    </motion.div>
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
      </div>
    </div>
  );
};

export default ServicesPage;