import React, { useState, useEffect } from "react";
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
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [dailyData, setDailyData] = useState<DayOfWeekData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [browserData, setBrowserData] = useState<BrowserData[]>([]);
  const [totalViews, setTotalViews] = useState<number>(0);
  const [recentData, setRecentData] = useState<AnalyticsData[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelData[]>([]);
  const [referrerData, setReferrerData] = useState<ReferrerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "hourly" | "daily" | "device" | "browser" | "recent" | "funnel"
  >("overview");

  useEffect(() => {
    const checkAdminStatus = () => {
      if (!isAdmin()) {
        window.location.href = "/";
        return;
      }
    };

    checkAdminStatus();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [hourly, daily, device, browser, total, recent, funnel, referrer] =
        await Promise.all([
          getHourlyAnalytics(),
          getDayOfWeekAnalytics(),
          getDeviceAnalytics(),
          getBrowserAnalytics(),
          getTotalViews(),
          getAnalyticsData(),
          getFunnelAnalytics(),
          getReferrerAnalytics(),
        ]);

      setHourlyData(hourly);
      setDailyData(daily);
      setDeviceData(device);
      setBrowserData(browser);
      setTotalViews(total);
      setRecentData(recent.slice(0, 20)); // 最新20件
      setFunnelData(funnel);
      setReferrerData(referrer);
    } catch (error) {
      console.error("分析データ取得エラー:", error);
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

      {/* ヘッダー */}
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

      {/* ナビゲーション */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-[#d4af37]/20 p-4">
        <div className="max-w-7xl mx-auto">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPage;
