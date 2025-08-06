import {
  DailyData,
  MonthlyData,
  WeeklyData,
  ReferrerData,
  DeviceData,
  BrowserData,
  FunnelData,
} from "../types/analytics";

interface AIInsight {
  summary: string;
  suggestion: string;
  anomaly: { message: string } | null;
}

// 異常検知の閾値を定数として定義
const ANOMALY_DETECTION_CONFIG = {
  MIN_INFLOW_THRESHOLD: 50, // 異常検知を発動する最小流入数
  LOW_CONVERSION_RATE_THRESHOLD: 0.01, // 低コンバージョン率と判断する閾値 (1%)
};

// 簡易的な異常検知ロジック
const detectAnomaly = (
  funnelData: FunnelData[]
): { message: string } | null => {
  const funnelMetrics = funnelData.reduce(
    (acc, cur) => {
      if (cur.inflow > 0) {
        acc.totalInflow += cur.inflow;
        acc.totalConversion += cur.conversion;
      }
      return acc;
    },
    { totalInflow: 0, totalConversion: 0 } as { totalInflow: number; totalConversion: number }
  );

  const { totalInflow, totalConversion } = funnelMetrics;
  const { MIN_INFLOW_THRESHOLD, LOW_CONVERSION_RATE_THRESHOLD } = ANOMALY_DETECTION_CONFIG;

  if (
    totalInflow > MIN_INFLOW_THRESHOLD &&
    totalConversion / totalInflow < LOW_CONVERSION_RATE_THRESHOLD
  ) {
    return {
      message: `全体のコンバージョン率が${(LOW_CONVERSION_RATE_THRESHOLD * 100).toFixed(0)}%未満です。LINE誘導の動線に問題がある可能性があります。`,
    };
  }

  return null;
};

export const generateAIInsights = ({
  dateData,
  monthlyData,
  weeklyData,
  referrerData,
  deviceData,
  browserData,
  totalViews,
  funnelData,
}: {
  dateData: DailyData[];
  monthlyData: MonthlyData[];
  weeklyData: WeeklyData[];
  referrerData: ReferrerData[];
  deviceData: DeviceData[];
  browserData: BrowserData[];
  totalViews: number;
  funnelData: FunnelData[];
}): AIInsight => {
  // サマリー生成
  const last7DaysViews = dateData
    .slice(-7)
    .reduce((acc, cur) => acc + cur.count, 0);
  const prev7DaysViews = dateData
    .slice(-14, -7)
    .reduce((acc, cur) => acc + cur.count, 0);
  const weeklyChange = prev7DaysViews > 0 ? ((last7DaysViews - prev7DaysViews) / prev7DaysViews) * 100 : 0;
  const weeklyChangeText = weeklyChange >= 0 ? `${weeklyChange.toFixed(1)}%増加` : `${Math.abs(weeklyChange).toFixed(1)}%減少`;

  const topReferrer = referrerData.length > 0 ? referrerData[0] : null;
  const topDevice = deviceData.length > 0 ? deviceData[0] : null;

  let summary = `直近7日間のアクセス数は${last7DaysViews}件で、その前の7日間と比較して${weeklyChangeText}しています.\n`;
  if (topReferrer && totalViews > 0) {
    const referrerPercentage = ((topReferrer.count / totalViews) * 100).toFixed(1);
    summary += `最も多い流入元は${topReferrer.platform}からで、全体の${referrerPercentage}%を占めています.\n`;
  }
  if (topDevice) {
    summary += `最も利用されているデバイスは${topDevice.device}です。`;
  }

  // 提案生成
  let suggestion = "";
  if (topReferrer && ["x", "instagram", "note"].includes(topReferrer.source)) {
    suggestion = `SNSからの流入が好調です！特に${topReferrer.platform}での発信を強化し、関連コンテンツを増やすと更なる集客が期待できます。`;
  } else {
    suggestion = "この調子でSNS・SEO施策を継続しましょう！";
  }

  // 異常検知
  const anomaly = detectAnomaly(funnelData);

  return {
    summary,
    suggestion,
    anomaly,
  };
};