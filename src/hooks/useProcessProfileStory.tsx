import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProfileStoryItem } from '../types';
import VisualGuide from '../components/ui/VisualGuide';

// このフックは、プロフィールページのストーリーコンテンツを処理し、
// 表示可能なReact要素の配列に変換します。
export const useProcessProfileStory = (storyContent: ProfileStoryItem[]) => {
  // テキスト内の特定の単語をハイライトする関数（正規表現で最適化）
  const highlightText = (text: string) => {
    const highlightWords = ['覚悟', '地獄', '自由'];
    if (!highlightWords.length) return text;

    const regex = new RegExp(`(${highlightWords.join('|')})`, 'g');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      highlightWords.includes(part) ? (
        <span key={index} className="font-bold text-[#e53935]">
          {part}
        </span>
      ) : (
        part
      )
    );  };

  // コンテンツを解析してReact要素を生成（可読性向上のためreduceを使用）
  const processedContent = useMemo(() => {
    const blocks = storyContent.reduce<JSX.Element[][]>((acc, item, i) => {
      let element: JSX.Element | null = null;

      switch (item.type) {
        case 'heading':
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

        case 'paragraph':          element = (            <motion.div key={i}> {/* Added a key to this wrapper div */}              {item.content.split('\n\n').map((paragraph, pIndex) => (                <motion.p                  key={`${i}-${pIndex}`}                  className="text-sm text-left mb-4"                  initial={{ opacity: 0, y: 20 }}                  whileInView={{ opacity: 1, y: 0 }}                  transition={{ duration: 0.7, delay: 0.2 + pIndex * 0.1 }}                  viewport={{ once: true }}                >                  {highlightText(paragraph)}                </motion.p>              ))}            </motion.div>          );          break;

        case 'question':
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
      }

      if (element) {
        if (item.type === 'heading' || acc.length === 0) {
          acc.push([element]);
        } else {
          acc[acc.length - 1].push(element);
        }
      }

      return acc;
    }, []);

    return blocks.map((block, idx) => (
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
    ));
  }, [storyContent]);

  return processedContent;
};
