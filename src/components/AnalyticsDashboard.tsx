import React from "react";
import { BarChart3 } from "lucide-react";

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={20} className="text-[#d4af37]" />
        <h3 className="text-lg font-bold text-[#d4af37]">アクセス分析</h3>
      </div>
      <div className="text-center text-gray-400 py-8">
        <p>現在、分析機能はご利用いただけません。</p>
        <p className="text-sm mt-2">
          (Supabaseの利用を停止したため、関連する分析機能は削除されました。)
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;