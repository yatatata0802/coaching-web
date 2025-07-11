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
}

const BlogDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // 記事データ
  const blogPosts: { [key: string]: BlogPost } = {
    "40s-sos": {
      id: "40s-sos",
      title:
        "40代の「なんか、ヤバい」という焦り。──それは、あなたの魂が助けてくれと叫ぶ、最後のSOSだ。",
      excerpt:
        "40代の焦りは悪魔の囁きでも、単なる年齢のせいでもない。それは、あなたの魂が発している最後のSOSだ。理想の自分と現実の自分との耐え難いズレからくる魂の警告。",
      content: `# 40代の「なんか、ヤバい」という焦り。──それは、あなたの魂が助けてくれと叫ぶ、最後のSOSだ。

もし、あなたが今、心の奥底で小さくても確かな「助けてくれ」の声を感じているなら、よく聞いてほしい。俺もかつて、その声に押し潰されそうだった。

40代――増え続ける責任、刻々と減っていく自由、容赦なく衰え始める身体。鏡に映るのは、無意識に「諦めること」に慣れた男の姿。だが、その焦りは、悪魔の囁きでも、単なる年齢のせいでもない。

それは、あなたの魂が発している、最後のSOSだ。

あなたが感じている「ヤバさ」の正体は、心の奥でずっと演じたかった「理想の自分」と、誰かの期待に縛られてただの「エキストラ」として生きている今の自分との、耐え難いズレからくる魂の警告だ。

あなたは、若い頃こんなことを思わなかったか？
* 「でかいことをやってみたい」
* 「誰かの真似ではなく、自分のスタイルで生きたい」

今はどうだ？
* 「家族のため」と自分に言い訳をし、挑戦から逃げてはいないか？
* 「時間がない」と嘯き、無意味なスマホ操作で夜を潰してはいないか？
* 「波風立てたくない」と、会議で本音を封じ込み、作り笑いを浮かべてはいないか？

そのギャップこそが、あなたの心の中で燃え上がる発火信号だ。

## この信号を無視し続けたら、どうなるか？

小さな火種は、やがて理由もわからぬイライラとなり、部下や家族に向かう怒りという業火となる。

仕事のパフォーマンスは確実に落ち、信頼は音を立てて崩れ、家庭は冷え切る。

そして、最後に残るのは、「俺の人生、こんなはずじゃなかった」――灰と化した後悔だけだ。

## まだ間に合う。処方箋はたった3つ。

だが、この薬を飲むには覚悟がいる。焦りを挑戦のエネルギーに変え、人生を本気で取り戻すなら、今すぐ動け。

### 1. 自分の本音を棚卸せ

* あなたは何を本当に望んでいる？
* 金？名誉？自由？それとも家族の笑顔？
* 綺麗事は要らない。自分の欲望に正直になれ。

### 2. 「人生の脚本」を書き換えろ

* 他人の期待、社会の常識というゴミは、今すぐ破り捨てろ。
* 過去の失敗、コンプレックス、それら全部を「武器」に変えろ。
* 主役はあなただ。最高の逆転劇を書き始めろ。

### 3. 今日できる小さな一歩を踏み出せ

* 壮大な計画は挫折の元。必要なのは具体的な亀裂。
* 腹筋1回、本1ページ、10分早起き。何でもいい、腐りかけた日常に風穴を開けろ。

## 終わりに

40代は「手遅れ」ではない。むしろ、失う痛みを知り、守るべきものの尊さを知った、人生で最も覚悟が決まる年代だ。

その焦りは、あなたを殺す毒にも、突き動かす薬にもなる。

どちらを選ぶかは、全てあなた次第だ。

このブログでは、俺の経験をもとに、焦りを力に変える具体的な戦略と、魂に響く思考法を伝えていく。逃げるな。向き合え。

あなたの人生の脚本を書き換える、最初の一歩を、今ここで踏み出せ。`,
      category: "mindset",
      tags: ["40代", "焦り", "自己実現", "人生設計", "魂の叫び"],
      date: "2024-01-25",
      readTime: "15分",
      views: 2500,
      likes: 42,
      image: "/api/placeholder/800/400",
      author: "矢田谷充則",
      relatedPosts: ["1", "2", "4"],
    },
    "1": {
      id: "1",
      title: "警察官からコーチへ：20年間の経験が教えてくれたこと",
      excerpt:
        "20年間の警察官としての経験を通じて学んだ、人との向き合い方、コミュニケーションの重要性、そして人生の転機について語ります。",
      content: `
# 警察官からコーチへ：20年間の経験が教えてくれたこと

## はじめに

「なぜ警察官からコーチに転身したのか？」

この質問をよく受けます。20年間という長い時間を警察官として過ごし、今度は人を育てるコーチとして活動する。一見すると、全く異なる世界のように見えるかもしれません。

しかし、実際には、警察官としての経験が、今のコーチング活動の基盤となっています。

## 警察官時代に学んだこと

### 1. 人との向き合い方

警察官として働く中で、最も大切だと感じたのは「人との向き合い方」でした。

犯罪の被害者、加害者、目撃者、そして一般市民。様々な立場の人たちと接する中で、共通して大切なのは「相手の立場に立って考えること」でした。

- 被害者の気持ちに寄り添う
- 加害者の背景を理解する
- 目撃者の不安を軽減する
- 一般市民の安全を守る

それぞれの立場で、相手が何を求めているのか、何に困っているのかを理解することが重要でした。

### 2. コミュニケーションの重要性

警察官の仕事は、コミュニケーションの連続でした。

- 事件の聞き取り
- 被害者の心のケア
- 地域住民との関係構築
- 部下の指導

特に印象に残っているのは、事件の被害者との面談です。相手の心の傷に寄り添いながら、必要な情報を聞き出す。これは、まさにコーチングの「傾聴」の技術そのものでした。

### 3. リーダーシップの本質

部下の指導を通じて学んだのは、リーダーシップの本質です。

- 部下の成長を第一に考える
- 失敗を恐れず挑戦を促す
- 一人ひとりの個性を活かす
- チーム全体の目標を明確にする

これらは、今のコーチング活動でも活かされている重要なスキルです。

## 転機となった出来事

### 1. 部下の成長を見守る喜び

警察官として部下を指導する中で、最もやりがいを感じたのは「部下の成長を見守ること」でした。

最初は自信がなく、消極的だった部下が、時間をかけて成長していく。その過程で、自分らしさを見つけ、自信を持って仕事に取り組むようになる。

この変化を見守ることで、私は「人を育てることの喜び」を実感しました。

### 2. 自分の限界を感じた瞬間

しかし、同時に「自分の限界」も感じるようになりました。

警察官としてできることには限界があります。事件の解決や犯罪の防止は重要ですが、それだけでは「人の人生を根本的に変えること」はできません。

もっと深いレベルで人をサポートしたい。そんな思いが強くなっていきました。

### 3. コーチングとの出会い

そんな中で出会ったのが「コーチング」でした。

コーチングは、相手の可能性を信じ、その人が持っている力を引き出すアプローチです。警察官として学んだ「人との向き合い方」と「コミュニケーション技術」が、コーチングで活かせることに気づきました。

## コーチとしての活動

### 1. 警察官経験を活かしたアプローチ

今、コーチとして活動する中で、警察官時代の経験が大きく活かされています。

- **傾聴力**：相手の話を深く聞き、本質的な問題を見抜く
- **共感力**：相手の立場に立ち、感情に寄り添う
- **分析力**：複雑な状況を整理し、解決策を見出す
- **継続力**：長期的な視点で相手の成長をサポートする

### 2. 人を育てることの喜び

コーチとして最もやりがいを感じるのは、クライアントの成長を見守ることです。

- 目標を達成した時の喜び
- 自信を取り戻した時の変化
- 新しい挑戦に踏み出した時の勇気

これらの瞬間に立ち会えることが、何よりの喜びです。

## 20年間の経験が教えてくれたこと

### 1. 人を信じることの大切さ

警察官として様々な人と接する中で学んだのは「人を信じることの大切さ」です。

人は誰でも、良い面と悪い面を持っています。しかし、その人の良い面に焦点を当て、可能性を信じることで、驚くべき成長を見せることがあります。

### 2. 継続することの重要性

20年間という長い時間を一つの組織で過ごすことで学んだのは「継続することの重要性」です。

短期的な成果を求めるのではなく、長期的な視点で物事を考える。これが、今のコーチング活動でも大切にしている考え方です。

### 3. 自分らしさを見つけること

警察官からコーチへの転身を通じて、最も大切だと感じたのは「自分らしさを見つけること」です。

社会の期待に応えるのではなく、自分が本当にやりたいことを見つけ、それに挑戦することの大切さを実感しました。

## 今後のビジョン

### 1. より多くの人をサポートしたい

今後の目標は、より多くの人の成長をサポートすることです。

警察官として学んだ経験と、コーチとして身につけた技術を組み合わせて、一人でも多くの人の人生を変えるお手伝いをしたいと考えています。

### 2. 新しい挑戦を続けたい

40代という年齢を迎えても、新しい挑戦を続けたいと思っています。

筋トレやムエタイ、そしてコーチング。これらは全て、自分で選んだ挑戦です。今後も、新しいことに挑戦し続けたいと思います。

### 3. 家族との時間を大切にしたい

妻と小学1年生の娘との3人暮らし。家族との時間を大切にしながら、仕事とプライベートのバランスを取ることも重要です。

## まとめ

20年間の警察官経験は、私にとってかけがえのない財産です。

人との向き合い方、コミュニケーションの重要性、リーダーシップの本質。これらの経験が、今のコーチング活動の基盤となっています。

そして、この経験を活かして、一人でも多くの人の成長をサポートしたい。それが、私の使命だと考えています。

あなたも、自分の経験を活かして、新しい挑戦をしてみませんか？

---

*この記事が役に立ったと思ったら、ぜひシェアしてください。そして、LINE公式アカウントに登録して、より深い洞察を受け取ってください。*
    `,
      category: "coaching",
      tags: [
        "キャリア転換",
        "経験談",
        "コミュニケーション",
        "人生設計",
        "リーダーシップ",
      ],
      date: "2024-01-20",
      readTime: "10分",
      views: 1850,
      likes: 42,
      image: "/api/placeholder/800/400",
      author: "矢田谷充則",
      relatedPosts: ["40s-sos", "2", "4"],
    },
  };

  // 現在の記事を取得
  const blogPost = blogPosts[id || "1"];

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

  // 関連記事データ
  const relatedPosts = [
    {
      id: "2",
      title: "空手からブレイクダンスへ：自分を生きる勇気の見つけ方",
      excerpt:
        "幼少期から続けた空手をやめて、ブレイクダンスに転向した経験。自分らしさを見つけるまでの葛藤と成長の物語。",
      category: "mindset",
      date: "2024-01-18",
      readTime: "8分",
      views: 1420,
    },
    {
      id: "4",
      title: "部下指導で学んだ、人を育てるコツ",
      excerpt:
        "警察官時代の部下指導経験から学んだ、人を育てるためのコミュニケーション技術とリーダーシップの本質。",
      category: "coaching",
      date: "2024-01-12",
      readTime: "9分",
      views: 1680,
    },
    {
      id: "6",
      title: "コーチングで最も大切なのは「聴く力」",
      excerpt:
        "コーチとして活動する中で気づいた、本当に相手の成長をサポートするために必要な「聴く力」の重要性と実践方法。",
      category: "coaching",
      date: "2024-01-08",
      readTime: "6分",
      views: 980,
    },
  ];

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

      {/* 関連記事 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#d4af37] mb-6">
            関連記事
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-[#181818]/80 to-[#0a0a0a]/90 border border-[#d4af37]/30 rounded-xl p-4 hover:border-[#d4af37]/50 hover:scale-105 transition-all duration-300"
              >
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#d4af37]/20 text-[#d4af37]">
                    {post.category === "coaching" && "🎯 コーチング"}
                    {post.category === "mindset" && "🧠 マインドセット"}
                    {post.category === "fitness" && "💪 フィットネス"}
                    {post.category === "lifestyle" && "🌟 ライフスタイル"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <SectionDivider variant="wave" flip />

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
      </section>
    </div>
  );
};

export default BlogDetailPage;
