import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Calendar, Tag } from "lucide-react";
import SEO from "../components/SEO";
import SectionDivider from "../components/SectionDivider";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../constants/content";

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title">("date"); // 最新順をデフォルトに

  // フィルタリングとソート
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime(); // デフォルトは最新順
    }
  });

  const currentCategory = BLOG_CATEGORIES.find(
    (cat) => cat.id === selectedCategory
  );

  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "ブログ", path: "/blog" },
  ];

  return (
    <div className="min-h-screen header-safe-padding pb-12 sm:pb-16 relative overflow-hidden">
      <SEO
        title="ブログ | 矢田谷充則のコーチング記事"
        description="矢田谷充則が執筆するコーチング、マインドセット、フィットネス、ライフスタイルに関する記事。あなたの「変わりたい」をサポートする実践的な内容をお届けします。"
        keywords="ブログ, コーチング記事, マインドセット, フィットネス, ライフスタイル, 矢田谷充則, 習慣化, 目標達成, 自己改善"
        breadcrumbs={breadcrumbs}
      />

      {/* ファーストビュー - シンプルな紹介文 + CTAバナー */}
      <section className="text-center py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent drop-shadow-lg antialiased">
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
              {BLOG_CATEGORIES.map((category) => (
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
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#d4af37] font-medium">
                並び順
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "title")}
                className="px-4 py-3 bg-white/10 border border-[#d4af37]/30 rounded-xl text-white focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
              >
                <option value="date">最新順</option>
                <option value="title">タイトル順</option>
              </select>
            </div>
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
                      <span className="text-3xl sm:text-4xl font-extrabold text-white text-center drop-shadow-lg tracking-wide whitespace-pre-line break-words">
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
                      </div>

                      {/* カテゴリバッジ */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#d4af37]/20 text-[#d4af37]">
                          {
                            BLOG_CATEGORIES.find(
                              (cat) => cat.id === post.category
                            )?.name
                          }
                        </span>
                      </div>

                      {/* タイトル */}
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 antialiased">
                        {post.title}
                      </h3>

                      {/* 抜粋 */}
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* タグ */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <a
                            key={tag}
                            href={`/tags/${encodeURIComponent(tag)}`}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300 hover:bg-gray-600"
                          >
                            <Tag size={10} />
                            {tag}
                          </a>
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
                LINEで特典を受け取る
              </button>

              {/* note誘導ボタン */}
              <a
                href="https://note.com/yatagai_coaching"
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
