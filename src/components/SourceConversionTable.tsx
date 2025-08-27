import React from "react";
import { motion } from "framer-motion";
import { SourceAnalysisResult } from "../lib/analytics-insights";

interface SourceConversionTableProps {
  data: SourceAnalysisResult[];
}

const SourceConversionTable: React.FC<SourceConversionTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-16">
        流入元データがありません。
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden">
        <thead className="bg-[#d4af37]/20">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-[#d4af37]">流入元</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-[#d4af37]">流入数</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-[#d4af37]">LINE登録率</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-[#d4af37]">主要離脱ページ</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-[#d4af37]">主要コンバージョンページ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <motion.tr
              key={item.source}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-b border-gray-700 last:border-b-0"
            >
              <td className="py-3 px-4 text-sm text-gray-300 font-medium">
                {item.platform}
              </td>
              <td className="py-3 px-4 text-sm text-gray-300">
                {item.inflowCount.toLocaleString()}
              </td>
              <td className="py-3 px-4 text-sm text-gray-300">
                {item.conversionRate.toFixed(1)}%
              </td>
              <td className="py-3 px-4 text-sm text-gray-300">
                {item.exitPages.length > 0 ? item.exitPages[0].page : "N/A"}
              </td>
              <td className="py-3 px-4 text-sm text-gray-300">
                {item.conversionPages.length > 0 ? item.conversionPages[0].page : "N/A"}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SourceConversionTable;
