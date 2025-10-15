import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Clock,
  Monitor,
  Globe,
  Smartphone,
  TrendingUp,
} from "lucide-react";
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

const AnalyticsDashboard: React.FC = () => {
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [dailyData, setDailyData] = useState<DayOfWeekData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [browserData, setBrowserData] = useState<BrowserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "hourly" | "daily" | "device" | "browser"
  >("hourly");

  useEffect(() => {
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
        // console.error("分析データ取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">分析データを読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={20} className="text-[#d4af37]" />
        <h3 className="text-lg font-bold text-[#d4af37]">アクセス分析</h3>
      </div>

      {/* タブ切り替え */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("hourly")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
            activeTab === "hourly"
              ? "bg-[#d4af37] text-[#181818]"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <Clock size={14} />
          時間帯
        </button>
        <button
          onClick={() => setActiveTab("daily")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
            activeTab === "daily"
              ? "bg-[#d4af37] text-[#181818]"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <Globe size={14} />
          曜日
        </button>
        <button
          onClick={() => setActiveTab("device")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
            activeTab === "device"
              ? "bg-[#d4af37] text-[#181818]"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <Monitor size={14} />
          デバイス
        </button>
        <button
          onClick={() => setActiveTab("browser")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
            activeTab === "browser"
              ? "bg-[#d4af37] text-[#181818]"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <TrendingUp size={14} />
          ブラウザ
        </button>
      </div>

      {/* 分析データ表示 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {activeTab === "hourly" && (
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                時間帯別アクセス数
              </h4>
              <div className="space-y-2">
                {hourlyData.map((item) => {
                  const percentage =
                    (item.count / getMaxValue(hourlyData)) * 100;
                  return (
                    <div key={item.hour} className="flex items-center gap-3">
                      <div className="w-12 text-sm text-gray-400">
                        {item.hour.toString().padStart(2, "0")}:00
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-8 text-sm text-gray-300 text-right">
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
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                曜日別アクセス数
              </h4>
              <div className="space-y-2">
                {dailyData.map((item) => {
                  const percentage =
                    (item.count / getMaxValue(dailyData)) * 100;
                  return (
                    <div key={item.day} className="flex items-center gap-3">
                      <div className="w-8 text-sm text-gray-400">
                        {getDayName(item.day)}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-8 text-sm text-gray-300 text-right">
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
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                デバイス別アクセス数
              </h4>
              <div className="space-y-2">
                {deviceData.map((item) => {
                  const percentage =
                    (item.count / getMaxValue(deviceData)) * 100;
                  return (
                    <div key={item.device} className="flex items-center gap-3">
                      <div className="w-20 flex items-center gap-2 text-sm text-gray-400">
                        {getDeviceIcon(item.device)}
                        {item.device === "desktop"
                          ? "PC"
                          : item.device === "mobile"
                          ? "スマホ"
                          : "タブレット"}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-8 text-sm text-gray-300 text-right">
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
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                ブラウザ別アクセス数
              </h4>
              <div className="space-y-2">
                {browserData.map((item) => {
                  const percentage =
                    (item.count / getMaxValue(browserData)) * 100;
                  return (
                    <div key={item.browser} className="flex items-center gap-3">
                      <div className="w-20 text-sm text-gray-400">
                        {item.browser}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-8 text-sm text-gray-300 text-right">
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
    </div>
  );
};

export default AnalyticsDashboard;
