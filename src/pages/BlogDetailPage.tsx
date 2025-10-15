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
import { BLOG_POSTS } from "../constants/content";

const BlogDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // 現在の記事を取得
  const blogPost = BLOG_POSTS.find((post) => post.id === id);

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

  // パンくずリストのデータを生成
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "ブログ", path: "/blog" },
    { name: blogPost.title, path: `/blog/${blogPost.id}` },
  ];

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
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listType: "ul" | "ol" | null = null;

    const processList = () => {
      if (currentList.length > 0) {
        if (listType === "ul") {
          elements.push(
            <ul
              key={`ul-${elements.length}`}
              className="list-disc list-inside text-gray-300 mb-4 leading-relaxed"
            >
              {currentList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          );
        } else if (listType === "ol") {
          elements.push(
            <ol
              key={`ol-${elements.length}`}
              className="list-decimal list-inside text-gray-300 mb-4 leading-relaxed"
            >
              {currentList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      if (line.startsWith("# ")) {
        processList();
        elements.push(
          <h1
            key={index}
            className="text-2xl sm:text-3xl font-bold text-[#d4af37] mb-4 mt-8"
          >
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        processList();
        elements.push(
          <h2
            key={index}
            className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-3 mt-6"
          >
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        processList();
        elements.push(
          <h3
            key={index}
            className="text-lg sm:text-xl font-bold text-white mb-2 mt-4"
          >
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        if (listType === "ol") processList(); // リストタイプが変わったら前のリストを処理
        listType = "ul";
        currentList.push(line.substring(2));
      } else if (line.match(/^\d+\. /)) {
        if (listType === "ul") processList(); // リストタイプが変わったら前のリストを処理
        listType = "ol";
        currentList.push(line.substring(line.indexOf(". ") + 2));
      } else if (line.trim() === "") {
        processList();
        elements.push(<br key={index} />);
      } else {
        processList();
        const parts = line.split(/(\*\*[^*]+\*\*)/g); // **で囲まれた部分を分割
        elements.push(
          <p key={index} className="text-gray-300 mb-4 leading-relaxed">
            {parts.map((part, i) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={i} className="text-[#d4af37]">
                  {part.substring(2, part.length - 2)}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
    });

    processList(); // 最後に残ったリストを処理

    return elements;
  };

  return (
    <div className="min-h-screen header-safe-padding pb-12 sm:pb-16 relative overflow-hidden">
      <SEO
        title={`${blogPost.title} | ブログ`}
        description={blogPost.excerpt}
        keywords={blogPost.tags.join(", ")}
        type="article"
        blogPost={blogPost}
        breadcrumbs={breadcrumbs}
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight antialiased">
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
              <a
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                <Tag size={14} />
                {tag}
              </a>
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
            {renderContent(
              `大阪・京橋の自己実現コーチ、矢田谷充則です。認知科学に基づくコーチングで、行動が続く仕組みを一緒に作ります。\n\n${blogPost.content}`
            )}
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
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#06C755] text-white font-bold text-lg sm:text-xl shadow-lg hover:bg-[#32e67f] transition-all duration-300 transform hover:scale-105 mx-auto"
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
            href="https://note.com/coach_yatagai"
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
