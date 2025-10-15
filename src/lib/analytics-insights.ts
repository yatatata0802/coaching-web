import { AnalyticsData } from "../types/analytics";

interface SourceAnalysisResult {
  source: string;
  platform: string;
  inflowCount: number;
  exitPages: { page: string; count: number }[];
  conversionPages: { page: string; count: number }[];
  conversionRate: number;
}

/**
 * Supabaseの利用停止に伴い、この機能は現在利用できません。
 * 呼び出し元でのエラーを防ぐため、常に空の配列を返します。
 */
export const analyzeSourcePerformance = (
  analyticsData: AnalyticsData[],
  lineConversions: AnalyticsData[]
): SourceAnalysisResult[] => {
  // Supabaseの機能を利用していたため、現在は機能しない。
  // エラーを防ぐために空の配列を返す。
  return [];
};