import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import ParticleBackground from "../components/ParticleBackground";
import ServiceTestimonialCard from "../components/ui/ServiceTestimonialCard";
import { SERVICES_PAGE_DATA, PRICING_PLANS, SERVICE_PAGE_TESTIMONIALS } from "../constants/content";
import { Target, TrendingUp, Heart, CheckCircle, Clock } from "lucide-react";

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen header-safe-padding pb-12 sm:pb-16 mobile-safe-area relative overflow-hidden">
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
        <section className="text-center py-12 sm:py-16 lg:py-20 pt-24 md:pt-20">
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
              {PRICING_PLANS.map((plan, index) => (
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
                  <h3 className="text-xl font-bold text-[#d4af37] mb-4">セッションの実施形式</h3>
                  <p className="text-gray-300">当コーチングは、対面形式でのセッションを基本としております。オンラインでの実施は現在行っておりません。</p>
                  <p className="text-gray-300 mt-2">以下のいずれかの場所をお選びいただけます。</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 ml-4">
                    <li>私の自宅（京橋駅より徒歩3分）</li>
                    <li>京橋駅（大阪）周辺の喫茶店</li>
                  </ul>
                  <p className="text-gray-500 text-xs mt-2">※詳細な場所は、お申し込み後に個別にご案内いたします。</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#d4af37] mb-4">対応可能日時</h3>
                  <p className="text-gray-300"><span className="font-semibold">平日:</span> 10:00～20:00</p>
                  <p className="text-gray-300 mt-1"><span className="font-semibold">土日祝:</span> 10:00～19:00</p>
                  <p className="text-gray-400 text-xs mt-3">※上記以外の日時についても、お気軽にご相談ください。</p>
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
              {SERVICE_PAGE_TESTIMONIALS.map((testimonial, index) => (
                <ServiceTestimonialCard key={index} testimonial={testimonial} index={index} />
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
