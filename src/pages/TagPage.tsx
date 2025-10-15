import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag as TagIcon } from "lucide-react";
import SEO from "../components/SEO";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../constants/content";

const TagPage: React.FC = () => {
  const navigate = useNavigate();
  const { tagId } = useParams<{ tagId: string }>();
  const decodedTag = decodeURIComponent(tagId || "");

  const taggedPosts = BLOG_POSTS.filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(decodedTag.toLowerCase())
  );

  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "ブログ", path: "/blog" },
    { name: `タグ: ${decodedTag}`, path: `/tags/${tagId}` },
  ];

  return (
    <div className="min-h-screen header-safe-padding pb-12 sm:pb-16 relative overflow-hidden">
      <SEO
        title={`タグ: ${decodedTag} | ブログ一覧`}
        description={`${decodedTag} に関する記事一覧`}
        keywords={`${decodedTag}, ブログ, 記事一覧`}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-[#d4af37] hover:text-[#ffd700] transition-colors mb-6"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          ブログ一覧に戻る
        </motion.button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            タグ: <span className="text-[#d4af37]">{decodedTag}</span>
          </h1>
          <p className="text-gray-400 mt-2">{taggedPosts.length} 件</p>
        </div>

        {taggedPosts.length === 0 ? (
          <div className="text-center text-gray-400">
            該当する記事が見つかりませんでした。
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {taggedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="bg-gradient-to-br from-[#181818]/80 to-[#0a0a0a]/90 border border-[#d4af37]/30 rounded-2xl overflow-hidden hover:border-[#d4af37]/50 hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-black to-[#181818] px-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white text-center drop-shadow-lg tracking-wide whitespace-pre-line break-words">
                    {post.punchline}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>
                        {new Date(post.date).toLocaleDateString("ja-JP")}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#d4af37]/20 text-[#d4af37]">
                      {
                        BLOG_CATEGORIES.find((cat) => cat.id === post.category)
                          ?.name
                      }
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 antialiased">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <a
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag)}`}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300 hover:bg-gray-600"
                      >
                        <TagIcon size={10} />
                        {tag}
                      </a>
                    ))}
                  </div>

                  <a
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#d4af37] text-[#181818] font-semibold rounded-lg hover:bg-[#ffd700] transition-colors"
                  >
                    記事を読む
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagPage;
