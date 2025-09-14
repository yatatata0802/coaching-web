// 一時的なモック版Supabaseクライアント
// 実際のSupabaseを使用する場合は、環境変数を設定してこのファイルを置き換えてください

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 環境変数が設定されていない場合はモック版を使用
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "your_supabase_project_url" &&
  supabaseAnonKey !== "your_supabase_anon_key";

export const getDataSource = (): "supabase" | "local" =>
  isSupabaseConfigured ? "supabase" : "local";

// モック版のSupabaseクライアント
const mockSupabase = {
  rpc: async (func: string, params: any) => {
    // eslint-disable-next-line no-console
    console.log(`Mock Supabase RPC: ${func}`, params);
    return { error: null };
  },
  from: () => ({
    select: () => ({
      single: async () => ({ data: { total_count: 0 }, error: null }),
      eq: () => ({
        single: async () => ({ data: { view_count: 0 }, error: null }),
      }),
    }),
  }),
} as unknown as SupabaseClient;

// 実際のSupabaseクライアント（同期初期化）
let supabase: SupabaseClient = mockSupabase;
if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Supabase client creation failed, using mock:", error);
  }
}

export { supabase };

// 統一された型定義をインポート
import {
  AnalyticsData,
  DailyData,
  MonthlyData,
  WeeklyData,
  DayOfWeekData,
  HourlyData,
  DeviceData,
  BrowserData,
  ReferrerData,
  RecentAccessData,
  FunnelData,
  ReferrerAnalysis,
} from "../types/analytics";

// ローカルストレージを使用したモック版PVカウント
const getLocalStorageKey = (key: string) => `page_views_${key}`;

// デバイス判定
const getDeviceType = (userAgent: string): "desktop" | "mobile" | "tablet" => {
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  const tablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(
    userAgent
  );

  if (tablet) return "tablet";
  if (mobile) return "mobile";
  return "desktop";
};

// ブラウザ判定
const getBrowser = (userAgent: string): string => {
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Edge")) return "Edge";
  return "Other";
};

// OS判定
const getOS = (userAgent: string): string => {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "macOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iOS")) return "iOS";
  return "Other";
};

// リファラー分析（SNS判定）
export const analyzeReferrer = (referrer: string): ReferrerAnalysis => {
  if (!referrer || referrer === "direct") {
    return { source: "direct", platform: "直接アクセス" };
  }

  const url = referrer.toLowerCase();

  // SNS判定
  if (url.includes("instagram.com")) {
    return { source: "instagram", platform: "Instagram" };
  }
  if (url.includes("x.com") || url.includes("twitter.com")) {
    return { source: "x", platform: "X (Twitter)" };
  }
  if (url.includes("tiktok.com")) {
    return { source: "tiktok", platform: "TikTok" };
  }
  if (url.includes("note.com")) {
    return { source: "note", platform: "note" };
  }
  if (url.includes("youtube.com")) {
    return { source: "youtube", platform: "YouTube" };
  }
  if (url.includes("facebook.com")) {
    return { source: "facebook", platform: "Facebook" };
  }
  if (url.includes("google.com")) {
    return { source: "google", platform: "Google検索" };
  }
  if (url.includes("yahoo.co.jp")) {
    return { source: "yahoo", platform: "Yahoo!検索" };
  }

  return { source: "other", platform: "その他" };
};

// 日付フォーマット関数
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD形式
};

