import React from "react";
import { motion } from "framer-motion";
// 公式カラーのカスタムSVGアイコン
// Instagram公式風カスタムSVGアイコン（グラデーション＋カメラ枠・レンズ・フラッシュ）
const InstagramIcon = (props: { size?: number; className?: string }) => (
  <svg
    width={props.size || 20}
    height={props.size || 20}
    viewBox="0 0 40 40"
    fill="none"
    className={props.className}
  >
    <defs>
      <radialGradient id="ig-gradient" cx="50%" cy="50%" r="80%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fdf497" />
        <stop offset="60%" stopColor="#fd5949" />
        <stop offset="90%" stopColor="#d6249f" />
        <stop offset="100%" stopColor="#285AEB" />
      </radialGradient>
      <linearGradient
        id="ig-lens"
        x1="13"
        y1="13"
        x2="27"
        y2="27"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fd5949" />
        <stop offset="0.5" stopColor="#d6249f" />
        <stop offset="1" stopColor="#285AEB" />
      </linearGradient>
    </defs>
    {/* 外枠（角丸） */}
    <rect x="4" y="4" width="32" height="32" rx="10" fill="url(#ig-gradient)" />
    {/* カメラのレンズ（グラデーション塗りつぶし） */}
    <circle
      cx="20"
      cy="20"
      r="7"
      stroke="#fff"
      strokeWidth="2.5"
      fill="url(#ig-lens)"
    />
    {/* レンズのハイライト */}
    <ellipse cx="20" cy="20" rx="3.5" ry="3.2" fill="#fff" fillOpacity="0.13" />
    {/* フラッシュ部分 */}
    <circle cx="27.5" cy="12.5" r="1.5" fill="#fff" />
    {/* 内側の細い枠 */}
    <rect
      x="8.5"
      y="8.5"
      width="23"
      height="23"
      rx="7.5"
      stroke="#fff"
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);

// X（旧Twitter）黒い「X」ロゴ
const TwitterIcon = (props: { size?: number; className?: string }) => (
  <svg
    width={props.size || 20}
    height={props.size || 20}
    viewBox="0 0 40 40"
    fill="none"
    className={props.className}
  >
    <rect width="40" height="40" rx="12" fill="#000" />
    <path
      d="M13 13L27 27M27 13L13 27"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const YoutubeIcon = (props: { size?: number; className?: string }) => (
  <svg
    width={props.size || 20}
    height={props.size || 20}
    viewBox="0 0 40 40"
    fill="none"
    className={props.className}
  >
    <rect width="40" height="40" rx="12" fill="#FF0000" />
    <polygon points="17,14 27,20 17,26" fill="#fff" />
  </svg>
);

// TikTok公式風カスタムSVGアイコン（マルチカラーで目立たせる）
const TikTokIcon = (props: { size?: number; className?: string }) => (
  <svg
    width={props.size || 20}
    height={props.size || 20}
    viewBox="0 0 40 40"
    fill="none"
    className={props.className}
  >
    <circle cx="20" cy="20" r="20" fill="#000" />
    {/* シアン */}
    <path
      d="M25.5 13.5c.6 1.7 2.1 2.9 3.9 3v3.1c-1.2.1-2.4-.1-3.5-.6v5.8c0 3.1-2.5 5.6-5.6 5.6-.8 0-1.6-.2-2.3-.5 1 .8 2.3 1.3 3.7 1.3 3.1 0 5.6-2.5 5.6-5.6v-5.8c1.1.5 2.3.7 3.5.6v-3.1c-1.8-.1-3.3-1.3-3.9-3z"
      fill="#25F4EE"
    />
    {/* ピンク */}
    <path
      d="M22.3 11.1v13c0 1.3-1.1 2.4-2.4 2.4-.8 0-1.5-.4-2-.9.4.7 1.2 1.2 2 1.2 1.3 0 2.4-1.1 2.4-2.4v-13h-3.2v2.2c.6-.2 1.2-.3 1.8-.3.5 0 1 .1 1.4.2z"
      fill="#FE2C55"
    />
    {/* 白 */}
    <path
      d="M25.5 13.5c.6 1.7 2.1 2.9 3.9 3v3.1c-1.2.1-2.4-.1-3.5-.6v5.8c0 3.1-2.5 5.6-5.6 5.6s-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6c.2 0 .4 0 .6.1v3.2c-.2-.1-.4-.1-.6-.1-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4v-13h3.2z"
      fill="#fff"
      fillOpacity=".8"
    />
  </svg>
);

interface SocialLinksProps {
  variant?: "horizontal" | "vertical" | "grid";
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = "horizontal",
  size = "md",
  showLabels = false,
  className = "",
}) => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: InstagramIcon,
      url: "https://www.instagram.com/guy_mt",
      color: "#E4405F",
      description: "日々の気づきや筋トレ風景をシェア",
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      url: "https://x.com/GUY5648",
      color: "#1DA1F2",
      description: "コーチングのヒントや考察を発信",
    },
    {
      name: "YouTube",
      icon: YoutubeIcon,
      url: "https://www.youtube.com/@n612y",
      color: "#FF0000",
      description: "セルフマネジメント動画を配信",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      url: "https://www.tiktok.com/@guy_my5648",
      color: "#000000",
      description: "TikTokで動画をチェック",
    },
  ];

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const containerClasses = {
    horizontal: "flex items-center gap-4",
    vertical: "flex flex-col gap-4",
    grid: "grid grid-cols-2 gap-4",
  };

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon;

        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              ${sizeClasses[size]} 
              flex items-center justify-center 
              bg-white/10 backdrop-blur-sm 
              border border-white/20 
              rounded-full 
              transition-all duration-300 
              hover:border-[#d4af37] 
              hover:shadow-[0_8px_32px_rgba(212,175,55,0.3)]
              group
              ${showLabels ? "gap-3 px-4 py-2 w-auto" : ""}
            `}
            style={
              {
                "--hover-color": social.color,
              } as React.CSSProperties
            }
          >
            <IconComponent
              size={iconSizes[size]}
              className="text-white group-hover:text-[#d4af37] transition-colors duration-300"
            />
            {showLabels && (
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium group-hover:text-[#d4af37] transition-colors">
                  {social.name}
                </span>
                {variant === "grid" && (
                  <span className="text-gray-400 text-xs">
                    {social.description}
                  </span>
                )}
              </div>
            )}
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
