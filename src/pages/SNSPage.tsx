import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Star,
  Play,
  Heart,
  MessageSquare,
  Users,
  TrendingUp,
  Home,
  ArrowUp,
  ExternalLink,
  Zap,
  ArrowRight,
} from "lucide-react";
import SEO from "../components/SEO";

const SNSPage: React.FC = () => {
  const navigate = useNavigate();

  const snsData = [
    {
      platform: "YouTube",
      icon: Youtube,
      color: "#FF0000",
      handle: "@yatagai_coaching",
      url: "https://youtube.com/@yatagai_coaching",
      followers: "1.2K",
      description:
        smartBreakJapanese("まずはYouTubeチャンネル登録がおすすめです！私の人柄や考え方が一番わかります"),
      content: "セルフマネジメント・ライフスタイル・コーチング動画を配信",
      features: [
        smartBreakJapanese("週2回の動画更新"),
        smartBreakJapanese("実践的なコーチング技術"),
        smartBreakJapanese("筋トレ・ボディメイク指導"),
        smartBreakJapanese("Q&Aライブ配信"),
      ],
      stats: [
        { label: "登録者数", value: "1,200+" },
        { label: "総再生回数", value: "50K+" },
        { label: "動画数", value: "80+" },
      ],
      recommended: true,
      priority: 1,
    },
    {
      platform: "Instagram",
      icon: Instagram,
      color: "#E4405F",
      handle: "@yatagai_coaching",
      url: "https://instagram.com/yatagai_coaching",
      followers: "2.8K",
      description:
        smartBreakJapanese("日々の気づきやライフスタイル、ビフォーアフターをシェアしています"),
      content: "日常・ライフスタイル・セルフマネジメント投稿",
      features: [
        smartBreakJapanese("毎日のストーリー更新"),
        smartBreakJapanese("ライフスタイル動画・写真"),
        smartBreakJapanese("ライフスタイル投稿"),
        smartBreakJapanese("フォロワーとの交流"),
      ],
      stats: [
        { label: "フォロワー", value: "2,800+" },
        { label: "投稿数", value: "300+" },
        { label: "エンゲージメント率", value: "8.5%" },
      ],
      recommended: false,
      priority: 2,
    },
    {
      platform: "Twitter",
      icon: Twitter,
      color: "#1DA1F2",
      handle: "@yatagai_coaching",
      url: "https://twitter.com/yatagai_coaching",
      followers: "1.5K",
      description: smartBreakJapanese("コーチングのヒントや考察、日々の気づきをリアルタイムで発信"),
      content: "コーチング理論・考察・日常のつぶやき",
      features: [
        smartBreakJapanese("毎日のツイート"),
        smartBreakJapanese("コーチング理論解説"),
        smartBreakJapanese("フォロワーとの対話"),
        smartBreakJapanese("リアルタイム情報発信"),
      ],
      stats: [
        { label: "フォロワー", value: "1,500+" },
        { label: "ツイート数", value: "1,200+" },
        { label: "いいね率", value: "12%" },
      ],
      recommended: false,
      priority: 3,
    },
    {
      platform: "LINE",
      icon: MessageCircle,
      color: "#00B900",
      handle: "LINE公式アカウント",
      url: "https://line.me/ti/p/@yatagai_coaching",
      followers: "800+",
      description:
        smartBreakJapanese("気軽にメッセージをお送りください。個別相談も受け付けています"),
      content: "個別メッセージ・相談受付・限定情報配信",
      features: [
        smartBreakJapanese("個別メッセージ対応"),
        smartBreakJapanese("限定コンテンツ配信"),
        smartBreakJapanese("相談受付"),
        smartBreakJapanese("セミナー情報優先配信"),
      ],
      stats: [
        { label: "友だち数", value: "800+" },
        { label: "開封率", value: "85%" },
        { label: "返信率", value: "95%" },
      ],
      recommended: false,
      priority: 4,
    },
  ];

  const contentTypes = [
    {
      title: "コーチング理論",
      description: smartBreakJapanese("実践的なコーチング技術や心理学的アプローチを解説"),
      platforms: ["YouTube", "Twitter"],
      icon: TrendingUp,
    },
    {
      title: "ライフスタイル・セルフマネジメント",
      description: smartBreakJapanese("継続的な習慣化と自己管理の実践方法を解説"),
      platforms: ["YouTube", "Instagram"],
      icon: Heart,
    },
    {
      title: "日常・ライフスタイル",
      description: smartBreakJapanese("日々の気づきや習慣、プライベートな一面も"),
      platforms: ["Instagram", "Twitter"],
      icon: MessageSquare,
    },
    {
      title: "個別サポート",
      description: smartBreakJapanese("直接的な相談やコミュニケーション"),
      platforms: ["LINE"],
      icon: Users,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white header-safe-padding pb-12 sm:pb-16">
      <SEO
        title="SNS | 矢田谷充則のソーシャルメディア"
        description="矢田谷充則が発信するYouTube、Instagram、Twitter、LINEの公式アカウントをご紹介。コーチングのヒント、ライフスタイル、日常の気づきを各プラットフォームで発信中。"
        keywords="SNS, ソーシャルメディア, 矢田谷充則, YouTube, Instagram, Twitter, LINE, コーチング, ライフスタイル"
      />
      {/* 背景効果 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[#e53935]/5 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ヒーローセクション */}
        <section className="text-center py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e53935]/20 border border-[#e53935]/50 rounded-full text-[#e53935] text-sm font-bold mb-6">
              <Zap size={16} className="animate-pulse" />
              SNSで毎日情報発信中
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent">
              SNS
            </h1>

            <p className="text-xl sm:text-2xl text-[#d4af37] font-semibold mb-4">
              日々の気づきとコーチングのヒント
            </p>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto jp-text-optimal text-balance">
              {smartBreakJapanese(`各SNSプラットフォームで、コーチングに関する情報や日々の気づき、ライフスタイルについて発信しています`)}
            </p>
          </motion.div>
        </section>

        {/* おすすめプラットフォーム */}
        <section className="mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#d4af37] mb-4">
              まずはここから！
            </h2>
            <p className="text-lg text-gray-300">
              私の人柄や考え方を知りたい方におすすめ
            </p>
          </motion.div>

          {/* YouTube推奨セクション */}
          {snsData
            .filter((sns) => sns.recommended)
            .map((sns, index) => {
              const IconComponent = sns.icon;

              return (
                <motion.div
                  key={sns.platform}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="relative p-8 sm:p-12 bg-gradient-to-br from-[#d4af37]/20 via-[#ffd700]/10 to-[#d4af37]/20 border-2 border-[#d4af37]/60 rounded-3xl backdrop-blur-sm overflow-hidden"
                >
                  {/* 推奨バッジ */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-3 py-1 bg-[#e53935] text-white text-xs font-bold rounded-full">
                      <Star size={12} />
                      おすすめ
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${sns.color}20`,
                            border: `3px solid ${sns.color}`,
                          }}
                        >
                          <IconComponent
                            size={32}
                            style={{ color: sns.color }}
                          />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white">
                            {sns.platform}
                          </h3>
                          <p className="text-[#d4af37] font-medium">
                            {sns.handle}
                          </p>
                        </div>
                      </div>

                      <p className="text-xl text-gray-300 leading-relaxed mb-6 jp-text-optimal">
                        {sns.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {sns.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="text-center">
                            <div className="text-2xl font-bold text-[#d4af37]">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-400">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <motion.a
                        href={sns.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold bg-gradient-to-r from-[#e53935] via-[#d4af37] to-[#ffd700] text-white rounded-full transition-all duration-300 hover:shadow-[0_12px_40px_rgba(229,57,53,0.4)]"
                      >
                        <Play size={20} />
                        チャンネル登録する
                        <ExternalLink size={16} />
                      </motion.a>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-[#d4af37] mb-4">
                        配信内容
                      </h4>
                      {sns.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </section>

        {/* 全プラットフォーム一覧 */}
        <section className="mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#d4af37] mb-4">
              全プラットフォーム
            </h2>
            <p className="text-lg text-gray-300">
              お好みのプラットフォームでフォローしてください
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {snsData
              .sort((a, b) => a.priority - b.priority)
              .map((sns, index) => {
                const IconComponent = sns.icon;

                return (
                  <motion.div
                    key={sns.platform}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                      sns.recommended
                        ? "bg-gradient-to-br from-[#d4af37]/10 to-[#ffd700]/10 border-[#d4af37]/40"
                        : "bg-white/5 border-white/10 hover:border-[#d4af37]/40"
                    }`}
                  >
                    {sns.recommended && (
                      <div className="absolute -top-2 -right-2">
                        <div className="w-6 h-6 bg-[#e53935] rounded-full flex items-center justify-center">
                          <Star size={12} className="text-white" />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${sns.color}20`,
                          border: `2px solid ${sns.color}`,
                        }}
                      >
                        <IconComponent size={24} style={{ color: sns.color }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {sns.platform}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {sns.followers} フォロワー
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-4 text-sm jp-text-optimal">
                      {sns.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-[#d4af37] font-medium">
                        {sns.content}
                      </div>
                      <motion.a
                        href={sns.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#181818] text-sm font-bold rounded-full transition-all duration-300"
                      >
                        フォロー
                        <ExternalLink size={14} />
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </section>

        {/* コンテンツタイプ別紹介 */}
        <section className="mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#d4af37] mb-4">
              配信コンテンツ
            </h2>
            <p className="text-lg text-gray-300">
              プラットフォームごとに異なる内容を発信
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {contentTypes.map((content, index) => {
              const IconComponent = content.icon;

              return (
                <motion.div
                  key={content.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[#d4af37]/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#d4af37]/20 border-2 border-[#d4af37] rounded-full flex items-center justify-center">
                      <IconComponent size={24} className="text-[#d4af37]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {content.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-4 jp-text-optimal">
                    {content.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {content.platforms.map((platform, platformIndex) => (
                      <span
                        key={platformIndex}
                        className="px-3 py-1 bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-xs font-medium rounded-full"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 sm:p-12 bg-gradient-to-br from-[#e53935]/20 via-[#d4af37]/20 to-[#ffd700]/20 border border-[#e53935]/40 rounded-2xl text-center backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#e53935]/10 to-[#ffd700]/10 rounded-2xl blur-xl opacity-50" />

            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold text-[#d4af37] mb-4">
                一緒に成長しませんか？
              </h3>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {smartBreakJapanese(`SNSでの情報発信を通じて、多くの方と繋がり、共に成長していけることを楽しみにしています`)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-[#e53935] via-[#d4af37] to-[#ffd700] text-white rounded-full transition-all duration-300 hover:shadow-[0_12px_40px_rgba(229,57,53,0.4)]"
                >
                  個別相談を申し込む
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ナビゲーションボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-8 sm:py-12">
          <motion.button
            onClick={() => navigate("/main")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 text-lg font-bold bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#181818] rounded-full transition-all duration-300 hover:shadow-[0_8px_32px_rgba(212,175,55,0.4)] mobile-touch-target"
          >
            <Home size={20} />
            HOMEに戻る
          </motion.button>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 text-lg font-bold bg-transparent border-2 border-[#d4af37] text-[#d4af37] rounded-full transition-all duration-300 hover:bg-[#d4af37] hover:text-[#181818] mobile-touch-target"
          >
            <ArrowUp size={20} />
            ページトップへ
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SNSPage;
