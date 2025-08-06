import React from "react";
import { motion } from "framer-motion";

interface AIInsightProps {
  summary: string;
  suggestion: string;
  anomaly: { message: string } | null;
}

const AdminAnalyticsDashboard: React.FC<AIInsightProps> = ({ summary, suggestion, anomaly }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-yellow-100 to-blue-50 border-b border-yellow-300 p-6 rounded-2xl shadow-xl mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* AIサマリー */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-yellow-700 mb-2">AIインサイト</h3>
          <p className="text-gray-800 whitespace-pre-line leading-relaxed">{summary}</p>
        </div>

        {/* AIからの改善提案 */}
        <div className="md:w-80 mt-4 md:mt-0">
          <h3 className="text-sm font-semibold text-blue-700 mb-2">AIからの改善提案</h3>
          <p className="text-blue-900 whitespace-pre-line leading-relaxed">{suggestion}</p>
        </div>
      </div>

      {/* 異常検知アラート */}
      {anomaly && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 mt-6 font-bold text-lg flex items-center rounded-r-lg"
        >
          <span className="mr-2">⚠️</span>
          {anomaly.message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminAnalyticsDashboard;