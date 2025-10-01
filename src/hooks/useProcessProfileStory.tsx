import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileStoryItem } from "../types";
import VisualGuide from "../components/ui/VisualGuide";
import { X } from "lucide-react";

// このフックは、プロフィールページのストーリーコンテンツを処理し、
// 表示可能なReact要素の配列に変換します。
export const useProcessProfileStory = (storyContent: ProfileStoryItem[]) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  // テキスト内の特定の単語をハイライトする関数（正規表現で最適化）
  const highlightText = (text: string) => {
    const highlightWords = ["覚悟", "地獄", "自由"];
    if (!highlightWords.length) return text;

    const regex = new RegExp(`(${highlightWords.join("|")})`, "g");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      highlightWords.includes(part) ? (
        <span key={index} className="font-bold text-[#e53935]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // コンテンツを解析してReact要素を生成（可読性向上のためreduceを使用）
  const processedContent = useMemo(() => {
    const blocks = storyContent.reduce<JSX.Element[][]>((acc, item, i) => {
      let element: JSX.Element | null = null;

      switch (item.type) {
        case "heading":
          element = (
            <motion.h3
              key={i}
              className="text-lg sm:text-xl md:text-2xl font-bold text-[#d4af37] mt-2 mb-4 leading-normal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {item.content}
            </motion.h3>
          );
          break;

        case "paragraph":
          element = (
            <motion.div key={i}>
              {" "}
              {/* Added a key to this wrapper div */}{" "}
              {item.content.split("\n\n").map((paragraph, pIndex) => (
                <motion.p
                  key={`${i}-${pIndex}`}
                  className="text-sm text-left mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 + pIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  {" "}
                  {highlightText(paragraph)}{" "}
                </motion.p>
              ))}{" "}
            </motion.div>
          );
          break;

        case "question":
          element = (
            <motion.p
              key={i}
              className="text-base font-bold text-[#e53935] mt-6 mb-2 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {item.content}
            </motion.p>
          );
          break;

        case "image":
          element = (
            <motion.div
              key={i}
              className="flex flex-col items-center my-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.img
                src={item.src}
                alt={item.alt}
                className="w-48 h-60 object-cover rounded-lg shadow-lg border-2 border-[#d4af37] cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => {
                  setModalImage({
                    src: item.src || "",
                    alt: item.alt || "",
                    caption: item.caption,
                  });
                  setIsImageModalOpen(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              {item.caption && (
                <p className="text-sm text-gray-300 mt-2 text-center italic">
                  {item.caption}
                </p>
              )}
            </motion.div>
          );
          break;
      }

      if (element) {
        if (item.type === "heading" || acc.length === 0) {
          acc.push([element]);
        } else {
          acc[acc.length - 1].push(element);
        }
      }

      return acc;
    }, []);

    return (
      <>
        {blocks.map((block, idx) => (
          <VisualGuide type="glow-border" key={idx}>
            <motion.div
              className="mb-8 p-6 sm:p-8 bg-gradient-to-br from-[#d4af37]/10 via-[#181818]/60 to-[#ffd700]/10 border-2 border-[#d4af37]/40 rounded-2xl shadow-[0_8px_32px_rgba(212,175,55,0.10)] transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {block}
            </motion.div>
          </VisualGuide>
        ))}

        {/* Image Modal */}
        <AnimatePresence>
          {isImageModalOpen && modalImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsImageModalOpen(false)}
            >
              <motion.div
                className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={modalImage.src}
                  alt={modalImage.alt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                {modalImage.caption && (
                  <p className="absolute bottom-20 left-4 right-4 text-white text-center bg-black bg-opacity-50 p-2 rounded">
                    {modalImage.caption}
                  </p>
                )}
                <motion.button
                  onClick={() => setIsImageModalOpen(false)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#e53935] bg-opacity-90 text-white p-3 rounded-full hover:bg-opacity-100 transition-all duration-200 z-[10000] shadow-lg border-2 border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="閉じる"
                >
                  <X size={24} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }, [storyContent, isImageModalOpen, modalImage]);

  return processedContent;
};
