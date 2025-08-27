import React from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: "website" | "article" | "person";
  author?: {
    name: string;
    jobTitle?: string;
    description?: string;
    knowsAbout?: string[];
    alumniOf?: string;
    gender?: "male" | "female" | "other";
    sameAs?: string[]; // SNSリンクなど
  };
  publishDate?: string; // ISO 8601 format (e.g., '2023-10-27T10:00:00+09:00')
  lastModifiedDate?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "矢田谷充則,コーチング,公安警察,元警察官,変わりたい,やる気,続かない,筋トレ,人生設計,行動変容,目標達成,自己管理,継続力,無料相談,大阪,関西",
  ogImage = "https://yatatata0802.github.io/coaching-web/profile.jpg",
  canonical,
  type = "website",
  author,
  publishDate,
  lastModifiedDate,
}) => {
  const fullTitle = `${title} | 矢田谷充則のコーチングサービス`;
  const fullDescription = `${description} 元公安警察官の矢田谷充則によるコーチングサービス。公安部門での経験を活かした独自のアプローチで、あなたの「変わりたい」を行動に繋げます。`;
  const currentUrl = canonical || window.location.href;

  const schemaData = {
    "@context": "https://schema.org",
    "@type":
      type === "article" ? "Article" : type === "person" ? "Person" : "Service",
    name: fullTitle,
    description: fullDescription,
    url: currentUrl,
    image: ogImage,
    ...(type === "article" && {
      datePublished: publishDate || "2024-01-01T00:00:00+09:00", // デフォルト値または実際の公開日
      dateModified:
        lastModifiedDate || publishDate || "2024-01-01T00:00:00+09:00",
      author: {
        "@type": "Person",
        name: author?.name || "矢田谷充則",
        ...(author?.jobTitle && { jobTitle: author.jobTitle }),
        ...(author?.description && { description: author.description }),
        ...(author?.knowsAbout && { knowsAbout: author.knowsAbout }),
        ...(author?.alumniOf && { alumniOf: author.alumniOf }),
        ...(author?.gender && { gender: author.gender }),
        ...(author?.sameAs && { sameAs: author.sameAs }),
      },
    }),
    ...(type === "person" && {
      name: author?.name || "矢田谷充則",
      ...(author?.jobTitle && { jobTitle: author.jobTitle }),
      ...(author?.description && { description: author.description }),
      ...(author?.knowsAbout && { knowsAbout: author.knowsAbout }),
      ...(author?.alumniOf && { alumniOf: author.alumniOf }),
      ...(author?.gender && { gender: author.gender }),
      ...(author?.sameAs && { sameAs: author.sameAs }),
      address: {
        "@type": "PostalAddress",
        addressRegion: "大阪府",
      },
    }),
    ...(type === "website" && {
      provider: {
        "@type": "Person",
        name: "矢田谷充則",
        alternateName: "Yatagai Mitsunori",
        jobTitle: "コーチング専門家",
        description:
          "筋トレ経験を活かした独自のコーチングで、あなたの「変わりたい」を行動に繋げる専門家",
        knowsAbout: [
          "コーチング",
          "変わりたい",
          "やる気",
          "続かない",
          "筋トレ",
          "継続力",
          "公安警察",
          "公安部門",
          "警察官",
        ],
        address: {
          "@type": "PostalAddress",
          addressRegion: "大阪府",
        },
      },
      serviceType: "コーチング",
      areaServed: "日本",
    }),
  };

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta
        property="og:type"
        content={type === "article" ? "article" : "website"}
      />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="コーチングサービス" />
      <meta property="og:locale" content="ja_JP" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </>
  );
};

export default SEO;
