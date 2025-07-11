// 分析データの統一された型定義

// 基本の分析データ型
export interface AnalyticsData {
  id: string;
  page_path: string;
  timestamp: string;
  hour: number;
  day_of_week: number;
  referrer: string;
  user_agent: string;
  ip_address?: string;
  country?: string;
  city?: string;
  device_type: "desktop" | "mobile" | "tablet";
  browser: string;
  os: string;
  visit_count?: number; // オプショナル（新規・リピーター判定用）
  user_id?: string; // オプショナル（ユーザー識別用）
}

// 時間別分析データ
export interface HourlyData {
  hour: number;
  count: number;
}

// 日別分析データ（統一：dateを使用）
export interface DailyData {
  date: string; // "2024-01-15" 形式
  count: number;
}

// 曜日別分析データ
export interface DayOfWeekData {
  day: number; // 0-6 (日曜日-土曜日)
  count: number;
}

// 月別分析データ
export interface MonthlyData {
  month: string; // "2024-01" 形式
  count: number;
}

// 週別分析データ
export interface WeeklyData {
  week: string; // "2024-W01" 形式
  count: number;
}

// デバイス別分析データ
export interface DeviceData {
  device: string;
  count: number;
}

// ブラウザ別分析データ
export interface BrowserData {
  browser: string;
  count: number;
}

// リファラー別分析データ
export interface ReferrerData {
  source: string;
  platform: string;
  count: number;
}

// ファネル分析データ
export interface FunnelData {
  source: string;
  platform: string;
  inflow: number;
  view: number;
  conversion: number;
}

// 最近のアクセスデータ
export interface RecentAccessData {
  timestamp: string;
  referrer: string;
  page_path?: string;
  device_type?: string;
  browser?: string;
  os?: string;
}

// ページビューカウント
export interface PageView {
  id: string;
  page_path: string;
  view_count: number;
  last_viewed_at: string;
  created_at: string;
  updated_at: string;
}

// 総ビュー数
export interface TotalViews {
  id: string;
  total_count: number;
  last_updated_at: string;
  created_at: string;
}

// AIインサイト用の引数型
export interface AIInsightsArgs {
  dateData: DailyData[];
  monthlyData: MonthlyData[];
  weeklyData: WeeklyData[];
  referrerData: ReferrerData[];
  deviceData: DeviceData[];
  browserData: BrowserData[];
  totalViews: number;
  funnelData?: FunnelData[];
}

// AIインサイト結果型
export interface AIInsightResult {
  summary: string;
  suggestion: string;
  anomaly: {
    type: string;
    message: string;
  } | null;
}

// リファラー分析結果型
export interface ReferrerAnalysis {
  source: string;
  platform: string;
}
