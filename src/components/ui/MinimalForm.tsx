import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail } from "lucide-react";
import emailjs from "emailjs-com";

interface MinimalFormProps {
  onSubmit: (data: { name: string; email: string; plan?: string }) => void;
  isLoading?: boolean;
  className?: string;
  plan?: string;
}

const SERVICE_ID = "service_8hhbscd";
const TEMPLATE_ID = "template_ofy89gu";
const USER_ID = "UthPJAMxl3DmjD2IG";

const MinimalForm: React.FC<MinimalFormProps> = ({
  onSubmit,
  isLoading = false,
  className = "",
  plan = "",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: plan || "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, plan: plan || "" }));
  }, [plan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          plan: formData.plan,
        },
        USER_ID
      )
      .then(
        (result) => {
          setSending(false);
          onSubmit(formData); // サンクスメッセージ表示
        },
        (error) => {
          setSending(false);
          alert("送信に失敗しました。再度お試しください。");
        }
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-4 ${className}`}
    >
      {/* プラン名入力（任意） */}
      <div className="relative">
        <input
          type="text"
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          placeholder="ご希望のプラン（例：スタンダード）"
          className="w-full pl-4 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all mobile-touch-target"
        />
      </div>

      {/* 名前入力 */}
      <div className="relative">
        <User
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d4af37] z-10"
          size={18}
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="お名前"
          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all mobile-touch-target"
        />
      </div>

      {/* メール入力 */}
      <div className="relative">
        <Mail
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d4af37] z-10"
          size={18}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="メールアドレス"
          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all mobile-touch-target"
        />
      </div>

      {/* 送信ボタン */}
      <motion.button
        type="submit"
        disabled={isLoading || sending}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#e53935] via-[#d4af37] to-[#ffd700] text-white font-bold rounded-xl transition-all duration-300 mobile-touch-target relative overflow-hidden"
      >
        {isLoading || sending ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send size={20} />
            <span>人生を変える第一歩を踏み出す</span>
          </>
        )}
      </motion.button>

      {/* 安心要素 */}
      <div className="text-center text-gray-400 text-xs space-y-1">
        <p>🔒 個人情報は厳重に保護されます</p>
        <p>📞 24時間以内にご連絡いたします</p>
      </div>
    </motion.form>
  );
};

export default MinimalForm;
