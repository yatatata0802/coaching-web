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
  author: string; // 著者名を追加
  punchline?: string; // パンチライン追加
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
      id: "20250723-future-retrieval",
      title:
        "人生は、過去の“延長線”じゃない。──元公安が教える、未来を“力ずくで”奪い取る逆算思考。",
      excerpt:
        "あなたの人生の物語は、どこまで書かれているでしょうか？毎日同じことの繰り返しで、「この先、もう何ページも増えないんじゃないか」と、不安に感じてはいないでしょうか？",
      content: `あなたの人生の物語は、どこまで書かれているでしょうか？
毎日同じことの繰り返しで、**「この先、もう何ページも増えないんじゃないか」**と、不安に感じてはいないでしょうか？
多くの人が、過去の経験を振り返り、その延長線上に、ぼんやりとした未来を描こうとします。
それは、まるで、**「一度買ってしまった脚本だから、仕方なく演じ続ける」**ようなものだと、私は感じています。
しかし、私は断言します。
人生は、あなたの“意思”一つで、全く新しい結末へと書き換えられるのです。
今日は、従来の思考法とは真逆のアプローチ──**未来から現在へと時間を逆行する、『逆算思考』**について、私の経験を交えて語りましょう。
これを知れば、あなたの「ありえない」が、「必然」に変わるかもしれません。

## 過去の延長線上に未来を描く、その“罠”
私たちは、なぜ過去の延長線から抜け出せないのでしょうか？
* 「過去の成功体験」という鎖:
    * 「あの時、こうやったらうまくいったから、今回も同じようにすれば…」
    * その思考は、新しい挑戦や変化を阻みます。過去の成功が、現状維持の居心地の良い“沼”にあなたを引き戻すのです。
* 「過去の失敗」という呪縛:
    * 「どうせ、また失敗するだろう」「私には才能がないから」
    * 過去の失敗体験が、無意識のうちにあなたの行動にブレーキをかけ、新しい可能性の芽を摘んでしまいます。
どちらも、あなたの未来を過去の牢獄に閉じ込める、見えない“鎖”です。
その鎖を断ち切らなければ、あなたはいつまでも、誰かが書いた退屈な脚本を演じ続けることになるでしょう。

## 『逆算思考』の正体──未来のゴールを、現在の「座標」にする
逆算思考とは、シンプルです。
まず、**「あなたが本当に望む、完璧な未来（理想のゴール）」を、詳細に描きます。
そして、その「未来のゴール」を、現在のあなたにとっての「コンフォートゾーン」**にしてしまうのです。
人間は、コンフォートゾーンから外れると、戻ろうとします。
であれば、あなたの「居心地の良い場所」を未来の理想に設定すれば、脳は勝手に、そこへ戻ろうとするモチベーション、つまり「行動力」を生み出し始めるのです。
私が警察官として、特に公安の現場で、**錯綜した情報の中から「真実」を導き出す際、**この「逆算思考」は不可欠なツールでした。
例えば、対象者の「些細な行動記録（いつ、どこで、誰と会ったか）」という、膨大な情報の断片が、毎日手元に集まります。一見、無意味な行動に見えても、**「〇〇という目的を達成するためには、どのような情報が必要で、次にどんな行動が想定されるか」**を未来から逆算し、その断片を精査していくのです。
そうすることで、「あの時のあの行動は、こういう意味があったのか」と、**点が線になり、線が面となり、やがて、相手の「真の目的」と「次の行動」が浮き彫りになる。**この思考法は、あなたの人生においても、目標達成への最適な道筋を見出す力があると、私は確信しています。

## 未来を“力ずくで”奪い取る、3つのステップ
では、この逆算思考を、あなたの人生にどう落とし込むのか。
ステップ1：『完璧な未来』を、五感で味わえ。
* 目標: 誰の真似でもない、あなただけの「理想の未来」を、脳に焼き付ける。
* 行動:
    * 「1年後、あなたはどんな一日を送っていたいか？」
    * 「どんな場所で、誰と、何を話し、どんな感情を味わっていたいか？」
    * 五感をフル活用し、映画のワンシーンのように、詳細に言語化し、紙に書き出してください。写真や絵を貼るのも効果的です。
ステップ2：『最速の逆算ルート』を、一点集中で特定せよ。
* 目標: 理想の未来と、現在のあなたの間に存在する「最も大きな壁」を特定し、それを破壊するための最初の一手を導き出す。
* 行動:
    * ステップ1で描いた理想の未来を、達成するための「大きな中間目標」を3つ設定する。
    * その中間目標を達成するために、「今、この瞬間に、最も効果的な行動は何か？」を逆算する。
    * 多くのことをやろうとしない。**「最もインパクトのある、たった一つの行動」**に焦点を当ててください。
ステップ3：『今日』から、未来を“召喚”しろ。
* 目標: 理想の未来にいる自分を、現在に引き寄せる。
* 行動:
    * ステップ2で特定した「たった一つの行動」を、今日から毎日、必ず実行する。
    * 「モチベーションが上がらないからできない」という言い訳は通用しません。あなたの脳に、「これが新しいコンフォートゾーンだ」と、強制的に覚え込ませるのです。
    * **「理想の未来にいる自分なら、この状況でどう振る舞うか？」**と考え、そのように「演じて」みてください。脳は、その「演技」を、やがて「本物」だと認識し始めます。

最後に：あなたの人生の“脚本”は、白紙だ。
過去の延長線上に、あなたの未来を描くのは、もう終わりにしましょう。
あなたは、その人生の“脚本家”であり、“監督”であり、“主役”なのです。
あなたの人生の「最終章」は、どんな結末ですか？
その結末から逆算した時、あなたは「今日」、何をすべきでしょうか？
さあ、あなたの人生の“舞台”は、もう幕を開けています。
台本を握りしめ、誰の真似でもない、あなただけの“最高の役”を、今日から堂々と演じ抜きましょう。`,
      category: "mindset",
      tags: ["逆算思考", "目標達成", "未来志向", "公安パパ"],
      date: "2025-07-23",
      readTime: "7分",
      views: 0,
      image: "",
      author: "矢田谷充則",
      punchline: "未来を“力ずくで”奪い取る",
    },
    {
      id: "20240613-life-branding",
      title:
        "人生は、あなたが演じる“作品”だ。──元公安が教える、自分という「役」を書き換える思考法。",
      excerpt:
        "こんにちは。元公安パパの人生ブランディング思考、矢田谷充則です。毎日、同じ景色。同じ仕事。同じ会話。",
      category: "lifestyle",
      tags: ["自己紹介", "人生ブランディング", "公安パパ"],
      date: "2025-07-22",
      readTime: "5分",
      views: 0,
      image: "",
      content: `こんにちは。元公安パパの人生ブランディング思考、矢田谷充則です。

毎日、同じ景色。同じ仕事。同じ会話。
「あなたという役者は、この舞台で、このセリフを言うのが“正解”だ。」
あなたは、誰かが決めた「役」を、無意識に演じ続けていませんか？
「与えられた環境だから、仕方ない」
「過去の経験が、自分を決める」
そう言って、舞台袖で指をくわえているだけの人生で、本当に満足ですか？
私は、警察官として、多くの事件現場、そして多くの人生の“舞台”を見てきました。
その経験から断言できます。
人生は、あなたが「演じる」“作品”だ。
そして、その台本も、配役も、演出も、全ては、あなた自身で書き換えられます。

## 現実は、あなたの“前提”が創り出す
現実は、私たちが「どう行動したか」よりも、**「どういう前提で自分を見ているか」**によって大きく左右されます。
例えば、ある人が「自分はダメな人間だ」と思いながら何かに挑戦すると、
その行動は“挑戦”ではなく“無理をしている”と解釈されてしまうかもしれません。
逆に、「私はすでに価値ある存在だ」という前提で同じ行動をすれば、
それは“自己実現の一歩”として認識され、その意味づけは劇的に変わるのです。
警察官として、私は多くの事件現場を見てきました。
同じ状況に直面しても、ある捜査員は「これは無理だ」と諦め、ある捜査員は「必ず解決できる」と信じて行動する。
その結果は、彼らの能力の差だけでなく、心の奥底にある**「前提」**が大きく影響していることを、私は肌で感じてきました。
絶望的な状況でも「自分は必ず犯人を捕まえる」という前提を持つ捜査員は、
粘り強く捜査を続け、奇跡的な突破口を見出すことがありました。
まさに、前提が現実を創り出す瞬間です。

## 脳は、“演じた自分”を“本物”だと認識する
ここで重要な認知科学の知見を紹介しましょう。
脳は、“演じた自分”を“本物”だと認識するという性質です。
これは、心理学でいう「認知的不協和」にもつながります。
言動にズレがあるとき、脳は“整合性”を保とうと、思考や自己認識を、行動に合わせて調整し始めるのです。
つまり、「自信がない」と思っていても、
自信のある人のように振る舞い続けることで、脳は「自分はそういう人間だ」と認識を更新していくのです。
公安警察官として、私は様々な「役」を演じる必要がありました。
ある時は、システムエンジニア。ある時は、サークル活動のメンバー。
（詳しくはここでは言えませんけど）
徹底的に、その人物になりきる。その役の**「口癖」も、「目の動き」も、「呼吸」**さえも、コピーする。
任務を終え、家に帰っても、気づけば、演じていた役の「癖」が抜けなかった経験は、一度や二度ではありません。
シャワーを浴びている時に、無意識に「〇〇（演じていた役の名前）は、どう考えているだろう？」と、もう一人の自分が顔を出すこともありました。
この時、私は確信したのです。
脳は、“演じた自分”を、“本物”だと認識する、と。
だからこそ、私はこう学びました。
「自信がないなら、自信のある人のように振るmいなさい。
勇気がないなら、勇気のある人のように、まず一歩踏み出しなさい。」
あなたが“なりたい自分”を演じ続ければ、脳は必ず、あなたを「本物」へと変えていくでしょう。`,
      author: "矢田谷充則",
      punchline: "脳は、“演じた自分”を“本物”だと認識する",
    },
    // 既存記事（あれば）
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
            className="flex flex-col items-center gap-4 justify-center"
          >
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
                    {/* 記事サムネイル（YouTube風キャッチコピー＋サブコピー＋著者名） */}
                    <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-black to-[#181818] px-4">
                      <span
                        className="text-3xl sm:text-4xl font-extrabold text-white text-center drop-shadow-lg tracking-wide whitespace-pre-line break-words"
                        style={{ WebkitTextStroke: "1px #000" }}
                      >
                        {post.punchline}
                      </span>
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
