import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Calendar, Tag, Eye, Clock } from "lucide-react";
import SEO from "../components/SEO";
import SectionDivider from "../components/SectionDivider";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  views: number;
  image: string;
  content: string; // 独自ブログ用のコンテンツ
  noteUrl?: string; // noteへの誘導URL（オプション）
}

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"views" | "date" | "title">("views"); // 人気順をデフォルトに

  // カテゴリデータ
  const categories = [
    {
      id: "all",
      name: "すべて",
      description: "すべての記事",
      color: "#d4af37",
      emoji: "📚",
    },
    {
      id: "coaching",
      name: "コーチング",
      description: "コーチングの考え方と実践",
      color: "#e53935",
      emoji: "🎯",
    },
    {
      id: "mindset",
      name: "マインドセット",
      description: "思考の転換と自己理解",
      color: "#4caf50",
      emoji: "🧠",
    },
    {
      id: "fitness",
      name: "フィットネス",
      description: "筋トレと健康管理",
      color: "#2196f3",
      emoji: "💪",
    },
    {
      id: "lifestyle",
      name: "ライフスタイル",
      description: "日常の改善と習慣",
      color: "#9c27b0",
      emoji: "🌟",
    },
  ];

  // サンプル記事データ（独自ブログ用）
  const blogPosts: BlogPost[] = [
    {
      id: "40s-sos",
      title:
        "40代の「なんか、ヤバい」という焦り。──それは、あなたの魂が助けてくれと叫ぶ、最後のSOSだ。",
      excerpt:
        "40代の焦りは悪魔の囁きでも、単なる年齢のせいでもない。それは、あなたの魂が発している最後のSOSだ。理想の自分と現実の自分との耐え難いズレからくる魂の警告。",
      category: "mindset",
      tags: ["40代", "焦り", "自己実現", "人生設計", "魂の叫び"],
      date: "2024-01-25",
      readTime: "15分",
      views: 2500,
      image: "/api/placeholder/400/250",
      content:
        "40代の「なんか、ヤバい」という焦り。──それは、あなたの魂が助けてくれと叫ぶ、最後のSOSだ。\n\nもし、あなたが今、心の奥底で小さくても確かな「助けてくれ」の声を感じているなら、よく聞いてほしい。俺もかつて、その声に押し潰されそうだった。\n\n40代――増え続ける責任、刻々と減っていく自由、容赦なく衰え始める身体。鏡に映るのは、無意識に「諦めること」に慣れた男の姿。だが、その焦りは、悪魔の囁きでも、単なる年齢のせいでもない。\n\nそれは、あなたの魂が発している、最後のSOSだ。\n\nあなたが感じている「ヤバさ」の正体は、心の奥でずっと演じたかった「理想の自分」と、誰かの期待に縛られてただの「エキストラ」として生きている今の自分との、耐え難いズレからくる魂の警告だ。\n\nあなたは、若い頃こんなことを思わなかったか？\n* 「でかいことをやってみたい」\n* 「誰かの真似ではなく、自分のスタイルで生きたい」\n今はどうだ？\n* 「家族のため」と自分に言い訳をし、挑戦から逃げてはいないか？\n* 「時間がない」と嘯き、無意味なスマホ操作で夜を潰してはいないか？\n* 「波風立てたくない」と、会議で本音を封じ込み、作り笑いを浮かべてはいないか？\nそのギャップこそが、あなたの心の中で燃え上がる発火信号だ。\n\nこの信号を無視し続けたら、どうなるか？\n小さな火種は、やがて理由もわからぬイライラとなり、部下や家族に向かう怒りという業火となる。\n仕事のパフォーマンスは確実に落ち、信頼は音を立てて崩れ、家庭は冷え切る。\nそして、最後に残るのは、「俺の人生、こんなはずじゃなかった」――灰と化した後悔だけだ。\n\nまだ間に合う。処方箋はたった3つ。\nだが、この薬を飲むには覚悟がいる。焦りを挑戦のエネルギーに変え、人生を本気で取り戻すなら、今すぐ動け。\n\n1. 自分の本音を棚卸せ\n* あなたは何を本当に望んでいる？\n* 金？名誉？自由？それとも家族の笑顔？\n* 綺麗事は要らない。自分の欲望に正直になれ。\n\n2. 「人生の脚本」を書き換えろ\n* 他人の期待、社会の常識というゴミは、今すぐ破り捨てろ。\n* 過去の失敗、コンプレックス、それら全部を「武器」に変えろ。\n* 主役はあなただ。最高の逆転劇を書き始めろ。\n\n3. 今日できる小さな一歩を踏み出せ\n* 壮大な計画は挫折の元。必要なのは具体的な亀裂。\n* 腹筋1回、本1ページ、10分早起き。何でもいい、腐りかけた日常に風穴を開けろ。\n\n終わりに\n40代は「手遅れ」ではない。むしろ、失う痛みを知り、守るべきものの尊さを知った、人生で最も覚悟が決まる年代だ。\nその焦りは、あなたを殺す毒にも、突き動かす薬にもなる。\nどちらを選ぶかは、全てあなた次第だ。\n\nこのブログでは、俺の経験をもとに、焦りを力に変える具体的な戦略と、魂に響く思考法を伝えていく。逃げるな。向き合え。\nあなたの人生の脚本を書き換える、最初の一歩を、今ここで踏み出せ。",
      noteUrl: "https://note.com/YOUR_NOTE_ID/n/40s-sos",
    },
    {
      id: "1",
      title: "警察官からコーチへ：20年間の経験が教えてくれたこと",
      excerpt:
        "20年間の警察官としての経験を通じて学んだ、人との向き合い方、コミュニケーションの重要性、そして人生の転機について語ります。",
      category: "coaching",
      tags: ["キャリア転換", "経験談", "コミュニケーション", "人生設計"],
      date: "2024-01-20",
      readTime: "10分",
      views: 1850,
      image: "/api/placeholder/400/250",
      content: "ここに記事の内容が入ります...",
      noteUrl: "https://note.com/YOUR_NOTE_ID/n/n1",
    },
    {
      id: "2",
      title: "空手からブレイクダンスへ：自分を生きる勇気の見つけ方",
      excerpt:
        "幼少期から続けた空手をやめて、ブレイクダンスに転向した経験。自分らしさを見つけるまでの葛藤と成長の物語。",
      category: "mindset",
      tags: ["自己発見", "勇気", "成長", "自己実現"],
      date: "2024-01-18",
      readTime: "8分",
      views: 1420,
      image: "/api/placeholder/400/250",
      content: "ここに記事の内容が入ります...",
      noteUrl: "https://note.com/YOUR_NOTE_ID/n/n2",
    },
    {
      id: "3",
      title: "フィジーク大会出場で学んだ、目標達成の真実",
      excerpt:
        "筋トレとムエタイを組み合わせたフィジーク大会への挑戦。見た目の変化だけでなく、メンタル面での成長について。",
      category: "fitness",
      tags: ["フィジーク", "筋トレ", "ムエタイ", "目標達成", "メンタル"],
      date: "2024-01-15",
      readTime: "12分",
      views: 2100,
      image: "/api/placeholder/400/250",
      content: "ここに記事の内容が入ります...",
      noteUrl: "https://note.com/YOUR_NOTE_ID/n/n3",
    },
    {
      id: "4",
      title: "部下指導で学んだ、人を育てるコツ",
      excerpt:
        "警察官時代の部下指導経験から学んだ、人を育てるためのコミュニケーション技術とリーダーシップの本質。",
      category: "coaching",
      tags: ["リーダーシップ", "部下指導", "コミュニケーション", "人材育成"],
      date: "2024-01-12",
      readTime: "9分",
      views: 1680,
      image: "/api/placeholder/400/250",
      content: "ここに記事の内容が入ります...",
      noteUrl: "https://note.com/YOUR_NOTE_ID/n/n4",
    },
    {
      id: "5",
      title: "家族と仕事の両立：3人暮らしで実践している時間管理術",
      excerpt:
        "妻と小学1年生の娘との3人暮らし。仕事と家族の時間を両立させるための実践的な時間管理の方法を紹介。",
      category: "lifestyle",
      tags: ["時間管理", "家族", "ワークライフバランス", "子育て"],
      date: "2024-01-10",
      readTime: "7分",
      views: 1350,
      image: "/api/placeholder/400/250",
      content: "ここに記事の内容が入ります...",
      noteUrl: "https://note.com/YOUR_NOTE_ID/n/n5",
    },
    {
      id: "6",
      title: "コーチングで最も大切なのは「聴く力」",
      excerpt:
        "コーチとして活動する中で気づいた、本当に相手の成長をサポートするために必要な「聴く力」の重要性と実践方法。",
      category: "coaching",
      tags: ["コーチング", "傾聴", "コミュニケーション", "成長支援"],
      date: "2024-01-08",
      readTime: "6分",
      views: 980,
      image: "/api/placeholder/400/250",
      content: "ここに記事の内容が入ります...",
      noteUrl: "https://note.com/YOUR_NOTE_ID/n/n6",
    },
    {
      id: "7",
      title: "美容と健康オタクが実践する、40代からの体づくり",
      excerpt:
        "美容と健康にこだわる40代男性として、実践している食事法、運動法、そしてメンタルケアの方法を公開。",
      category: "fitness",
      tags: ["美容", "健康", "40代", "アンチエイジング", "食事"],
      date: "2024-01-05",
      readTime: "11分",
      views: 1950,
      image: "/api/placeholder/400/250",
      content: "ここに記事の内容が入ります...",
      noteUrl: "https://note.com/YOUR_NOTE_ID/n/n7",
    },
    {
      id: "8",
      title: "ゲームから学んだ、目標達成のマインドセット",
      excerpt:
        "趣味のゲームを通じて学んだ、目標設定、継続力、そして挫折からの立ち直り方について語ります。",
      category: "mindset",
      tags: ["ゲーム", "マインドセット", "目標達成", "継続力", "挫折"],
      date: "2024-01-03",
      readTime: "8分",
      views: 1120,
      image: "/api/placeholder/400/250",
      content: "ここに記事の内容が入ります...",
      noteUrl: "https://note.com/YOUR_NOTE_ID/n/n8",
    },
  ];

  // フィルタリングとソート
  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "views":
          return b.views - a.views;
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return b.views - a.views; // デフォルトは人気順
      }
    });

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#181818] text-white header-safe-padding pb-12 sm:pb-16 relative overflow-hidden">
      <SEO
        title="ブログ | 矢田谷充則のコーチング記事"
        description="矢田谷充則が執筆するコーチング、マインドセット、フィットネス、ライフスタイルに関する記事。あなたの「変わりたい」をサポートする実践的な内容をお届けします。"
        keywords="ブログ, コーチング記事, マインドセット, フィットネス, ライフスタイル, 矢田谷充則, 習慣化, 目標達成, 自己改善"
      />

      {/* ファーストビュー - シンプルな紹介文 + CTAバナー */}
      <section className="text-center py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent drop-shadow-lg">
            BLOG
          </h1>

          {/* シンプルな紹介文 */}
          <div className="mb-8">
            <p className="text-xl sm:text-2xl text-[#d4af37] font-semibold mb-2 drop-shadow">
              🔥 人生を変える第一歩は、1記事から。
            </p>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              あなたの「変わりたい」をサポートする実践的な記事をお届けします。
            </p>
          </div>

          {/* CTAバナー固定表示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-r from-[#d4af37]/20 to-[#ffd700]/10 border-2 border-[#d4af37]/40 rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-[#d4af37] font-bold text-lg">
                📩【無料】LINE登録で"限定PDF"プレゼント中
              </div>
              <button
                onClick={() => window.open("https://lin.ee/MX41vXf", "_blank")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#06C755] text-white font-bold shadow-lg hover:bg-[#32e67f] transition-all duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
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
                LINE登録
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider variant="wave" />

      {/* カテゴリフィルター - 横スクロール形式 */}
      <section className="py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-4 text-center">
              カテゴリから探す
            </h2>

            {/* 横スクロール可能なカテゴリボタン */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "border-[#d4af37] bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/10 text-[#d4af37] font-bold"
                      : "border-[#d4af37]/30 bg-gradient-to-br from-[#181818]/80 to-[#0a0a0a]/90 hover:border-[#d4af37]/50 text-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{category.emoji}</span>
                  <span className="font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 検索とソート */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            {/* 検索バー */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#d4af37]/30 rounded-xl text-white placeholder-gray-400 focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
              />
            </div>

            {/* ソート選択 */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "views" | "date" | "title")
              }
              className="px-4 py-3 bg-white/10 border border-[#d4af37]/30 rounded-xl text-white focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
            >
              <option value="views">人気順</option>
              <option value="date">最新順</option>
              <option value="title">タイトル順</option>
            </select>
          </motion.div>
        </div>
      </section>

      {/* 記事一覧 */}
      <section className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentCategory && selectedCategory !== "all" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-center"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-2">
                {currentCategory.emoji} {currentCategory.name}
              </h3>
              <p className="text-gray-300">{currentCategory.description}</p>
            </motion.div>
          )}

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">
                該当する記事が見つかりませんでした。
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="bg-gradient-to-br from-[#181818]/80 to-[#0a0a0a]/90 border border-[#d4af37]/30 rounded-2xl overflow-hidden hover:border-[#d4af37]/50 hover:scale-105 transition-all duration-300"
                  >
                    {/* 記事画像 */}
                    <div className="aspect-video bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/10 flex items-center justify-center relative">
                      <div className="text-4xl">
                        {
                          categories.find((cat) => cat.id === post.category)
                            ?.emoji
                        }
                      </div>

                      {/* 読了時間バッジ */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white">
                        <Clock size={10} />
                        {post.readTime}
                      </div>
                    </div>

                    {/* 記事内容 */}
                    <div className="p-6">
                      {/* メタ情報 */}
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>
                            {new Date(post.date).toLocaleDateString("ja-JP")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* カテゴリバッジ */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#d4af37]/20 text-[#d4af37]">
                          {
                            categories.find((cat) => cat.id === post.category)
                              ?.name
                          }
                        </span>
                      </div>

                      {/* タイトル */}
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* 抜粋 */}
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* タグ */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 記事を読むボタン */}
                      <a
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#d4af37] text-[#181818] font-semibold rounded-lg hover:bg-[#ffd700] transition-colors"
                      >
                        記事を読む
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <SectionDivider variant="diagonal" />

      {/* CTAセクション */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 sm:p-12 bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/10 border border-[#d4af37]/40 rounded-2xl"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d4af37] mb-6">
              もっと深く学びたい方へ
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              記事では語りきれない深い内容や、個別のアドバイスが必要な方は
              <br className="hidden sm:block" />
              LINE特典やnoteの詳細版をご活用ください。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* LINE登録ボタン */}
              <button
                onClick={() => window.open("https://lin.ee/MX41vXf", "_blank")}
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

              {/* note誘導ボタン */}
              <a
                href="https://note.com/YOUR_NOTE_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-[#181818] to-[#333] text-[#ffd700] font-semibold text-base sm:text-lg shadow-md border-2 border-[#d4af37] hover:bg-[#222] hover:text-[#fff] transition-all duration-300 text-center"
                style={{ minWidth: 200 }}
              >
                ＞＞ 物語の"本編"を読む（note第1話へ）
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
