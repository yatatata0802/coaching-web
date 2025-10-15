import React from "react";
import { BlogPost } from "../types";

// パンくずリストのアイテムの型
interface BreadcrumbItem {
  name: string;
  path: string;
}

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
  blogPost?: BlogPost; // ブログ記事の全データ
  breadcrumbs?: BreadcrumbItem[]; // パンくずリストのデータ
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "矢田谷充則,コーチング,公安警察,元警察官,変わりたい,やる気,続かない,筋トレ,人生設計,行動変容,目標達成,自己管理,継続力,無料相談,大阪,関西,大阪市,京橋,コーチングサービス,パーソナルコーチ,習慣化,マインドセット,フィットネス,ライフスタイル,30代,40代,男性,女性,社会人,会社員,起業家,フリーランス",
  ogImage = "https://yatatata0802.github.io/coaching-web/profile.jpg",
  canonical,
  type = "website",
  author,
  publishDate,
  lastModifiedDate,
  blogPost,
  breadcrumbs,
}) => {
  const fullTitle = `${title} | 矢田谷充則のコーチングサービス`;
  const fullDescription = `${description} 元公安警察官の矢田谷充則によるコーチングサービス。公安部門での経験を活かした独自のアプローチで、あなたの「変わりたい」を行動に繋げます。大阪・関西エリアで無料相談受付中。`;
  const currentUrl = canonical || window.location.href;
  const siteUrl = "https://yatatata0802.github.io/coaching-web";

  const schemaData = {
    "@context": "https://schema.org",
    "@type":
      type === "article"
        ? "BlogPosting"
        : type === "person"
        ? "Person"
        : "Service",
    name: fullTitle,
    description: fullDescription,
    url: currentUrl,
    image: ogImage,
    ...(type === "article" &&
      blogPost && {
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": currentUrl,
        },
        headline: blogPost.title,
        image: blogPost.image || ogImage,
        datePublished: blogPost.date,
        dateModified: blogPost.lastUpdated || blogPost.date,
        author: {
          "@type": "Person",
          name: "矢田谷充則",
          url: `${siteUrl}/profile`,
        },
        publisher: {
          "@type": "Organization",
          name: "矢田谷充則のコーチングサービス",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/profile.jpg`,
          },
        },
        articleBody: blogPost.content.replace(/<[^>]*>?/gm, ""), // HTMLタグを除去
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
        addressLocality: "大阪市",
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
          "大阪",
          "関西",
          "京橋",
          "習慣化",
          "マインドセット",
          "フィットネス",
          "ライフスタイル",
          "30代",
          "40代",
          "社会人",
          "会社員",
          "起業家",
          "フリーランス",
        ],
        address: {
          "@type": "PostalAddress",
          addressRegion: "大阪府",
          addressLocality: "大阪市",
        },
      },
      serviceType: "コーチング",
      areaServed: "日本",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "コーチングサービス",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "無料相談",
              description: "初回無料相談サービス",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "パーソナルコーチング",
              description: "個人向けコーチングサービス",
            },
          },
        ],
      },
    }),
  };

  return (
    <>
      {/* 基本メタタグ */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="矢田谷充則" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="ja" />
      <meta name="revisit-after" content="7 days" />

      {/* 地域・ローカルSEO */}
      <meta name="geo.region" content="JP-27" />
      <meta name="geo.placename" content="大阪市都島区 京橋" />
      <meta name="geo.position" content="34.6968;135.5346" />
      <meta name="ICBM" content="34.6968, 135.5346" />

      {/* カノニカルURL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="矢田谷充則のコーチングサービス" />
      <meta property="og:locale" content="ja_JP" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* その他のメタタグ */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* メインの構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      {/* パンくずリストの構造化データ（存在する場合のみ） */}
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: `https://yatatata0802.github.io/coaching-web${crumb.path}`,
              })),
            }),
          }}
        />
      )}

      {/* LocalBusiness 構造化データ（大阪・京橋向け） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "矢田谷充則のコーチングサービス",
            url: currentUrl,
            image: ogImage,
            address: {
              "@type": "PostalAddress",
              addressRegion: "大阪府",
              addressLocality: "大阪市都島区",
              streetAddress: "京橋周辺",
            },
            areaServed: "大阪市・京橋",
            geo: {
              "@type": "GeoCoordinates",
              latitude: 34.6968,
              longitude: 135.5346,
            },
          }),
        }}
      />

      {/* 追加のSEO対策 */}
      <meta name="theme-color" content="#d4af37" />
      <meta name="msapplication-TileColor" content="#d4af37" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* パフォーマンス最適化 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
    </>
  );
};

export default SEO;
