import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, HelpCircle, Settings, Mail, Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/main", label: "HOME", icon: Home },
    { path: "/profile", label: "PROFILE", icon: User },
    { path: "/what-coaching", label: "WHAT'S COACHING", icon: HelpCircle },
    { path: "/services", label: "SERVICES", icon: Settings },
    { path: "/contact", label: "CONTACT", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // スマホメニューが開いているときはスクロールを無効化
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // ナビゲーションクリック時の処理
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    // 少し遅延させてからスクロール（ページ遷移を待つため）
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-[#d4af37]/40 shadow-2xl"
            : "bg-black/60 backdrop-blur-sm border-b border-[#d4af37]/20"
        }`}
        style={{
          // セーフエリアを考慮したヘッダー高さ
          paddingTop: "env(safe-area-inset-top)",
          minHeight: "calc(64px + env(safe-area-inset-top))", // 基本64px + セーフエリア
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 py-3 sm:px-6 sm:py-4">
          {/* デスクトップナビゲーション - 中央配置 */}
          <div className="hidden md:flex justify-center items-center">
            <ul className="flex space-x-6 lg:space-x-8">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      to={item.path}
                      onClick={handleNavClick}
                      className={`group relative flex flex-col items-center gap-1 px-3 py-2 transition-all duration-300 mobile-touch-target ${
                        isActive
                          ? "text-[#d4af37]"
                          : "text-white hover:text-[#d4af37]"
                      }`}
                    >
                      {/* アイコン */}
                      <div
                        className={`relative ${
                          isActive
                            ? "text-[#d4af37]"
                            : "text-[#d4af37]/70 group-hover:text-[#d4af37]"
                        }`}
                      >
                        <IconComponent size={18} />
                        {isActive && (
                          <div className="absolute inset-0 bg-[#d4af37] blur-lg opacity-30 animate-pulse" />
                        )}
                      </div>

                      {/* ラベル */}
                      <span className="text-xs font-medium tracking-wider">
                        {item.label}
                      </span>

                      {/* アクティブインジケーター */}
                      <motion.div
                        className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                        initial={{ width: 0, x: "-50%" }}
                        animate={{
                          width: isActive ? "100%" : "0%",
                          x: "-50%",
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* ホバーグロー */}
                      <div className="absolute inset-0 bg-[#d4af37]/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* スマホナビゲーション - シンプル化 */}
          <div className="md:hidden flex justify-end items-center min-h-[56px]">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#d4af37] transition-colors p-2 mobile-touch-target"
              aria-label="メニューを開く"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* スマホメニュー */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-[#d4af37]/20"
            >
              <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={handleNavClick}
                        className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all duration-300 mobile-touch-target ${
                          isActive
                            ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30"
                            : "text-white hover:bg-white/10 hover:text-[#d4af37]"
                        }`}
                      >
                        <IconComponent size={20} />
                        <span className="font-medium text-base">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* スマホメニュー用バックドロップ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
