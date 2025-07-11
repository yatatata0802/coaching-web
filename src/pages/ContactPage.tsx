import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Heart, Shield, Mail } from "lucide-react";
import SEO from "../components/SEO";
import { CONTACT_INFO, ASSURANCES } from "../constants/content";

const ContactPage: React.FC = () => {
  const [isSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white header-safe-padding pb-12 sm:pb-16 px-4 sm:px-6">
      <SEO
        title="お問い合わせ | 矢田谷充則のコーチング相談"
        description="矢田谷充則へのコーチングに関するお問い合わせはこちらから。無料相談の申し込み、サービス内容に関するご質問など、お気軽にご連絡ください。公安警察官経験を活かしたサポート。"
        keywords="お問い合わせ, 無料相談, コーチング相談, 矢田谷充則, 連絡先, 質問, コーチング"
      />
      <div className="max-w-6xl mx-auto">
        {/* ヒーローセクション - スマホ最適化 */}
        <div className="text-center mb-12 sm:mb-16 pt-8 sm:pt-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#d4af37]">
            LINE相談
          </h1>
          <div className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-2">
            あなたの"変わりたい"をここから。
          </div>
          <p className="text-base sm:text-lg text-gray-400 mt-4">
            お問い合わせはLINEでお気軽にどうぞ
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 jp-text-optimal text-balance">
          {/* お問い合わせフォーム - スマホ最適化 */}
          <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-[#d4af37]/20 rounded-2xl hover:border-[#d4af37]/40">
            {isSubmitted ? (
              <motion.div
                className="text-center py-8 sm:py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">✨</div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-4">
                  ありがとうございます！
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  お問い合わせを受け付けました。24時間以内にご返信いたします。
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-6 flex items-center">
                  <Send className="mr-3" size={20} />
                  LINEでお気軽にご相談ください
                </h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#06C755]/20 to-[#32e67f]/10 border border-[#06C755]/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-[#32e67f] mb-4">
                      🎁 LINE特典付きでご相談ください
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      LINEでご相談いただくと、以下の特典をお受け取りいただけます：
                    </p>
                    <ul className="space-y-2 text-gray-300 mb-6">
                      <li className="flex items-center gap-2">
                        <span className="text-[#32e67f]">✓</span>
                        「変わりたい」を「変われる」に変える思考法
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#32e67f]">✓</span>
                        継続力を身につける習慣化のコツ
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#32e67f]">✓</span>
                        心と身体のバランスを整える方法
                      </li>
                    </ul>
                    <button
                      onClick={() =>
                        window.open("https://lin.ee/MX41vXf", "_blank")
                      }
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold bg-[#06C755] text-white rounded-xl hover:bg-[#32e67f] transition-all duration-300 transform hover:scale-105"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
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
                      LINEで相談する（特典付き）
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-400">
                    <p>✓ 無理な勧誘は一切ありません</p>
                    <p>✓ 秘密厳守</p>
                    <p>✓ 24時間以内返信</p>
                  </div>

                  {/* メール相談の代替案 */}
                  <div className="mt-6 p-4 bg-gray-800/50 border border-gray-600 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">
                      LINEをお使いでない方へ
                    </h4>
                    <p className="text-xs text-gray-400 mb-3">
                      メールでのご相談も可能です。お気軽にお問い合わせください。
                    </p>
                    <a
                      href="mailto:igatayatagai@hotmail.com?subject=コーチング相談"
                      className="inline-flex items-center gap-2 text-xs text-[#d4af37] hover:text-[#ffd700] transition-colors"
                    >
                      📧 メールで相談する
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* コンタクト情報 - スマホ最適化 */}
          <div className="space-y-6 sm:space-y-8">
            <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-[#d4af37]/20 rounded-2xl hover:border-[#d4af37]/40">
              <h3 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-4 sm:mb-6">
                お気軽にご連絡ください
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {CONTACT_INFO.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center text-gray-300 text-sm sm:text-base"
                    >
                      <IconComponent
                        className="text-[#d4af37] mr-3 sm:mr-4 flex-shrink-0"
                        size={16}
                      />
                      <span className="jp-text-optimal leading-relaxed">
                        {info.text}
                      </span>
                    </div>
                  );
                })}
                {/* メール連絡先を追加 */}
                <div className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Mail
                    className="text-[#d4af37] mr-3 sm:mr-4 flex-shrink-0"
                    size={16}
                  />
                  <span className="jp-text-optimal leading-relaxed">
                    メール: igatayatagai@hotmail.com
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/20 border border-[#d4af37]/40 rounded-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-[#d4af37] mb-4 sm:mb-6 flex items-center">
                <Shield className="mr-3" size={18} />
                安心してご相談ください
              </h3>
              <div className="space-y-3 sm:space-y-4 text-gray-300">
                {ASSURANCES.map((assurance, index) => (
                  <div key={index} className="flex items-start">
                    <Heart
                      className="text-[#d4af37] mr-3 mt-1 flex-shrink-0"
                      size={12}
                    />
                    <span className="text-sm sm:text-base jp-text-optimal leading-relaxed">
                      {assurance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-[#d4af37]/20 rounded-2xl text-center">
              <h3 className="text-lg sm:text-xl font-bold text-[#d4af37] mb-3 sm:mb-4">
                今すぐ行動を起こしませんか？
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                人生を変える最初の一歩は、LINEでご相談いただくことから始まります。
              </p>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#d4af37]">
                あなたの物語は、まだ途中だ。
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/20 border border-[#d4af37]/40 rounded-2xl text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed jp-text-optimal">
            一人で悩まず、まずは話してみませんか？あなたの"変わりたい"という気持ちを、全力でサポートします。
          </p>
        </div>

        {/* ナビゲーションボタン削除済み。LINE・noteボタンのみ残す */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-8">
          {/* LINE登録ボタン */}
          <button
            onClick={() => window.open("https://lin.ee/MX41vXf", "_blank")}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#06C755] text-white font-bold text-lg sm:text-xl shadow-lg hover:bg-[#32e67f] transition-all duration-300"
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
            ＞＞ 物語の“本編”を読む（note第1話へ）
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
