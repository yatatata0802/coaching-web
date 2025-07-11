import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Clock,
  Monitor,
  Globe,
  Smartphone,
  TrendingUp,
  Lock,
  X,
  LogOut,
} from "lucide-react";
import { isAdmin } from "../lib/admin";
import {
  getHourlyAnalytics,
  getDayOfWeekAnalytics,
  getDeviceAnalytics,
  getBrowserAnalytics,
} from "../lib/supabase";
import {
  HourlyData,
  DayOfWeekData,
  DeviceData,
  BrowserData,
} from "../types/analytics";

const AdminAnalyticsDashboard: React.FC = () => {
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [dailyData, setDailyData] = useState<DayOfWeekData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [browserData, setBrowserData] = useState<BrowserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "hourly" | "daily" | "device" | "browser"
  >("hourly");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = isAdmin();
      setIsAdminUser(adminStatus);

      if (!adminStatus) {
        setIsExpanded(false);
      }
    };

    checkAdminStatus();

    // URL変更を監視
    const handleUrlChange = () => {
      checkAdminStatus();
    };

    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  useEffect(() => {
    if (!isAdminUser) return;

    const fetchAnalytics = async () => {
      try {
        const [hourly, daily, device, browser] = await Promise.all([
          getHourlyAnalytics(),
          getDayOfWeekAnalytics(),
          getDeviceAnalytics(),
          getBrowserAnalytics(),
        ]);

        setHourlyData(hourly);
        setDailyData(daily);
        setDeviceData(device);
        setBrowserData(browser);
      } catch (error) {
        console.error("分析データ取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [isAdminUser]);

  const handleLogout = () => {
    // 管理者ページから離れる
    window.location.href = "/";
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

  const getMaxValue = (data: { count: number }[]): number => {
    return Math.max(...data.map((item) => item.count), 1);
  };

  // 管理者でない場合は何も表示しない
  if (!isAdminUser) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 最小化状態 */}
      {!isExpanded && (
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-4 py-3 bg-[#d4af37] text-[#181818] rounded-xl shadow-lg hover:bg-[#ffd700] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lock size={16} />
          <span className="text-sm font-bold">管理者分析</span>
        </motion.button>
      )}

      {/* 展開状態 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-black/95 backdrop-blur-sm border border-[#d4af37]/30 rounded-2xl p-6 shadow-2xl w-80 max-h-96 overflow-y-auto"
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 size={20} className="text-[#d4af37]" />
                <h3 className="text-lg font-bold text-[#d4af37]">管理者分析</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="ログアウト"
                >
                  <LogOut size={16} />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="最小化"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-gray-400">分析データを読み込み中...</div>
              </div>
            ) : (
              <>
                {/* タブ切り替え */}
                <div className="flex gap-1 mb-4">
                  <button
                    onClick={() => setActiveTab("hourly")}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
                      activeTab === "hourly"
                        ? "bg-[#d4af37] text-[#181818]"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <Clock size={12} />
                    時間
                  </button>
                  <button
                    onClick={() => setActiveTab("daily")}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
                      activeTab === "daily"
                        ? "bg-[#d4af37] text-[#181818]"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <Globe size={12} />
                    曜日
                  </button>
                  <button
                    onClick={() => setActiveTab("device")}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
                      activeTab === "device"
                        ? "bg-[#d4af37] text-[#181818]"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <Monitor size={12} />
                    デバイス
                  </button>
                  <button
                    onClick={() => setActiveTab("browser")}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
                      activeTab === "browser"
                        ? "bg-[#d4af37] text-[#181818]"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <TrendingUp size={12} />
                    ブラウザ
                  </button>
                </div>

                {/* 分析データ表示 */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {activeTab === "hourly" && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-300 mb-3">
                          時間帯別アクセス数
                        </h4>
                        <div className="space-y-1">
                          {hourlyData.map((item) => {
                            const percentage =
                              (item.count / getMaxValue(hourlyData)) * 100;
                            return (
                              <div
                                key={item.hour}
                                className="flex items-center gap-2"
                              >
                                <div className="w-10 text-xs text-gray-400">
                                  {item.hour.toString().padStart(2, "0")}:00
                                </div>
                                <div className="flex-1">
                                  <div className="bg-gray-700 rounded-full h-1.5">
                                    <div
                                      className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-1.5 rounded-full transition-all duration-500"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="w-6 text-xs text-gray-300 text-right">
                                  {item.count}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {activeTab === "daily" && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-300 mb-3">
                          曜日別アクセス数
                        </h4>
                        <div className="space-y-1">
                          {dailyData.map((item) => {
                            const percentage =
                              (item.count / getMaxValue(dailyData)) * 100;
                            return (
                              <div
                                key={item.day}
                                className="flex items-center gap-2"
                              >
                                <div className="w-6 text-xs text-gray-400">
                                  {getDayName(item.day)}
                                </div>
                                <div className="flex-1">
                                  <div className="bg-gray-700 rounded-full h-1.5">
                                    <div
                                      className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-1.5 rounded-full transition-all duration-500"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="w-6 text-xs text-gray-300 text-right">
                                  {item.count}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {activeTab === "device" && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-300 mb-3">
                          デバイス別アクセス数
                        </h4>
                        <div className="space-y-1">
                          {deviceData.map((item) => {
                            const percentage =
                              (item.count / getMaxValue(deviceData)) * 100;
                            return (
                              <div
                                key={item.device}
                                className="flex items-center gap-2"
                              >
                                <div className="w-16 flex items-center gap-1 text-xs text-gray-400">
                                  {getDeviceIcon(item.device)}
                                  {item.device === "desktop"
                                    ? "PC"
                                    : item.device === "mobile"
                                    ? "スマホ"
                                    : "タブレット"}
                                </div>
                                <div className="flex-1">
                                  <div className="bg-gray-700 rounded-full h-1.5">
                                    <div
                                      className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-1.5 rounded-full transition-all duration-500"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="w-6 text-xs text-gray-300 text-right">
                                  {item.count}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {activeTab === "browser" && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-300 mb-3">
                          ブラウザ別アクセス数
                        </h4>
                        <div className="space-y-1">
                          {browserData.map((item) => {
                            const percentage =
                              (item.count / getMaxValue(browserData)) * 100;
                            return (
                              <div
                                key={item.browser}
                                className="flex items-center gap-2"
                              >
                                <div className="w-16 text-xs text-gray-400">
                                  {item.browser}
                                </div>
                                <div className="flex-1">
                                  <div className="bg-gray-700 rounded-full h-1.5">
                                    <div
                                      className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-1.5 rounded-full transition-all duration-500"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="w-6 text-xs text-gray-300 text-right">
                                  {item.count}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAnalyticsDashboard;
