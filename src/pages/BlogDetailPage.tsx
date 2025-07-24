import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Eye,
  Tag,
  Heart,
  Share2,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import SEO from "../components/SEO";
import SectionDivider from "../components/SectionDivider";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  views: number;
  likes: number;
  image: string;
  author: string;
  relatedPosts: string[];
  punchline?: string; // パンチライン追加
}

const BlogDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [showShareMenu, setShowShareMenu] = useState(false);

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
      likes: 0,
      image: "",
      author: "矢田谷充則",
      relatedPosts: [],
      punchline: "未来を“力ずくで”奪い取る",
    },
    {
      id: "20240613-life-branding",
      title:
        "人生は、あなたが演じる“作品”だ。──元公安が教える、自分という「役」を書き換える思考法。",
      excerpt:
        "こんにちは。元公安パパの人生ブランディング思考、矢田谷充則です。毎日、同じ景色。同じ仕事。同じ会話。",
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
「自信がないなら、自信のある人のように振る舞いなさい。
勇気がないなら、勇気のある人のように、まず一歩踏み出しなさい。」
あなたが“なりたい自分”を演じ続ければ、脳は必ず、あなたを「本物」へと変えていくでしょう。`,
      category: "lifestyle",
      tags: ["自己紹介", "人生ブランディング", "公安パパ"],
      date: "2025-07-22",
      readTime: "5分",
      views: 0,
      likes: 0,
      image: "",
      author: "矢田谷充則",
      relatedPosts: [],
      punchline: "人生は、あなたが『演じる』“作品”だ。",
    },
    // 既存記事（あれば）
  ];

  // 現在の記事を取得
  const blogPost = blogPosts.find((post) => post.id === id);

  // 記事が見つからない場合
  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#181818] text-white header-safe-padding flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#d4af37] mb-4">
            記事が見つかりませんでした
          </h1>
          <button
            onClick={() => navigate("/blog")}
            className="text-gray-300 hover:text-[#d4af37] transition-colors"
          >
            ブログ一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  // --- 関連記事データとその表示部分をすべて削除 ---

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogPost.title;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "line":
        window.open(
          `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(`${title}\n${url}`);
        alert("リンクをコピーしました！");
        break;
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-2xl sm:text-3xl font-bold text-[#d4af37] mb-4 mt-8"
          >
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-3 mt-6"
          >
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-lg sm:text-xl font-bold text-white mb-2 mt-4"
          >
            {line.substring(4)}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-gray-300 mb-2 ml-4">
            {line.substring(2)}
          </li>
        );
      }
      if (line.startsWith("1. ")) {
        return (
          <li key={index} className="text-gray-300 mb-2 ml-4">
            {line.substring(3)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      if (line.includes("**") && line.includes("**")) {
        const parts = line.split("**");
        return (
          <p key={index} className="text-gray-300 mb-4 leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 0 ? (
                part
              ) : (
                <strong key={i} className="text-[#d4af37]">
                  {part}
                </strong>
              )
            )}
          </p>
        );
      }
      return (
        <p key={index} className="text-gray-300 mb-4 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#181818] text-white header-safe-padding pb-12 sm:pb-16 relative overflow-hidden">
      <SEO
        title={`${blogPost.title} | ブログ | 矢田谷充則`}
        description={blogPost.excerpt}
        keywords={`${blogPost.tags.join(", ")}, ブログ, 矢田谷充則, コーチング`}
      />

      {/* 戻るボタン */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-[#d4af37] hover:text-[#ffd700] transition-colors mb-6"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          ブログ一覧に戻る
        </motion.button>
      </div>

      {/* 記事ヘッダー */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* カテゴリバッジ */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-[#d4af37]/20 text-[#d4af37]">
              {blogPost.category === "coaching" && "🎯 コーチング"}
              {blogPost.category === "mindset" && "🧠 マインドセット"}
              {blogPost.category === "fitness" && "💪 フィットネス"}
              {blogPost.category === "lifestyle" && "🌟 ライフスタイル"}
            </span>
          </div>

          {/* タイトル */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {blogPost.title}
          </h1>

          {/* パンチライン */}
          {blogPost.punchline && (
            <div className="mb-6">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#ffd700] text-center drop-shadow-lg block">
                {blogPost.punchline}
              </span>
            </div>
          )}

          {/* 抜粋 */}
          <p className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed">
            {blogPost.excerpt}
          </p>

          {/* メタ情報 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(blogPost.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{blogPost.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{blogPost.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>by {blogPost.author}</span>
            </div>
          </div>

          {/* タグ */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300"
              >
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>

          {/* いいね・シェアボタン */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isLiked
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-gray-700/50 text-gray-300 border border-gray-600 hover:bg-gray-600/50"
              }`}
            >
              <Heart size={16} className={isLiked ? "fill-current" : ""} />
              <span>{likes}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600 hover:bg-gray-600/50 transition-all duration-300"
              >
                <Share2 size={16} />
                <span>シェア</span>
              </button>

              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg p-2 z-10"
                >
                  <button
                    onClick={() => handleShare("twitter")}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Twitterでシェア
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                  >
                    Facebookでシェア
                  </button>
                  <button
                    onClick={() => handleShare("line")}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                  >
                    LINEでシェア
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                  >
                    リンクをコピー
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      <SectionDivider variant="wave" />

      {/* 記事本文 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="bg-gradient-to-br from-[#181818]/80 to-[#0a0a0a]/90 border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8">
            {renderContent(blogPost.content)}
          </div>
        </motion.div>
      </section>

      <SectionDivider variant="diagonal" />

      {/* CTAセクション */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="p-8 sm:p-12 bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/10 border border-[#d4af37]/40 rounded-2xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d4af37] mb-6">
            もっと深く学びたい方へ
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            記事では語りきれない深い内容や、個別のアドバイスが必要な方は
            <br className="hidden sm:block" />
            LINE特典やnoteの詳細版をご活用ください。
          </p>

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
        </motion.div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