const formatMonth = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`; // YYYY-MM形式
};

const formatWeek = (date: Date): string => {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil(days / 7);
  return `${year}-W${String(weekNumber).padStart(2, "0")}`; // YYYY-WNN形式
};

// 以下のAPIは既存のまま（supabase は同期で初期化済み）
export const getAnalyticsData = async (): Promise<AnalyticsData[]> => {
  try {
    // eslint-disable-next-line no-console
    console.log("🔍 getAnalyticsData 開始");

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("analytics")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("分析データ取得エラー:", error);
        return [];
      }

      // eslint-disable-next-line no-console
      console.log("✅ Supabaseからデータ取得完了:", data?.length || 0, "件");
      return data || [];
    } else {
      const analyticsKey = getLocalStorageKey("analytics");
      const analyticsData = localStorage.getItem(analyticsKey);
      const result = analyticsData ? JSON.parse(analyticsData) : [];
      console.log(
        "✅ ローカルストレージからデータ取得完了:",
        result.length,
        "件"
      );
      console.log("📊 最新のデータ:", result.slice(-3));
      return result;
    }
  } catch (error) {
    console.error("❌ 分析データ取得処理エラー:", error);
    return [];
  }
};

// 期間フィルター付きの分析データを取得
export const getAnalyticsDataByPeriod = async (
  period: "today" | "week" | "month" | "all" = "all"
): Promise<AnalyticsData[]> => {
  try {
    const allData = await getAnalyticsData();

    if (period === "all") {
      return allData;
    }

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week": {
        const dayOfWeek = now.getDay();
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 月曜日を週の開始とする
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - daysToSubtract
        );
        break;
      }
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        return allData;
    }

    return allData.filter((item) => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= startDate;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("期間別分析データ取得エラー:", error);
    return [];
  }
};

// 日付別アクセス数
export const getDailyAnalytics = async (): Promise<DailyData[]> => {
  const data = await getAnalyticsData();
  const dailyCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const date = formatDate(new Date(item.timestamp));
    dailyCount[date] = (dailyCount[date] || 0) + 1;
  });

  return Object.entries(dailyCount)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

// 月別アクセス数
export const getMonthlyAnalytics = async (): Promise<MonthlyData[]> => {
  const data = await getAnalyticsData();
  const monthlyCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const month = formatMonth(new Date(item.timestamp));
    monthlyCount[month] = (monthlyCount[month] || 0) + 1;
  });

  return Object.entries(monthlyCount)
    .map(([month, count]) => ({
      month,
      count,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

// 週別アクセス数
export const getWeeklyAnalytics = async (): Promise<WeeklyData[]> => {
  const data = await getAnalyticsData();
  const weeklyCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const week = formatWeek(new Date(item.timestamp));
    weeklyCount[week] = (weeklyCount[week] || 0) + 1;
  });

  return Object.entries(weeklyCount)
    .map(([week, count]) => ({
      week,
      count,
    }))
    .sort((a, b) => a.week.localeCompare(b.week));
};

// 曜日別アクセス数（既存）
export const getDayOfWeekAnalytics = async (): Promise<DayOfWeekData[]> => {
  const data = await getAnalyticsData();
  const dailyCount: { [key: number]: number } = {};

  data.forEach((item) => {
    const day = item.day_of_week;
    dailyCount[day] = (dailyCount[day] || 0) + 1;
  });

  return Object.entries(dailyCount)
    .map(([day, count]) => ({
      day: parseInt(day),
      count,
    }))
    .sort((a, b) => a.day - b.day);
};

// 時間帯別アクセス数
export const getHourlyAnalytics = async (): Promise<HourlyData[]> => {
  const data = await getAnalyticsData();
  const hourlyCount: { [key: number]: number } = {};

  data.forEach((item) => {
    const hour = item.hour;
    hourlyCount[hour] = (hourlyCount[hour] || 0) + 1;
  });

  return Object.entries(hourlyCount)
    .map(([hour, count]) => ({
      hour: parseInt(hour),
      count,
    }))
    .sort((a, b) => a.hour - b.hour);
};

// デバイス別アクセス数
export const getDeviceAnalytics = async (): Promise<DeviceData[]> => {
  const data = await getAnalyticsData();
  const deviceCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const device = item.device_type;
    deviceCount[device] = (deviceCount[device] || 0) + 1;
  });

  return Object.entries(deviceCount).map(([device, count]) => ({
    device,
    count,
  }));
};

// ブラウザ別アクセス数
export const getBrowserAnalytics = async (): Promise<BrowserData[]> => {
  const data = await getAnalyticsData();
  const browserCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const browser = item.browser;
    browserCount[browser] = (browserCount[browser] || 0) + 1;
  });

  return Object.entries(browserCount).map(([browser, count]) => ({
    browser,
    count,
  }));
};

// SNS・リファラー別アクセス数
export const getReferrerAnalytics = async (): Promise<ReferrerData[]> => {
  const data = await getAnalyticsData();
  const referrerCount: { [key: string]: { platform: string; count: number } } =
    {};

  data.forEach((item) => {
    const { source, platform } = analyzeReferrer(item.referrer);
    if (!referrerCount[source]) {
      referrerCount[source] = { platform, count: 0 };
    }
    referrerCount[source].count += 1;
  });

  return Object.entries(referrerCount)
    .map(([source, data]) => ({
      source,
      platform: data.platform,
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count); // 多い順にソート
};

// 最近のアクセス履歴（最新20件）
export const getRecentAccess = async (): Promise<RecentAccessData[]> => {
  const data = await getAnalyticsData();
  return data.slice(0, 20); // 最新20件を返す
};

// --- ユーザーID管理 ---
const USER_ID_KEY = "user_id";
const USER_META_KEY = "user_meta";
function getOrCreateUserId() {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(USER_ID_KEY, userId);
    // 初回訪問日・回数も記録
    localStorage.setItem(
      USER_META_KEY,
      JSON.stringify({ firstVisit: new Date().toISOString(), visitCount: 1 })
    );
  } else {
    // 訪問回数をインクリメント
    const meta = JSON.parse(localStorage.getItem(USER_META_KEY) || "{}");
    meta.visitCount = (meta.visitCount || 0) + 1;
    localStorage.setItem(USER_META_KEY, JSON.stringify(meta));
  }
  return userId;
}

export function getUserMeta() {
  const meta = JSON.parse(localStorage.getItem(USER_META_KEY) || "{}");
  return {
    firstVisit: meta.firstVisit,
    visitCount: meta.visitCount || 1,
  };
}

// --- 既存のincrementPageViewを拡張 ---
export const incrementPageView = async (pagePath: string) => {
  try {
    console.log("🔍 incrementPageView 開始:", pagePath);
    console.log("🔍 現在のURL:", window.location.href);
    console.log("🔍 リファラー:", document.referrer);

    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay();
    const referrer = document.referrer || "direct";
    const userAgent = navigator.userAgent;
    const deviceType = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);
    const userId = getOrCreateUserId();
    const userMeta = getUserMeta();

    const analyticsData: AnalyticsData & {
      user_id?: string;
      visit_count?: number;
      first_visit?: string;
    } = {
      id: Date.now().toString(),
      page_path: pagePath,
      timestamp: now.toISOString(),
      hour,
      day_of_week: dayOfWeek,
      referrer,
      user_agent: userAgent,
      device_type: deviceType,
      browser,
      os,
      user_id: userId,
      visit_count: userMeta.visitCount,
      first_visit: userMeta.firstVisit,
    };

    console.log("🔍 分析データ作成完了:", analyticsData);

    if (isSupabaseConfigured) {
      const { error } = await supabase.from("analytics").insert(analyticsData);
      if (error) {
        console.error("PVカウントINSERTエラー:", error);
      }
    } else {
      // モック版：ローカルストレージを使用
      const totalKey = getLocalStorageKey("total");
      const pageKey = getLocalStorageKey(pagePath);
      const analyticsKey = getLocalStorageKey("analytics");

      console.log("🔍 ローカルストレージキー:", {
        totalKey,
        pageKey,
        analyticsKey,
      });

      const currentTotal = parseInt(localStorage.getItem(totalKey) || "0");
      const currentPage = parseInt(localStorage.getItem(pageKey) || "0");

      console.log("🔍 現在の値:", { currentTotal, currentPage });

      localStorage.setItem(totalKey, (currentTotal + 1).toString());
      localStorage.setItem(pageKey, (currentPage + 1).toString());

      // 分析データを保存
      const existingAnalytics = localStorage.getItem(analyticsKey);
      const analytics = existingAnalytics ? JSON.parse(existingAnalytics) : [];
      analytics.push(analyticsData);
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000);
      }
      localStorage.setItem(analyticsKey, JSON.stringify(analytics));

      console.log(`✅ PVカウント完了: ${pagePath} (ローカルストレージ)`, {
        total: currentTotal + 1,
        page: currentPage + 1,
        analyticsCount: analytics.length,
        timestamp: now.toISOString(),
      });

      // 保存後の確認
      const savedTotal = localStorage.getItem(totalKey);
      const savedPage = localStorage.getItem(pageKey);
      console.log("🔍 保存後の確認:", { savedTotal, savedPage });
    }
  } catch (error) {
    console.error("❌ PVカウント処理エラー:", error);
    console.error("❌ エラー詳細:", {
      pagePath,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  }
};

// 全体PV取得
export const getTotalViews = async (): Promise<number> => {
  try {
    if (isSupabaseConfigured) {
      // analytics テーブルの総件数をカウント
      const { count, error } = await supabase
        .from("analytics")
        .select("id", { count: "exact", head: true });
      if (error) {
        console.error("全体PV取得エラー:", error);
        return 0;
      }
      return count ?? 0;
    } else {
      // モック版：ローカルストレージから取得
      const totalKey = getLocalStorageKey("total");
      const total = parseInt(localStorage.getItem(totalKey) || "0");
      return total;
    }
  } catch (error) {
    console.error("全体PV取得処理エラー:", error);
    return 0;
  }
};

// 期間別の全体PV取得
export const getTotalViewsByPeriod = async (
  period: "today" | "week" | "month" | "all" = "all"
): Promise<number> => {
  const data = await getAnalyticsDataByPeriod(period);
  return data.length;
};

// ページ別PV取得
export const getPageViews = async (pagePath: string): Promise<number> => {
  try {
    if (isSupabaseConfigured) {
      // analytics テーブルからページ別件数を取得
      const { count, error } = await supabase
        .from("analytics")
        .select("id", { count: "exact", head: true })
        .eq("page_path", pagePath);
      if (error) {
        console.error("ページPV取得エラー:", error);
        return 0;
      }
      return count ?? 0;
    } else {
      // モック版：ローカルストレージから取得
      const pageKey = getLocalStorageKey(pagePath);
      const views = parseInt(localStorage.getItem(pageKey) || "0");
      return views;
    }
  } catch (error) {
    console.error("ページPV取得処理エラー:", error);
    return 0;
  }
};

// 期間別のページ別PV取得
export const getPageViewsByPeriod = async (
  pagePath: string,
  period: "today" | "week" | "month" | "all" = "all"
): Promise<number> => {
  const data = await getAnalyticsDataByPeriod(period);
  return data.filter((item) => item.page_path === pagePath).length;
};

// 成果イベント（LINE登録クリック）を記録
export const recordLineConversion = () => {
  const key = "line_conversion_events";
  const userId = getOrCreateUserId();
  const userMeta = getUserMeta();
  const events = JSON.parse(localStorage.getItem(key) || "[]");
  events.push({
    timestamp: new Date().toISOString(),
    referrer: document.referrer || "direct",
    user_id: userId,
    visit_count: userMeta.visitCount,
    first_visit: userMeta.firstVisit,
  });
  localStorage.setItem(key, JSON.stringify(events));
};

// 成果イベント（LINE登録クリック）を取得
export const getLineConversions = (): RecentAccessData[] => {
  const key = "line_conversion_events";
  return JSON.parse(localStorage.getItem(key) || "[]");
};

// ファネル分析用：流入元ごとの流入数・ページ閲覧数・LINE登録数を集計
export const getFunnelAnalytics = async (): Promise<FunnelData[]> => {
  const analytics = await getAnalyticsData();
  const conversions = getLineConversions();

  // 流入元ごとに集計
  const funnel: {
    [source: string]: {
      platform: string;
      inflow: number;
      view: number;
      conversion: number;
    };
  } = {};

  analytics.forEach((item) => {
    const { source, platform } = analyzeReferrer(item.referrer);
    if (!funnel[source])
      funnel[source] = { platform, inflow: 0, view: 0, conversion: 0 };
    funnel[source].inflow += 1;
    funnel[source].view += 1; // 今回は閲覧＝流入とみなす
  });

  conversions.forEach((event) => {
    const { source, platform } = analyzeReferrer(event.referrer);
    if (!funnel[source])
      funnel[source] = { platform, inflow: 0, view: 0, conversion: 0 };
    funnel[source].conversion += 1;
  });

  // 配列化して流入数順にソート
  return Object.entries(funnel)
    .map(([source, data]) => ({ source, ...data }))
    .sort((a, b) => b.inflow - a.inflow);
};

// 分析データをリセット（管理者用）
export const resetAnalyticsData = () => {
  try {
    // Supabase側のデータリセットは未実装
    if (isSupabaseConfigured) {
      console.warn("Supabaseのデータリセットは手動で行う必要があります。");
    }

    // ローカルストレージのデータを削除
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("page_views_")) {
        localStorage.removeItem(key);
      }
    });
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_meta");
    localStorage.removeItem("line_conversion_events");

    console.log("ローカルストレージの分析データをリセットしました。");
    alert("分析データをリセットしました。ページをリロードします。");
    window.location.reload();
  } catch (error) {
    console.error("分析データのリセット中にエラーが発生しました:", error);
    alert("リセット中にエラーが発生しました。");
  }
};

// ページ別アクセス数
export const getPageAnalytics = async (): Promise<
  { page: string; count: number; bounceRate: number }[]
> => {
  const data = await getAnalyticsData();
  const pageCount: { [key: string]: { count: number; bounces: number } } = {};

  data.forEach((item) => {
    const page = item.page_path;
    if (!pageCount[page]) {
      pageCount[page] = { count: 0, bounces: 0 };
    }
    pageCount[page].count += 1;

    // 単一ページビューの場合（リファラーが同じページの場合）をバウンスとみなす
    // これは簡易的な判定で、実際のバウンス率とは異なる場合があります
    if (item.referrer === page || item.referrer === "direct") {
      pageCount[page].bounces += 1;
    }
  });

  return Object.entries(pageCount)
    .map(([page, data]) => ({
      page,
      count: data.count,
      bounceRate: data.count > 0 ? (data.bounces / data.count) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count); // アクセス数順にソート
};

// ページ別の滞在時間分析（簡易版）
export const getPageEngagementAnalytics = async (): Promise<
  { page: string; avgTime: number; sessions: number }[]
> => {
  const data = await getAnalyticsData();
  const pageStats: { [key: string]: { totalTime: number; sessions: number } } =
    {};

  // 簡易的な滞在時間計算（実際の実装ではより精密な計測が必要）
  data.forEach((item) => {
    const page = item.page_path;
    if (!pageStats[page]) {
      pageStats[page] = { totalTime: 0, sessions: 0 };
    }

    // 仮の滞在時間（実際の実装ではページ離脱イベントなどで計測）
    const estimatedTime = Math.random() * 300 + 30; // 30秒〜5分30秒
    pageStats[page].totalTime += estimatedTime;
    pageStats[page].sessions += 1;
  });

  return Object.entries(pageStats)
    .map(([page, stats]) => ({
      page,
      avgTime:
        stats.sessions > 0 ? Math.round(stats.totalTime / stats.sessions) : 0,
      sessions: stats.sessions,
    }))
    .sort((a, b) => b.avgTime - a.avgTime); // 平均滞在時間順にソート
};

// デバッグ用：ローカルストレージのデータを確認
export const debugLocalStorage = () => {
  console.log("🔍 ローカルストレージ デバッグ情報:");

  // 全体PV
  const totalKey = getLocalStorageKey("total");
  const total = localStorage.getItem(totalKey);
  console.log("📊 全体PV:", total);

  // 各ページのPV
  const pages = [
    "/",
    "/profile",
    "/services",
    "/contact",
    "/blog",
    "/what-is-coaching",
    "/admin",
  ];

  console.log("📄 各ページのPV:");
  pages.forEach((page) => {
    const pageKey = getLocalStorageKey(page);
    const pageViews = localStorage.getItem(pageKey);
    console.log(`  ${page}: ${pageViews || 0}`);
  });

  // 分析データ
  const analyticsKey = getLocalStorageKey("analytics");
  const analytics = localStorage.getItem(analyticsKey);
  if (analytics) {
    const parsed = JSON.parse(analytics);
    console.log("📈 分析データ数:", parsed.length);
    console.log("📈 最新の分析データ:", parsed.slice(-3));

    // ページ別の分析データ
    console.log("📈 ページ別分析データ:");
    pages.forEach((page) => {
      const pageData = parsed.filter((item: any) => item.page_path === page);
      console.log(`  ${page}: ${pageData.length}件`);
    });
  }

  // ユーザー情報
  const userId = localStorage.getItem("user_id");
  const userMeta = localStorage.getItem("user_meta");
  console.log("👤 ユーザーID:", userId);
  console.log("👤 ユーザーメタ:", userMeta);

  // データ整合性チェック
  console.log("🔍 データ整合性チェック:");
  if (analytics) {
    const parsed = JSON.parse(analytics);
    const totalFromAnalytics = parsed.length;
    const totalFromCounter = parseInt(total || "0");

    console.log(`  分析データ総数: ${totalFromAnalytics}`);
    console.log(`  カウンター総数: ${totalFromCounter}`);
    console.log(
      `  整合性: ${
        totalFromAnalytics === totalFromCounter ? "✅ OK" : "❌ 不一致"
      }`
    );

    // ページ別の整合性チェック
    pages.forEach((page) => {
      const pageKey = getLocalStorageKey(page);
      const pageViews = parseInt(localStorage.getItem(pageKey) || "0");
      const pageDataCount = parsed.filter(
        (item: any) => item.page_path === page
      ).length;

      console.log(
        `  ${page}: カウンター=${pageViews}, 分析データ=${pageDataCount} ${
          pageViews === pageDataCount ? "✅" : "❌"
        }`
      );
    });
  }
};
