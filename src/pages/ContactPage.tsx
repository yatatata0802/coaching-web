import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import SEO from "../components/SEO";
import { CONTACT_INFO, ASSURANCES } from "../constants/content";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] py-16 px-4 mt-20">
      <SEO
        title="お問い合わせ・お申込み"
        description="コーチングサービスのお問い合わせ・お申込みはこちらから。"
      />
      <h1 className="text-3xl sm:text-4xl font-bold text-[#d4af37] mb-8 text-center">
        お問い合わせ・お申込み
      </h1>

      <div className="max-w-2xl mx-auto text-center mb-3">
        <div className="bg-[#1a1a1a] border border-[#d4af37] rounded-xl p-6 mb-4">
          <h2 className="text-xl font-semibold text-[#d4af37] mb-3">
            安心・安全な環境でお話しください
          </h2>
          <p className="text-gray-200 mb-3">
            元公安として培った厳格な守秘義務の精神で、
            <br />
            お客様のプライバシーと機密情報を徹底的に保護いたします
          </p>
          <p className="text-gray-300 text-sm">
            お話しいただいた内容は一切外部に漏れることなく、
            <br />
            完全に機密として取り扱います
          </p>
        </div>

        <p className="text-lg text-gray-200 mb-2">
          コーチングサービスへのお申込み・無料相談・お問い合わせは、
          <br className="hidden sm:block" />
          下記のGoogleフォームまたはLINEよりお願いいたします。
        </p>
      </div>

      

      <div className="flex flex-col items-center gap-3 justify-center mt-2 mb-0">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScoWlJM_N0VxRsQr0AkX6sqysjT0Gec9GS7Erp2J2IqP8FsOQ/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#181818] font-bold rounded-xl shadow-lg hover:from-[#ffd700] hover:to-[#d4af37] transition-all duration-300"
        >
          Googleフォームで申し込む
        </a>
        <a
          href="https://lin.ee/MX41vXf"
          target="_blank"
          rel="noopener noreferrer"
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
        </a>
      </div>

      {/* 安心保証セクション */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl p-6 sm:p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-[#d4af37] mb-6 text-center">
            安心のサポート体制
          </h2>
          <ul className="space-y-4">
            {ASSURANCES.map((assurance, index) => (
              <li key={index} className="flex items-start gap-4">
                <CheckCircle size={24} className="text-[#d4af37] flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-200">{assurance}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;