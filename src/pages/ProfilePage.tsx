import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  subDays,
  subWeeks,
  subMonths,
  isWithinInterval,
  format,
} from "date-fns";
import {
  getTotalViews,
  getPageViews,
  getHourlyAnalytics,
  getDayOfWeekAnalytics,
  getDailyAnalytics,
  getMonthlyAnalytics,
  getWeeklyAnalytics,
  getDeviceAnalytics,
  getBrowserAnalytics,
  getReferrerAnalytics,
  getRecentAccess,
  analyzeReferrer,
  getFunnelAnalytics,
  getLineConversions,
  getAnalyticsData,
} from "../lib/supabase";

// --- AIインサイト自動要約 & 異常検知 ---
type AIInsightsArgs = {
  dateData: { date: string; count: number }[];
  monthlyData: { month: string; count: number }[];
  weeklyData: { week: string; count: number }[];
  referrerData: { source: string; platform: string; count: number }[];
  deviceData: { device: string; count: number }[];
  browserData: { browser: string; count: number }[];
  totalViews: number;
  funnelData?: {
    source: string;
    platform: string;
    inflow: number;
    view: number;
    conversion: number;
  }[];
};
function detectAnomaly({
  dateData,
  funnelData,
}: {
  dateData: { date: string; count: number }[];
  funnelData?: { inflow: number; conversion: number }[];
}) {
  if (!dateData || dateData.length < 14) return null;
  // アクセス数異常
  const last7 = dateData.slice(-7);
  const prev7 = dateData.slice(-14, -7);
  const last7sum = last7.reduce((a: number, b) => a + b.count, 0);
  const prev7sum = prev7.reduce((a: number, b) => a + b.count, 0);
  const diff = last7sum - prev7sum;
  const diffRate = prev7sum > 0 ? Math.round((diff / prev7sum) * 100) : 0;
  let anomaly = null;
  if (Math.abs(diffRate) >= 30) {
    anomaly = {
      type: "access",
      message: `アクセス数が前週比${diffRate >= 0 ? "+" : ""}${diffRate}%${
        diffRate >= 0 ? "増加" : "減少"
      }しています。`,
    };
  }
  // LINE登録率異常
  if (funnelData && funnelData.length > 0) {
    const inflow = funnelData.reduce((a, b) => a + b.inflow, 0);
    const conversion = funnelData.reduce((a, b) => a + b.conversion, 0);
    const lastRate = inflow > 0 ? conversion / inflow : 0;
    // 前週分（仮：前週のfunnelDataは未分割なので省略。実運用では期間ごとに分割集計）
    // ここではアクセス数異常のみ実装
  }
  return anomaly;
}
function generateAIInsights({
  dateData,
  monthlyData,
  weeklyData,
  referrerData,
  deviceData,
  browserData,
  totalViews,
  funnelData,
}: AIInsightsArgs & { funnelData?: { inflow: number; conversion: number }[] }) {
  if (!dateData || dateData.length === 0)
    return { summary: "データがありません", suggestion: "", anomaly: null };
  // 直近7日・前週7日で比較
  const last7 = dateData.slice(-7);
  const prev7 = dateData.slice(-14, -7);
  const last7sum = last7.reduce((a: number, b) => a + b.count, 0);
  const prev7sum = prev7.reduce((a: number, b) => a + b.count, 0);
  const diff = last7sum - prev7sum;
  const diffRate = prev7sum > 0 ? Math.round((diff / prev7sum) * 100) : 0;

  // SNS流入の伸び
  const topSNS = referrerData
    .filter((r) =>
      ["instagram", "x", "tiktok", "note", "youtube"].includes(r.source)
    )
    .sort((a, b) => b.count - a.count);
  const topSNSName = topSNS.length > 0 ? topSNS[0].platform : null;
  const topSNSCount = topSNS.length > 0 ? topSNS[0].count : 0;

  // デバイス傾向
  const mobile = deviceData.find((d) => d.device === "mobile")?.count || 0;
  const desktop = deviceData.find((d) => d.device === "desktop")?.count || 0;
  const deviceMsg =
    mobile > desktop
      ? "モバイルユーザーが多い傾向です。"
      : "デスクトップユーザーが多い傾向です。";

  // ブラウザ傾向
  const topBrowser = browserData.length > 0 ? browserData[0].browser : null;

  // サマリー
  let summary = `直近7日間のアクセス数は${last7sum.toLocaleString()}（前週比${
    diffRate >= 0 ? "+" : ""
  }${diffRate}%）です。`;
  if (topSNSName)
    summary += `\nSNS流入は「${topSNSName}」が最多（${topSNSCount}件）。`;
  summary += `\n${deviceMsg}`;
  if (topBrowser) summary += `\n最も多いブラウザは「${topBrowser}」です。`;

  // 改善提案
  let suggestion = "";
  if (diffRate < 0)
    suggestion +=
      "アクセス数が減少傾向です。新しい記事やSNS投稿で流入を増やしましょう。\n";
  if (topSNSName === "TikTok" && topSNSCount > 0)
    suggestion +=
      "TikTok流入が多いので、TikTok向けのLPや特典を強化しましょう。\n";
  if (mobile / (mobile + desktop) > 0.7)
    suggestion += "モバイル最適化・LINE誘導の強化が有効です。\n";
  if (topBrowser === "Safari")
    suggestion += "iPhoneユーザー向けの訴求も意識しましょう。\n";
  if (!suggestion) suggestion = "この調子でSNS・SEO施策を継続しましょう！";

  // 異常検知
  const anomaly = detectAnomaly({ dateData, funnelData });
  return { summary, suggestion, anomaly };
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [totalViews, setTotalViews] = useState(0);
  const [pageViews, setPageViews] = useState<{ [key: string]: number }>({});
  const [hourlyData, setHourlyData] = useState<
    { hour: number; count: number }[]
  >([]);
  const [dailyData, setDailyData] = useState<{ day: number; count: number }[]>(
    []
  );
  const [dateData, setDateData] = useState<{ date: string; count: number }[]>(
    []
  );
  const [monthlyData, setMonthlyData] = useState<
    { month: string; count: number }[]
  >([]);
  const [weeklyData, setWeeklyData] = useState<
    { week: string; count: number }[]
  >([]);
  const [deviceData, setDeviceData] = useState<
    { device: string; count: number }[]
  >([]);
  const [browserData, setBrowserData] = useState<
    { browser: string; count: number }[]
  >([]);
  const [referrerData, setReferrerData] = useState<
    { source: string; platform: string; count: number }[]
  >([]);
  const [recentAccess, setRecentAccess] = useState<
    { timestamp: string; referrer: string }[]
  >([]);
  const [funnelData, setFunnelData] = useState<
    {
      source: string;
      platform: string;
      inflow: number;
      view: number;
      conversion: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [compareTab, setCompareTab] = useState<
    "custom" | "prevWeek" | "prevMonth" | "prevYear"
  >("custom");
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 6));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [compareStart, setCompareStart] = useState<Date>(
    subDays(new Date(), 13)
  );
  const [compareEnd, setCompareEnd] = useState<Date>(subDays(new Date(), 7));
  const [userTypeTab, setUserTypeTab] = useState<"new" | "repeat">("new");
  const [userFunnel, setUserFunnel] = useState<
    { source: string; platform: string; inflow: number; conversion: number }[]
  >([]);
  const [userLeaving, setUserLeaving] = useState<
    { page: string; count: number }[]
  >([]);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [
          total,
          hourly,
          dayOfWeek,
          date,
          monthly,
          weekly,
          device,
          browser,
          referrer,
          recent,
          funnel,
        ] = await Promise.all([
          getTotalViews(),
          getHourlyAnalytics(),
          getDayOfWeekAnalytics(),
          getDailyAnalytics(),
          getMonthlyAnalytics(),
          getWeeklyAnalytics(),
          getDeviceAnalytics(),
          getBrowserAnalytics(),
          getReferrerAnalytics(),
          getRecentAccess(),
          getFunnelAnalytics(),
        ]);

        setTotalViews(total);
        setHourlyData(hourly);
        setDailyData(dayOfWeek);
        setDateData(date);
        setMonthlyData(monthly);
        setWeeklyData(weekly);
        setDeviceData(device);
        setBrowserData(browser);
        setReferrerData(referrer);
        setRecentAccess(recent);
        setFunnelData(funnel);

        // ページ別PVも取得
        const pages = [
          "/",
          "/services",
          "/blog",
          "/contact",
          "/what-is-coaching",
        ];
        const pageViewsData: { [key: string]: number } = {};
        for (const page of pages) {
          pageViewsData[page] = await getPageViews(page);
        }
        setPageViews(pageViewsData);
      } catch (error) {
        console.error("分析データ読み込みエラー:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  // 新規・リピーター別集計
  useEffect(() => {
    const analyzeUserType = async () => {
      const analytics = await getAnalyticsData();
      const conversions = getLineConversions();
      // 新規: visit_count===1, リピーター: visit_count>1
      const isNew = userTypeTab === "new";
      // ファネル（流入元ごと）
      const funnel: {
        [source: string]: {
          platform: string;
          inflow: number;
          conversion: number;
        };
      } = {};
      analytics.forEach((item) => {
        if (
          (isNew && item.visit_count === 1) ||
          (!isNew && item.visit_count > 1)
        ) {
          const { source, platform } = analyzeReferrer(item.referrer);
          if (!funnel[source])
            funnel[source] = { platform, inflow: 0, conversion: 0 };
          funnel[source].inflow += 1;
        }
      });
      conversions.forEach((event) => {
        if (
          (isNew && event.visit_count === 1) ||
          (!isNew && event.visit_count > 1)
        ) {
          const { source, platform } = analyzeReferrer(event.referrer);
          if (!funnel[source])
            funnel[source] = { platform, inflow: 0, conversion: 0 };
          funnel[source].conversion += 1;
        }
      });
      setUserFunnel(
        Object.entries(funnel)
          .map(([source, data]) => ({ source, ...data }))
          .sort((a, b) => b.inflow - a.inflow)
      );
      // 離脱ページ（最終アクセスページ）
      const lastPageMap: { [userId: string]: { page: string } } = {};
      analytics.forEach((item) => {
        if (
          (isNew && item.visit_count === 1) ||
          (!isNew && item.visit_count > 1)
        ) {
          lastPageMap[item.user_id] = { page: item.page_path };
        }
      });
      const leavingCount: { [page: string]: number } = {};
      Object.values(lastPageMap).forEach(({ page }) => {
        leavingCount[page] = (leavingCount[page] || 0) + 1;
      });
      setUserLeaving(
        Object.entries(leavingCount)
          .map(([page, count]) => ({ page, count }))
          .sort((a, b) => b.count - a.count)
      );
    };
    analyzeUserType();
  }, [userTypeTab, dateData]);

  // カスタム期間・比較用データ生成
  const getPeriodData = (
    data: { date: string; count: number }[],
    start: Date,
    end: Date
  ) => {
    return data.filter((d) => {
      const dt = new Date(d.date);
      return isWithinInterval(dt, { start, end });
    });
  };
  const periodData = getPeriodData(dateData, startDate, endDate);
  const compareData = getPeriodData(dateData, compareStart, compareEnd);
  const periodSum = periodData.reduce((a, b) => a + b.count, 0);
  const compareSum = compareData.reduce((a, b) => a + b.count, 0);
  const diff = periodSum - compareSum;
  const diffRate = compareSum > 0 ? Math.round((diff / compareSum) * 100) : 0;

  // 比較ボタンの挙動
  const handleCompare = (type: "prevWeek" | "prevMonth" | "prevYear") => {
    setCompareTab(type);
    if (type === "prevWeek") {
      setCompareStart(subWeeks(startDate, 1));
      setCompareEnd(subWeeks(endDate, 1));
    } else if (type === "prevMonth") {
      setCompareStart(subMonths(startDate, 1));
      setCompareEnd(subMonths(endDate, 1));
    } else if (type === "prevYear") {
      setCompareStart(subMonths(startDate, 12));
      setCompareEnd(subMonths(endDate, 12));
    }
  };

  const getDayName = (day: number) => {
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    return days[day];
  };

  const getDeviceName = (device: string) => {
    const names: { [key: string]: string } = {
      desktop: "デスクトップ",
      mobile: "モバイル",
      tablet: "タブレット",
    };
    return names[device] || device;
  };

  const getSourceIcon = (source: string) => {
    const icons: { [key: string]: string } = {
      instagram: "📷",
      x: "🐦",
      tiktok: "🎵",
      note: "📝",
      youtube: "📺",
      facebook: "📘",
      google: "🔍",
      yahoo: "🔍",
      direct: "🌐",
      other: "🌐",
    };
    return icons[source] || "🌐";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMonth = (monthString: string) => {
    const [year, month] = monthString.split("-");
    return `${year}年${month}月`;
  };

  const formatWeek = (weekString: string) => {
    const [year, week] = weekString.split("-W");
    return `${year}年第${week}週`;
  };

  // AIインサイト生成
  const aiInsights = generateAIInsights({
    dateData,
    monthlyData,
    weeklyData,
    referrerData,
    deviceData,
    browserData,
    totalViews,
    funnelData,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">分析データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* --- AIインサイト自動要約 --- */}
            <div className="bg-gradient-to-r from-yellow-100 to-blue-50 border-b border-yellow-300 px-6 py-5 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1">
                <div className="text-lg font-bold text-yellow-700 mb-1">
                  AIインサイト
                </div>
                <div className="text-gray-800 whitespace-pre-line leading-relaxed">
                  {aiInsights.summary}
                </div>
              </div>
              <div className="md:w-80 mt-2 md:mt-0">
                <div className="text-sm font-semibold text-blue-700 mb-1">
                  AIからの改善提案
                </div>
                <div className="text-blue-900 whitespace-pre-line leading-relaxed">
                  {aiInsights.suggestion}
                </div>
              </div>
            </div>
            {aiInsights.anomaly && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 mb-4 font-bold text-lg flex items-center">
                <span className="mr-2">⚠️</span>
                {aiInsights.anomaly.message}
              </div>
            )}
            {/* --- 既存のダッシュボード --- */}
            {/* ヘッダー */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <h1 className="text-3xl font-bold mb-2">
                アクセス分析ダッシュボード
              </h1>
              <p className="text-blue-100">リアルタイムアクセス統計と分析</p>
            </div>

            {/* タブナビゲーション */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {[
                  { id: "overview", name: "概要", icon: "📊" },
                  { id: "compare", name: "期間比較", icon: "📈" },
                  { id: "funnel", name: "ファネル", icon: "🔄" },
                  { id: "date", name: "日付", icon: "📅" },
                  { id: "monthly", name: "月別", icon: "📆" },
                  { id: "weekly", name: "週別", icon: "📋" },
                  { id: "hourly", name: "時間帯", icon: "⏰" },
                  { id: "daily", name: "曜日", icon: "🗓️" },
                  { id: "device", name: "デバイス", icon: "📱" },
                  { id: "browser", name: "ブラウザ", icon: "🌐" },
                  { id: "referrer", name: "流入元", icon: "🔗" },
                  { id: "recent", name: "最近のアクセス", icon: "🕒" },
                  { id: "userType", name: "新規/リピーター", icon: "👤" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* タブコンテンツ */}
            <div className="p-6">
              {/* 概要タブ */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center">
                        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                          <span className="text-2xl">👥</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-blue-100 text-sm">総アクセス数</p>
                          <p className="text-3xl font-bold">
                            {totalViews.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center">
                        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                          <span className="text-2xl">📱</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-green-100 text-sm">
                            モバイルアクセス
                          </p>
                          <p className="text-3xl font-bold">
                            {deviceData.find((d) => d.device === "mobile")
                              ?.count || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center">
                        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                          <span className="text-2xl">🔗</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-purple-100 text-sm">SNS流入</p>
                          <p className="text-3xl font-bold">
                            {referrerData
                              .filter((r) =>
                                [
                                  "instagram",
                                  "x",
                                  "tiktok",
                                  "note",
                                  "youtube",
                                ].includes(r.source)
                              )
                              .reduce((sum, r) => sum + r.count, 0)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center">
                        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                          <span className="text-2xl">🌐</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-orange-100 text-sm">
                            ブラウザ種類
                          </p>
                          <p className="text-3xl font-bold">
                            {browserData.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">
                        ページ別アクセス数
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(pageViews).map(([page, views]) => (
                          <div
                            key={page}
                            className="flex justify-between items-center"
                          >
                            <span className="text-gray-600">
                              {page === "/"
                                ? "ホーム"
                                : page === "/services"
                                ? "サービス"
                                : page === "/blog"
                                ? "ブログ"
                                : page === "/contact"
                                ? "お問い合わせ"
                                : page === "/what-is-coaching"
                                ? "コーチングとは"
                                : page}
                            </span>
                            <span className="font-semibold">
                              {views.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">
                        トップ流入元
                      </h3>
                      <div className="space-y-3">
                        {referrerData.slice(0, 5).map((item, index) => (
                          <div
                            key={item.source}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center">
                              <span className="mr-2">
                                {getSourceIcon(item.source)}
                              </span>
                              <span className="text-gray-600">
                                {item.platform}
                              </span>
                            </div>
                            <span className="font-semibold">
                              {item.count.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 期間比較タブ */}
              {activeTab === "compare" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      カスタム期間・比較分析
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">開始日</div>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date!)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          maxDate={endDate}
                          dateFormat="yyyy/MM/dd"
                          className="border rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">終了日</div>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date!)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          maxDate={new Date()}
                          dateFormat="yyyy/MM/dd"
                          className="border rounded px-2 py-1"
                        />
                      </div>
                      <div className="flex gap-2 ml-2">
                        <button
                          onClick={() => handleCompare("prevWeek")}
                          className={`px-3 py-1 rounded border ${
                            compareTab === "prevWeek"
                              ? "bg-blue-100 border-blue-400"
                              : "border-gray-300"
                          }`}
                        >
                          前週と比較
                        </button>
                        <button
                          onClick={() => handleCompare("prevMonth")}
                          className={`px-3 py-1 rounded border ${
                            compareTab === "prevMonth"
                              ? "bg-blue-100 border-blue-400"
                              : "border-gray-300"
                          }`}
                        >
                          前月と比較
                        </button>
                        <button
                          onClick={() => handleCompare("prevYear")}
                          className={`px-3 py-1 rounded border ${
                            compareTab === "prevYear"
                              ? "bg-blue-100 border-blue-400"
                              : "border-gray-300"
                          }`}
                        >
                          前年同週と比較
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 items-end">
                      <div className="flex-1">
                        <div className="mb-2 text-sm text-gray-600">
                          選択期間: {format(startDate, "yyyy/MM/dd")}〜
                          {format(endDate, "yyyy/MM/dd")}
                        </div>
                        <div className="bg-blue-100 rounded p-4 text-center">
                          <div className="text-2xl font-bold text-blue-700">
                            {periodSum.toLocaleString()}件
                          </div>
                          <div className="text-sm text-gray-700">
                            アクセス数
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 text-sm text-gray-600">
                          比較期間: {format(compareStart, "yyyy/MM/dd")}〜
                          {format(compareEnd, "yyyy/MM/dd")}
                        </div>
                        <div className="bg-gray-100 rounded p-4 text-center">
                          <div className="text-2xl font-bold text-gray-700">
                            {compareSum.toLocaleString()}件
                          </div>
                          <div className="text-sm text-gray-700">
                            アクセス数
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 text-sm text-gray-600">増減</div>
                        <div className="rounded p-4 text-center">
                          <div
                            className={`text-2xl font-bold ${
                              diff >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {diff >= 0 ? "+" : ""}
                            {diff.toLocaleString()}件
                          </div>
                          <div
                            className={`text-sm font-bold ${
                              diffRate >= 0 ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {diffRate >= 0 ? "+" : ""}
                            {diffRate}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ファネル分析タブ */}
              {activeTab === "funnel" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      流入元別ファネル分析
                    </h3>
                    <p className="text-gray-600 mb-6">
                      流入→閲覧→LINE登録（成果）までの到達率を分析
                    </p>

                    <div className="space-y-6">
                      {funnelData.map((item, index) => {
                        const viewRate =
                          item.inflow > 0
                            ? ((item.view / item.inflow) * 100).toFixed(1)
                            : "0";
                        const conversionRate =
                          item.view > 0
                            ? ((item.conversion / item.view) * 100).toFixed(1)
                            : "0";
                        const overallRate =
                          item.inflow > 0
                            ? ((item.conversion / item.inflow) * 100).toFixed(1)
                            : "0";

                        return (
                          <div
                            key={item.source}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-center mb-4">
                              <span className="text-2xl mr-3">
                                {getSourceIcon(item.source)}
                              </span>
                              <div>
                                <h4 className="font-semibold text-lg">
                                  {item.platform}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  総流入: {item.inflow.toLocaleString()}件
                                </p>
                              </div>
                            </div>

                            {/* ファネルグラフ */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="text-center">
                                <div className="bg-blue-500 text-white p-3 rounded-lg mb-2">
                                  <div className="text-2xl font-bold">
                                    {item.inflow.toLocaleString()}
                                  </div>
                                  <div className="text-sm">流入</div>
                                </div>
                                <div className="text-xs text-gray-600">
                                  100%
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="bg-green-500 text-white p-3 rounded-lg mb-2">
                                  <div className="text-2xl font-bold">
                                    {item.view.toLocaleString()}
                                  </div>
                                  <div className="text-sm">閲覧</div>
                                </div>
                                <div className="text-xs text-gray-600">
                                  {viewRate}%
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="bg-purple-500 text-white p-3 rounded-lg mb-2">
                                  <div className="text-2xl font-bold">
                                    {item.conversion.toLocaleString()}
                                  </div>
                                  <div className="text-sm">LINE登録</div>
                                </div>
                                <div className="text-xs text-gray-600">
                                  {overallRate}%
                                </div>
                              </div>
                            </div>

                            {/* 詳細分析 */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="bg-gray-50 p-3 rounded">
                                <div className="font-semibold text-gray-700">
                                  閲覧率
                                </div>
                                <div className="text-2xl font-bold text-green-600">
                                  {viewRate}%
                                </div>
                                <div className="text-xs text-gray-500">
                                  {item.inflow - item.view}件離脱
                                </div>
                              </div>

                              <div className="bg-gray-50 p-3 rounded">
                                <div className="font-semibold text-gray-700">
                                  LINE登録率
                                </div>
                                <div className="text-2xl font-bold text-purple-600">
                                  {conversionRate}%
                                </div>
                                <div className="text-xs text-gray-500">
                                  {item.view - item.conversion}件離脱
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 日付タブ */}
              {activeTab === "date" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      日付別アクセス数
                    </h3>
                    <div className="space-y-4">
                      {dateData
                        .slice(-10)
                        .reverse()
                        .map((item, index) => (
                          <div key={item.date} className="flex items-center">
                            <div className="w-32 text-sm text-gray-600">
                              {formatDate(item.date)}
                            </div>
                            <div className="flex-1 ml-4">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">アクセス数</span>
                                <span className="text-gray-600">
                                  {item.count.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${Math.max(
                                      (item.count /
                                        Math.max(
                                          ...dateData.map((d) => d.count),
                                          1
                                        )) *
                                        100,
                                      5
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 月別タブ */}
              {activeTab === "monthly" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      月別アクセス数
                    </h3>
                    <div className="space-y-4">
                      {monthlyData.map((item, index) => (
                        <div key={item.month} className="flex items-center">
                          <div className="w-32 text-sm text-gray-600">
                            {formatMonth(item.month)}
                          </div>
                          <div className="flex-1 ml-4">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">アクセス数</span>
                              <span className="text-gray-600">
                                {item.count.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${Math.max(
                                    (item.count /
                                      Math.max(
                                        ...monthlyData.map((d) => d.count),
                                        1
                                      )) *
                                      100,
                                    5
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 週別タブ */}
              {activeTab === "weekly" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      週別アクセス数
                    </h3>
                    <div className="space-y-4">
                      {weeklyData
                        .slice(-8)
                        .reverse()
                        .map((item, index) => (
                          <div key={item.week} className="flex items-center">
                            <div className="w-32 text-sm text-gray-600">
                              {formatWeek(item.week)}
                            </div>
                            <div className="flex-1 ml-4">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">アクセス数</span>
                                <span className="text-gray-600">
                                  {item.count.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${Math.max(
                                      (item.count /
                                        Math.max(
                                          ...weeklyData.map((d) => d.count),
                                          1
                                        )) *
                                        100,
                                      5
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 時間帯タブ */}
              {activeTab === "hourly" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      時間帯別アクセス数
                    </h3>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                      {Array.from({ length: 24 }, (_, i) => {
                        const data = hourlyData.find((d) => d.hour === i);
                        const count = data?.count || 0;
                        const maxCount = Math.max(
                          ...hourlyData.map((d) => d.count),
                          1
                        );
                        const height = (count / maxCount) * 100;

                        return (
                          <div key={i} className="text-center">
                            <div className="bg-gray-200 rounded-t h-32 relative">
                              <div
                                className="bg-blue-500 rounded-t absolute bottom-0 w-full transition-all duration-300"
                                style={{ height: `${height}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{i}時</p>
                            <p className="text-xs font-semibold">{count}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 曜日タブ */}
              {activeTab === "daily" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      曜日別アクセス数
                    </h3>
                    <div className="grid grid-cols-7 gap-4">
                      {Array.from({ length: 7 }, (_, i) => {
                        const data = dailyData.find((d) => d.day === i);
                        const count = data?.count || 0;
                        const maxCount = Math.max(
                          ...dailyData.map((d) => d.count),
                          1
                        );
                        const height = (count / maxCount) * 100;

                        return (
                          <div key={i} className="text-center">
                            <div className="bg-gray-200 rounded-t h-32 relative">
                              <div
                                className="bg-green-500 rounded-t absolute bottom-0 w-full transition-all duration-300"
                                style={{ height: `${height}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {getDayName(i)}
                            </p>
                            <p className="text-sm font-semibold">{count}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* デバイスタブ */}
              {activeTab === "device" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      デバイス別アクセス数
                    </h3>
                    <div className="space-y-4">
                      {deviceData.map((item, index) => {
                        const total = deviceData.reduce(
                          (sum, d) => sum + d.count,
                          0
                        );
                        const percentage =
                          total > 0
                            ? ((item.count / total) * 100).toFixed(1)
                            : "0";

                        return (
                          <div key={item.device} className="flex items-center">
                            <div className="w-16 text-center">
                              <span className="text-2xl">
                                {item.device === "mobile"
                                  ? "📱"
                                  : item.device === "tablet"
                                  ? "📱"
                                  : "💻"}
                              </span>
                            </div>
                            <div className="flex-1 ml-4">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">
                                  {getDeviceName(item.device)}
                                </span>
                                <span className="text-gray-600">
                                  {item.count.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {percentage}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ブラウザタブ */}
              {activeTab === "browser" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      ブラウザ別アクセス数
                    </h3>
                    <div className="space-y-4">
                      {browserData.map((item, index) => {
                        const total = browserData.reduce(
                          (sum, b) => sum + b.count,
                          0
                        );
                        const percentage =
                          total > 0
                            ? ((item.count / total) * 100).toFixed(1)
                            : "0";

                        return (
                          <div key={item.browser} className="flex items-center">
                            <div className="w-16 text-center">
                              <span className="text-2xl">🌐</span>
                            </div>
                            <div className="flex-1 ml-4">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">
                                  {item.browser}
                                </span>
                                <span className="text-gray-600">
                                  {item.count.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {percentage}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 流入元タブ */}
              {activeTab === "referrer" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      SNS・流入元別アクセス数
                    </h3>
                    <div className="space-y-4">
                      {referrerData.map((item, index) => {
                        const total = referrerData.reduce(
                          (sum, r) => sum + r.count,
                          0
                        );
                        const percentage =
                          total > 0
                            ? ((item.count / total) * 100).toFixed(1)
                            : "0";

                        return (
                          <div key={item.source} className="flex items-center">
                            <div className="w-16 text-center">
                              <span className="text-2xl">
                                {getSourceIcon(item.source)}
                              </span>
                            </div>
                            <div className="flex-1 ml-4">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">
                                  {item.platform}
                                </span>
                                <span className="text-gray-600">
                                  {item.count.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {percentage}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <h4 className="text-lg font-semibold mb-4">
                        SNS流入詳細
                      </h4>
                      <div className="space-y-3">
                        {referrerData
                          .filter((r) =>
                            [
                              "instagram",
                              "x",
                              "tiktok",
                              "note",
                              "youtube",
                            ].includes(r.source)
                          )
                          .map((item) => (
                            <div
                              key={item.source}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center">
                                <span className="mr-3 text-xl">
                                  {getSourceIcon(item.source)}
                                </span>
                                <span>{item.platform}</span>
                              </div>
                              <span className="font-semibold text-blue-600">
                                {item.count.toLocaleString()}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <h4 className="text-lg font-semibold mb-4">
                        検索エンジン流入
                      </h4>
                      <div className="space-y-3">
                        {referrerData
                          .filter((r) => ["google", "yahoo"].includes(r.source))
                          .map((item) => (
                            <div
                              key={item.source}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center">
                                <span className="mr-3 text-xl">
                                  {getSourceIcon(item.source)}
                                </span>
                                <span>{item.platform}</span>
                              </div>
                              <span className="font-semibold text-green-600">
                                {item.count.toLocaleString()}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 最近のアクセスタブ */}
              {activeTab === "recent" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      最近のアクセス（最新20件）
                    </h3>
                    <div className="space-y-3">
                      {recentAccess.length > 0 ? (
                        recentAccess.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="text-center">
                                <div className="text-sm text-gray-500">
                                  {formatDate(item.timestamp)}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {formatTime(item.timestamp)}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">
                                  {getSourceIcon(
                                    analyzeReferrer(item.referrer).source
                                  )}
                                </span>
                                <span className="text-sm font-medium">
                                  {analyzeReferrer(item.referrer).platform}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600">
                                {item.page_path === "/"
                                  ? "ホーム"
                                  : item.page_path === "/services"
                                  ? "サービス"
                                  : item.page_path === "/blog"
                                  ? "ブログ"
                                  : item.page_path === "/contact"
                                  ? "お問い合わせ"
                                  : item.page_path === "/what-is-coaching"
                                  ? "コーチングとは"
                                  : item.page_path}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{getDeviceName(item.device_type)}</span>
                              <span>•</span>
                              <span>{item.browser}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>アクセスデータがありません</p>
                          <p className="text-sm mt-2">
                            ページを訪問すると、ここに表示されます
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 新規・リピーター別分析タブ */}
              {activeTab === "userType" && (
                <div className="space-y-6">
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => setUserTypeTab("new")}
                      className={`px-4 py-2 rounded ${
                        userTypeTab === "new"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      新規ユーザー
                    </button>
                    <button
                      onClick={() => setUserTypeTab("repeat")}
                      className={`px-4 py-2 rounded ${
                        userTypeTab === "repeat"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      リピーター
                    </button>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      {userTypeTab === "new" ? "新規" : "リピーター"}
                      ユーザーの流入元・LINE登録率
                    </h3>
                    <div className="space-y-6">
                      {userFunnel.map((item, index) => {
                        const conversionRate =
                          item.inflow > 0
                            ? ((item.conversion / item.inflow) * 100).toFixed(1)
                            : "0";
                        return (
                          <div
                            key={item.source}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-center mb-2">
                              <span className="text-2xl mr-3">
                                {getSourceIcon(item.source)}
                              </span>
                              <div>
                                <h4 className="font-semibold text-lg">
                                  {item.platform}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  流入: {item.inflow.toLocaleString()}件 /
                                  LINE登録: {item.conversion.toLocaleString()}件
                                </p>
                              </div>
                            </div>
                            <div className="text-sm text-gray-700">
                              LINE登録率:{" "}
                              <span className="font-bold text-blue-700">
                                {conversionRate}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      {userTypeTab === "new" ? "新規" : "リピーター"}
                      ユーザーの離脱ページ
                    </h3>
                    <div className="space-y-2">
                      {userLeaving.map((item, idx) => (
                        <div
                          key={item.page}
                          className="flex justify-between items-center border-b py-2"
                        >
                          <span className="text-gray-700">
                            {item.page === "/" ? "ホーム" : item.page}
                          </span>
                          <span className="text-gray-500">{item.count}人</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
