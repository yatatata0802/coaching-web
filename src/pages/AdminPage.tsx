import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Clock,
  Monitor,
  Smartphone,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  Activity,
  RefreshCw,
  Funnel,
} from "lucide-react";
import { isAdmin, logoutAdmin } from "../lib/admin";
import {
  getHourlyAnalytics,
  getDayOfWeekAnalytics,
  getDeviceAnalytics,
  getBrowserAnalytics,
  getAnalyticsData,
  getTotalViews,
  resetAnalyticsData,
  incrementPageView,
  getFunnelAnalytics,
  getReferrerAnalytics,
  getPageAnalytics,
  getPageEngagementAnalytics,
  debugLocalStorage,
  getDataSource,
} from "../lib/supabase";
import {
  HourlyData,
  DayOfWeekData,
  DeviceData,
  BrowserData,
  AnalyticsData,
  FunnelData,
  ReferrerData,
} from "../types/analytics";
import SEO from "../components/SEO";

const AdminPage: React.FC = () => {
  const location = useLocation();
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [dailyData, setDailyData] = useState<DayOfWeekData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [browserData, setBrowserData] = useState<BrowserData[]>([]);
  const [totalViews, setTotalViews] = useState<number>(0);
  const [recentData, setRecentData] = useState<AnalyticsData[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelData[]>([]);
  const [referrerData, setReferrerData] = useState<ReferrerData[]>([]);
  const [pageData, setPageData] = useState<
    { page: string; count: number; bounceRate: number }[]
  >([]);
  const [pageEngagementData, setPageEngagementData] = useState<
    { page: string; avgTime: number; sessions: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "hourly"
    | "daily"
    | "device"
    | "browser"
    | "recent"
    | "funnel"
    | "pages"
  >("overview");
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      if (!isAdmin()) {
        window.location.href = "/";
        return;
      }
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHeader(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const results = await Promise.allSettled([
        getHourlyAnalytics(),
        getDayOfWeekAnalytics(),
        getDeviceAnalytics(),
        getBrowserAnalytics(),
        getTotalViews(),
        getAnalyticsData(),
        getFunnelAnalytics(),
        getReferrerAnalytics(),
        getPageAnalytics(),
        getPageEngagementAnalytics(),
      ]);

      if (results[0].status === "fulfilled") setHourlyData(results[0].value);
      if (results[1].status === "fulfilled") setDailyData(results[1].value);
      if (results[2].status === "fulfilled") setDeviceData(results[2].value);
      if (results[3].status === "fulfilled") setBrowserData(results[3].value);
      if (results[4].status === "fulfilled")
        setTotalViews(results[4].value as number);
      if (results[5].status === "fulfilled")
        setRecentData(results[5].value.slice(0, 20)); // 最新20件
      if (results[6].status === "fulfilled") setFunnelData(results[6].value);
      if (results[7].status === "fulfilled") setReferrerData(results[7].value);
      if (results[8].status === "fulfilled") setPageData(results[8].value);
      if (results[9].status === "fulfilled")
        setPageEngagementData(results[9].value);

      results.forEach((result, i) => {
        if (result.status === "rejected") {
          console.error(
            `分析データ取得エラー (Promise.allSettled[${i}]):`,
            result.reason
          );
        }
      });
    } catch (error) {
      console.error("分析データ取得中に予期せぬエラーが発生しました:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // 5分ごとに自動更新
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        setIsRefreshing(true);
        fetchAnalytics();
      }
    }, 5 * 60 * 1000); // 5分

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchAnalytics();
  };

  const handleTestPageView = async () => {
    try {
      await incrementPageView("/admin");
      alert(
        "テストページビューを記録しました。更新ボタンを押して確認してください。"
      );
    } catch (error) {
      console.error("テストページビューエラー:", error);
      alert("テストページビューの記録に失敗しました。");
    }
  };

  const handleDebugData = () => {
    debugLocalStorage();
    alert("デバッグ情報をコンソールに出力しました。F12で確認してください。");
  };

  const handleCheckRealTimeData = () => {
    console.log("🔍 リアルタイムデータ確認開始");

    // 現在のページビューを手動でカウント
    incrementPageView(location.pathname)
      .then(() => {
        console.log("✅ 手動ページビューテスト完了");
        // 少し待ってからデータを再取得
        setTimeout(() => {
          fetchAnalytics();
          console.log("🔄 データ再取得完了");
        }, 1000);
      })
      .catch((error) => {
        console.error("❌ 手動ページビューテストエラー:", error);
      });
  };

  const handleTestAllPages = async () => {
    console.log("🔍 全ページテスト開始");

    const pages = [
      "/",
      "/profile",
      "/services",
      "/contact",
      "/blog",
      "/what-is-coaching",
      "/admin",
    ];

    for (const page of pages) {
      try {
        console.log(`📊 テストページビュー: ${page}`);
        await incrementPageView(page);
        console.log(`✅ テストページビュー完了: ${page}`);
        // 少し待つ
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ テストページビューエラー: ${page}`, error);
      }
    }

    console.log("🔄 全ページテスト完了、データ再取得中...");
    setTimeout(() => {
      fetchAnalytics();
      console.log("✅ 全ページテスト完了");
    }, 1000);
  };

  const getDayName = (day: number): string => {
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    return days[day];
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "desktop":
        return <Monitor size={16} />;
      case "mobile":
        return <Smartphone size={16} />;
      case "tablet":
        return <Monitor size={16} />;
      default:
        return <Monitor size={16} />;
    }
  };

  const getMaxValue = (data: any[]): number => {
    return Math.max(...data.map((item) => item.count), 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ja-JP");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#181818] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mx-auto mb-4"></div>
          <p className="text-gray-400">分析データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#181818] text-white">
      <SEO
        title="管理者分析 | 矢田谷充則のコーチング"
        description="管理者専用のアクセス分析ダッシュボード"
      />

      {/* データソース固定バッジ（ヘッダーに隠れない位置） */}
      <div className="fixed top-20 right-4 z-50">
        <div className="px-3 py-2 rounded-md border border-[#d4af37]/40 bg-black/70 backdrop-blur-sm shadow-lg">
          <div className="text-[10px] text-gray-400 leading-tight">
            データソース
          </div>
          <div className="text-xs font-semibold leading-tight">
            {getDataSource() === "supabase" ? (
              <span className="text-green-400">Supabase（全端末集計）</span>
            ) : (
              <span className="text-red-400">LocalStorage（端末単位）</span>
            )}
          </div>
        </div>
      </div>

      {/* ヘッダー（3秒遅延表示） */}
      {showHeader && (
        <div className="bg-black/50 backdrop-blur-sm border-b border-[#d4af37]/30 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BarChart3 size={32} className="text-[#d4af37]" />
                <div>
                  <h1 className="text-2xl font-bold text-[#d4af37]">
                    管理者分析ダッシュボード
                  </h1>
                  <p className="text-gray-400">リアルタイムアクセス分析</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* データソース表示 */}
                <div className="px-3 py-2 rounded-md border border-[#d4af37]/30 bg-black/40">
                  <div className="text-xs text-gray-400">データソース</div>
                  <div className="text-sm font-semibold">
                    {getDataSource() === "supabase" ? (
                      <span className="text-green-400">
                        Supabase（全端末集計）
                      </span>
                    ) : (
                      <span className="text-red-400">
                        LocalStorage（端末単位）
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#d4af37]">
                    {totalViews.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">累積PV</div>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <RefreshCw
                    size={16}
                    className={isRefreshing ? "animate-spin" : ""}
                  />
                  {isRefreshing ? "更新中..." : "更新"}
                </button>
                <button
                  onClick={handleTestPageView}
                  className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  テストPV追加
                </button>
                <button
                  onClick={handleDebugData}
                  className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  デバッグデータ
                </button>
                <button
                  onClick={handleCheckRealTimeData}
                  className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  リアルタイムデータ確認
                </button>
                <button
                  onClick={handleTestAllPages}
                  className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  全ページテスト
                </button>
                <button
                  onClick={logoutAdmin}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ログアウト
                </button>
                <button
                  onClick={resetAnalyticsData}
                  className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  データをリセット
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ナビゲーション */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-[#d4af37]/20 p-4">
        <div className="max-w-7xl mx-auto">
          {getDataSource() !== "supabase" && (
            <div className="mb-3 p-3 rounded-lg border border-yellow-500/40 bg-yellow-500/10 text-yellow-300 text-sm">
              現在、ローカル保存（端末単位）のデータを表示しています。全端末の合算を表示するには、Vercelの環境変数（VITE_SUPABASE_URL
              / VITE_SUPABASE_ANON_KEY）を設定して再デプロイしてください。
            </div>
          )}
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-[#d4af37] text-[#181818]"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Activity size={16} />
              概要
            </button>
            <button
              onClick={() => setActiveTab("hourly")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === "hourly"
                  ? "bg-[#d4af37] text-[#181818]"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Clock size={16} />
              時間帯分析
            </button>
            <button
              onClick={() => setActiveTab("daily")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === "daily"
                  ? "bg-[#d4af37] text-[#181818]"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Calendar size={16} />
              曜日分析
            </button>
            <button
              onClick={() => setActiveTab("device")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === "device"
                  ? "bg-[#d4af37] text-[#181818]"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Monitor size={16} />
              デバイス分析
            </button>
            <button
              onClick={() => setActiveTab("browser")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === "browser"
                  ? "bg-[#d4af37] text-[#181818]"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <TrendingUp size={16} />
              ブラウザ分析
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === "recent"
                  ? "bg-[#d4af37] text-[#181818]"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Users size={16} />
              最近のアクセス
            </button>
            <button
              onClick={() => setActiveTab("funnel")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === "funnel"
                  ? "bg-[#d4af37] text-[#181818]"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Funnel size={16} />
              ファネル分析
            </button>
            <button
              onClick={() => setActiveTab("pages")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === "pages"
                  ? "bg-[#d4af37] text-[#181818]"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Eye size={16} />
              ページ別分析
            </button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* 統計カード */}
                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Eye size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {totalViews.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">累積PV</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Users size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {recentData.length}
                        </div>
                        <div className="text-sm text-gray-400">
                          最近のアクセス
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Monitor size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {deviceData.length}
                        </div>
                        <div className="text-sm text-gray-400">
                          デバイス種類
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {browserData.length}
                        </div>
                        <div className="text-sm text-gray-400">
                          ブラウザ種類
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* マーケティング指標 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Funnel size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {funnelData.length}
                        </div>
                        <div className="text-sm text-gray-400">流入元数</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Users size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {
                            referrerData.filter(
                              (r) =>
                                r.source === "instagram" ||
                                r.source === "x" ||
                                r.source === "tiktok"
                            ).length
                          }
                        </div>
                        <div className="text-sm text-gray-400">SNS流入</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {
                            referrerData.filter(
                              (r) =>
                                r.source === "google" || r.source === "yahoo"
                            ).length
                          }
                        </div>
                        <div className="text-sm text-gray-400">検索流入</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ページ別重要指標 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Eye size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {pageData.length}
                        </div>
                        <div className="text-sm text-gray-400">
                          アクティブページ数
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Clock size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {pageEngagementData.length > 0
                            ? Math.floor(pageEngagementData[0].avgTime / 60)
                            : 0}
                          分
                        </div>
                        <div className="text-sm text-gray-400">
                          最長滞在時間
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Activity size={24} className="text-[#d4af37]" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {pageData.length > 0
                            ? Math.max(
                                ...pageData.map((p) => p.bounceRate)
                              ).toFixed(1)
                            : 0}
                          %
                        </div>
                        <div className="text-sm text-gray-400">最高離脱率</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hourly" && (
              <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                  時間帯別アクセス数
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hourlyData.map((item) => {
                    const percentage =
                      (item.count / getMaxValue(hourlyData)) * 100;
                    return (
                      <div
                        key={item.hour}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-medium text-white">
                            {item.hour.toString().padStart(2, "0")}:00
                          </span>
                          <span className="text-[#d4af37] font-bold">
                            {item.count}
                          </span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "daily" && (
              <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                  曜日別アクセス数
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dailyData.map((item) => {
                    const percentage =
                      (item.count / getMaxValue(dailyData)) * 100;
                    return (
                      <div
                        key={item.day}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-medium text-white">
                            {getDayName(item.day)}
                          </span>
                          <span className="text-[#d4af37] font-bold">
                            {item.count}
                          </span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "device" && (
              <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                  デバイス別アクセス数
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {deviceData.map((item) => {
                    const percentage =
                      (item.count / getMaxValue(deviceData)) * 100;
                    return (
                      <div
                        key={item.device}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {getDeviceIcon(item.device)}
                          <span className="text-lg font-medium text-white">
                            {item.device === "desktop"
                              ? "PC"
                              : item.device === "mobile"
                              ? "スマホ"
                              : "タブレット"}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-[#d4af37] mb-2">
                          {item.count}
                        </div>
                        <div className="bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "browser" && (
              <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                  ブラウザ別アクセス数
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {browserData.map((item) => {
                    const percentage =
                      (item.count / getMaxValue(browserData)) * 100;
                    return (
                      <div
                        key={item.browser}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="text-lg font-medium text-white mb-3">
                          {item.browser}
                        </div>
                        <div className="text-2xl font-bold text-[#d4af37] mb-2">
                          {item.count}
                        </div>
                        <div className="bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "recent" && (
              <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                  最近のアクセス
                </h2>
                <div className="space-y-4">
                  {recentData.map((item, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(item.device_type)}
                            <span className="text-sm text-gray-400">
                              {item.browser}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">|</span>
                          <span className="text-sm text-gray-400">
                            {item.os}
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      <div className="text-white font-medium">
                        {item.page_path}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        リファラー:{" "}
                        {item.referrer === "direct"
                          ? "直接アクセス"
                          : item.referrer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "funnel" && (
              <div className="space-y-6">
                {/* ファネル分析 */}
                <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                    流入元別ファネル分析
                  </h2>
                  <div className="space-y-4">
                    {funnelData.map((item) => (
                      <div
                        key={item.source}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-medium text-white">
                            {item.platform}
                          </span>
                          <span className="text-sm text-gray-400">
                            {item.source}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-[#d4af37]">
                              {item.inflow}
                            </div>
                            <div className="text-sm text-gray-400">流入数</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-400">
                              {item.view}
                            </div>
                            <div className="text-sm text-gray-400">閲覧数</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-400">
                              {item.conversion}
                            </div>
                            <div className="text-sm text-gray-400">
                              コンバージョン
                            </div>
                          </div>
                        </div>
                        {item.inflow > 0 && (
                          <div className="mt-3">
                            <div className="text-sm text-gray-400 mb-1">
                              コンバージョン率:{" "}
                              {((item.conversion / item.inflow) * 100).toFixed(
                                1
                              )}
                              %
                            </div>
                            <div className="bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                                style={{
                                  width: `${
                                    (item.conversion / item.inflow) * 100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* リファラー分析 */}
                <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                    リファラー別アクセス数
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {referrerData.map((item) => {
                      const percentage =
                        (item.count /
                          Math.max(...referrerData.map((r) => r.count), 1)) *
                        100;
                      return (
                        <div
                          key={item.source}
                          className="bg-gray-800/50 rounded-lg p-4"
                        >
                          <div className="text-lg font-medium text-white mb-3">
                            {item.platform}
                          </div>
                          <div className="text-2xl font-bold text-[#d4af37] mb-2">
                            {item.count}
                          </div>
                          <div className="bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pages" && (
              <div className="space-y-6">
                {/* ページ別アクセス数 */}
                <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                    ページ別アクセス数
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pageData.map((item) => {
                      const percentage =
                        (item.count /
                          Math.max(...pageData.map((p) => p.count), 1)) *
                        100;
                      return (
                        <div
                          key={item.page}
                          className="bg-gray-800/50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-medium text-white">
                              {item.page === "/"
                                ? "ホーム"
                                : item.page === "/profile"
                                ? "プロフィール"
                                : item.page === "/services"
                                ? "サービス"
                                : item.page === "/contact"
                                ? "お問い合わせ"
                                : item.page === "/blog"
                                ? "ブログ"
                                : item.page === "/what-is-coaching"
                                ? "コーチングとは"
                                : item.page}
                            </span>
                            <span className="text-sm text-gray-400">
                              {item.page}
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-[#d4af37] mb-2">
                            {item.count}
                          </div>
                          <div className="bg-gray-700 rounded-full h-2 mb-2">
                            <div
                              className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-400">
                            離脱率: {item.bounceRate.toFixed(1)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ページ別詳細情報 */}
                  <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-3">
                      ページ別詳細情報
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">総ページ数:</span>
                        <span className="text-white ml-2">
                          {pageData.length}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">総アクセス数:</span>
                        <span className="text-white ml-2">
                          {pageData.reduce((sum, item) => sum + item.count, 0)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">平均離脱率:</span>
                        <span className="text-white ml-2">
                          {pageData.length > 0
                            ? (
                                pageData.reduce(
                                  (sum, item) => sum + item.bounceRate,
                                  0
                                ) / pageData.length
                              ).toFixed(1)
                            : 0}
                          %
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">最も人気のページ:</span>
                        <span className="text-white ml-2">
                          {pageData.length > 0
                            ? pageData[0].page === "/"
                              ? "ホーム"
                              : pageData[0].page
                            : "なし"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ページ別エンゲージメント */}
                <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                    ページ別エンゲージメント
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pageEngagementData.slice(0, 9).map((item) => (
                      <div
                        key={item.page}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-medium text-white">
                            {item.page === "/"
                              ? "ホーム"
                              : item.page === "/profile"
                              ? "プロフィール"
                              : item.page === "/services"
                              ? "サービス"
                              : item.page === "/contact"
                              ? "お問い合わせ"
                              : item.page === "/blog"
                              ? "ブログ"
                              : item.page === "/what-is-coaching"
                              ? "コーチングとは"
                              : item.page}
                          </span>
                          <span className="text-sm text-gray-400">
                            {item.page}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-xl font-bold text-blue-400">
                              {Math.floor(item.avgTime / 60)}:
                              {(item.avgTime % 60).toString().padStart(2, "0")}
                            </div>
                            <div className="text-sm text-gray-400">
                              平均滞在時間
                            </div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-green-400">
                              {item.sessions}
                            </div>
                            <div className="text-sm text-gray-400">
                              セッション数
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ページ別分析サマリー */}
                <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[#d4af37] mb-6">
                    ページ別分析サマリー
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-3">
                        最も人気のページ
                      </h3>
                      {pageData.length > 0 && (
                        <div>
                          <div className="text-2xl font-bold text-[#d4af37]">
                            {pageData[0].page === "/"
                              ? "ホーム"
                              : pageData[0].page}
                          </div>
                          <div className="text-sm text-gray-400">
                            {pageData[0].count} アクセス
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-3">
                        最も滞在時間が長いページ
                      </h3>
                      {pageEngagementData.length > 0 && (
                        <div>
                          <div className="text-2xl font-bold text-[#d4af37]">
                            {pageEngagementData[0].page === "/"
                              ? "ホーム"
                              : pageEngagementData[0].page}
                          </div>
                          <div className="text-sm text-gray-400">
                            {Math.floor(pageEngagementData[0].avgTime / 60)}:
                            {(pageEngagementData[0].avgTime % 60)
                              .toString()
                              .padStart(2, "0")}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-3">
                        離脱率が最も高いページ
                      </h3>
                      {pageData.length > 0 && (
                        <div>
                          <div className="text-2xl font-bold text-[#d4af37]">
                            {pageData.find(
                              (p) =>
                                p.bounceRate ===
                                Math.max(...pageData.map((p) => p.bounceRate))
                            )?.page === "/"
                              ? "ホーム"
                              : pageData.find(
                                  (p) =>
                                    p.bounceRate ===
                                    Math.max(
                                      ...pageData.map((p) => p.bounceRate)
                                    )
                                )?.page}
                          </div>
                          <div className="text-sm text-gray-400">
                            {Math.max(
                              ...pageData.map((p) => p.bounceRate)
                            ).toFixed(1)}
                            % 離脱率
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPage;
