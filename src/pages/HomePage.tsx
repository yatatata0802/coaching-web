import React from "react";
import { motion } from "framer-motion";

const gold = "text-[#d4af37]";
const goldBg = "bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37]";
const red = "text-[#e53935]";
const black = "bg-[#0a0a0a]";

const HomePage: React.FC = () => {
  return (
    <div
      className={`relative min-h-screen w-full ${black} text-white overflow-x-hidden`}
    >
      {/* 星空パーティクル背景 */}
      <div className="starry-bg pointer-events-none absolute inset-0 z-0" />

      {/* 1. ヒーローセクション */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-2 text-2xl sm:text-3xl font-bold tracking-widest text-yellow-300">
            魅セルジブン × 踊ルココロ
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
            style={{
              textShadow: "0 0 40px #e53935,0 0 80px #e53935,0 4px 8px #000",
            }}
          >
            <span className={red}>"このまま"で、本当にいいのか？</span>
          </h1>
          <div className="text-xl sm:text-2xl mb-2 font-semibold">
            "なりたい自分"を夢で終わらせない。
          </div>
          <div className="mt-6 text-lg sm:text-xl font-bold tracking-wide">
            矢田谷充則
          </div>
        </motion.div>
        {/* アンビエントライト */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#d4af37]/20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse z-0" />
      </section>

      {/* 2. My Storyセクション */}
      <section className="relative z-10 max-w-3xl mx-auto py-12 px-4">
        <motion.h2
          className={`text-2xl sm:text-3xl font-bold mb-6 ${gold}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Story
        </motion.h2>
        <motion.div
          className="space-y-6 text-base sm:text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <div className="bg-black/40 rounded-xl p-4 border-l-4 border-[#d4af37]">
            <span className="font-bold">公安警察官としての20年</span>
            。命を預かる現場で、常に自分と向き合い続けた日々。
            <br />
            しかし、心の奥底では「このままでいいのか？」という葛藤が消えなかった。
          </div>
          <div className="bg-black/40 rounded-xl p-4 border-l-4 border-[#ffd700]">
            <span className="font-bold">自己変革とブランディング思考</span>
            。自分を変えるために学び、挑戦し続けた。
            <br />
            「なりたい自分」を明確にし、行動を変えることで人生が動き出した。
          </div>
          <div className="bg-black/40 rounded-xl p-4 border-l-4 border-[#e53935]">
            <span className="font-bold">コーチングへの想い</span>
            。同じように悩む人の力になりたい。
            <br />
            「あなたも変われる」その一歩を、全力でサポートしたい。
          </div>
        </motion.div>
      </section>

      {/* 3. サポート対象セクション */}
      <section className="relative z-10 max-w-3xl mx-auto py-12 px-4">
        <motion.h2
          className={`text-2xl sm:text-3xl font-bold mb-6 ${gold}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          こんな方をサポートします
        </motion.h2>
        <motion.ul
          className="grid gap-6 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <li className="flex items-start gap-3 bg-black/40 rounded-xl p-4 border-l-4 border-[#ffd700]">
            <span className="text-2xl">💡</span>
            <span>
              現状に不満や閉塞感を感じ、「このままじゃダメだ」と悩む方
            </span>
          </li>
          <li className="flex items-start gap-3 bg-black/40 rounded-xl p-4 border-l-4 border-[#d4af37]">
            <span className="text-2xl">🔥</span>
            <span>
              「もっと強くなりたい」「新しい挑戦をしたい」と現状に満足しない方
            </span>
          </li>
          <li className="flex items-start gap-3 bg-black/40 rounded-xl p-4 border-l-4 border-[#e53935]">
            <span className="text-2xl">⏳</span>
            <span>
              モチベーションが続かず、三日坊主で終わってしまうことに悩む方
            </span>
          </li>
          <li className="flex items-start gap-3 bg-black/40 rounded-xl p-4 border-l-4 border-[#ffd700]">
            <span className="text-2xl">🎯</span>
            <span>目標達成のために自己管理能力を磨きたい方</span>
          </li>
        </motion.ul>
      </section>

      {/* 4. サービス内容セクション */}
      <section className="relative z-10 max-w-4xl mx-auto py-12 px-4">
        <motion.h2
          className={`text-2xl sm:text-3xl font-bold mb-6 ${gold}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          サービス内容
        </motion.h2>
        <motion.div
          className="grid gap-8 sm:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <div className="bg-black/40 rounded-xl p-6 flex flex-col items-center border-2 border-[#ffd700]">
            <span className="text-4xl mb-2">🔄</span>
            <div className="font-bold mb-1">行動変容支援</div>
            <div className="text-sm text-gray-300">
              頭では分かっているのに行動できない悩みを解決。小さな一歩から変化をサポート。
            </div>
          </div>
          <div className="bg-black/40 rounded-xl p-6 flex flex-col items-center border-2 border-[#d4af37]">
            <span className="text-4xl mb-2">💪</span>
            <div className="font-bold mb-1">自己管理強化</div>
            <div className="text-sm text-gray-300">
              三日坊主から卒業し、継続する力を身につける。習慣化のコツも伝授。
            </div>
          </div>
          <div className="bg-black/40 rounded-xl p-6 flex flex-col items-center border-2 border-[#e53935]">
            <span className="text-4xl mb-2">🧘‍♂️</span>
            <div className="font-bold mb-1">心と身体のサポート</div>
            <div className="text-sm text-gray-300">
              筋トレや運動の経験を活かし、心身両面から総合的にサポート。
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. メインCTAセクション */}
      <section className="relative z-10 flex flex-col items-center justify-center py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-4 text-lg sm:text-xl font-bold text-yellow-300">
            今月限定{" "}
            <span className="text-2xl text-[#e53935] font-extrabold">
              5名様
            </span>{" "}
            受付中！
          </div>
          <div className="mb-2 text-base sm:text-lg text-gray-200">
            LINE公式アカウント登録で無料セッション特典あり
          </div>
          <a
            href="https://lin.ee/xxxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mt-4 px-10 py-4 rounded-full text-lg sm:text-xl font-bold ${goldBg} text-[#181818] shadow-lg hover:scale-105 transition-transform duration-300 animate-pulse`}
          >
            LINEで無料相談する
          </a>
        </motion.div>
      </section>

      {/* 6. フッター */}
      <footer className="relative z-10 py-8 text-center text-gray-400">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mx-auto block px-6 py-2 rounded-full border border-gray-600 bg-black/40 hover:bg-black/70 text-sm text-white transition-colors"
        >
          トップへ戻る
        </button>
        <div className="mt-4 text-xs">
          &copy; {new Date().getFullYear()} 矢田谷充則 Coaching
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
