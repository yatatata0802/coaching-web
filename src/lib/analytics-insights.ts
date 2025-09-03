import { AnalyticsData } from "../types/analytics";
import { analyzeReferrer } from "./supabase";

interface SourceAnalysisResult {
  source: string;
  platform: string;
  inflowCount: number;
  exitPages: { page: string; count: number }[];
  conversionPages: { page: string; count: number }[];
  conversionRate: number; // (LINE登録数 / 流入数)
}

export const analyzeSourcePerformance = (
  analyticsData: AnalyticsData[],
  lineConversions: AnalyticsData[] // LINE登録イベントのデータ
): SourceAnalysisResult[] => {
  const sourceMap = new Map<
    string,
    {
      platform: string;
      inflowCount: number;
      exitPageCounts: Map<string, number>;
      conversionPageCounts: Map<string, number>;
      conversionCount: number;
    }
  >();

  // ユーザーごとのセッションを構築し、離脱ページを特定
  const userSessions = new Map<string, AnalyticsData[]>();
  analyticsData.forEach((data) => {
    if (!userSessions.has(data.user_id)) {
      userSessions.set(data.user_id, []);
    }
    userSessions.get(data.user_id)?.push(data);
  });

  userSessions.forEach((sessionData) => {
    sessionData.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const firstAccess = sessionData[0];
    const lastAccess = sessionData[sessionData.length - 1];

    const { source, platform } = analyzeReferrer(firstAccess.referrer);

    if (!sourceMap.has(source)) {
      sourceMap.set(source, {
        platform,
        inflowCount: 0,
        exitPageCounts: new Map<string, number>(),
        conversionPageCounts: new Map<string, number>(),
        conversionCount: 0,
      });
    }
    const currentSourceData = sourceMap.get(source)!;
    currentSourceData.inflowCount++;

    // 離脱ページをカウント
    const exitPage = lastAccess.page_path;
    currentSourceData.exitPageCounts.set(
      exitPage,
      (currentSourceData.exitPageCounts.get(exitPage) || 0) + 1
    );
  });

  // LINE登録イベントを処理し、コンバージョンページを特定
  lineConversions.forEach((conversion) => {
    const { source } = analyzeReferrer(conversion.referrer);
    if (sourceMap.has(source)) {
      const currentSourceData = sourceMap.get(source)!;
      currentSourceData.conversionCount++;

      // コンバージョン直前のページを特定（今回は簡易的にLINE登録イベントのページパスを使用）
      const conversionPage = conversion.page_path; // LINE登録イベントがどのページで発生したか
      currentSourceData.conversionPageCounts.set(
        conversionPage,
        (currentSourceData.conversionPageCounts.get(conversionPage) || 0) + 1
      );
    }
  });

  const results: SourceAnalysisResult[] = [];
  sourceMap.forEach((data, source) => {
    // 主要離脱ページをソート
    const sortedExitPages = Array.from(data.exitPageCounts.entries())
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);

    // 主要コンバージョンページをソート
    const sortedConversionPages = Array.from(
      data.conversionPageCounts.entries()
    )
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);

    const conversionRate =
      data.inflowCount > 0
        ? (data.conversionCount / data.inflowCount) * 100
        : 0;

    results.push({
      source,
      platform: data.platform,
      inflowCount: data.inflowCount,
      exitPages: sortedExitPages,
      conversionPages: sortedConversionPages,
      conversionRate,
    });
  });

  return results.sort((a, b) => b.inflowCount - a.inflowCount); // 流入数でソート
};
