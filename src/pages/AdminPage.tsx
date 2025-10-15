import React from "react";
import { isAdmin, logoutAdmin } from "../lib/admin";
import SEO from "../components/SEO";
import { BarChart3 } from "lucide-react";

const AdminPage: React.FC = () => {
  React.useEffect(() => {
    if (!isAdmin()) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#181818] text-white">
      <SEO
        title="管理者ページ | 矢田谷充則のコーチング"
        description="管理者専用ページ"
      />

      <div className="bg-black/50 backdrop-blur-sm border-b border-[#d4af37]/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BarChart3 size={32} className="text-[#d4af37]" />
              <div>
                <h1 className="text-2xl font-bold text-[#d4af37]">
                  管理者ページ
                </h1>
                <p className="text-gray-400">今後の機能拡張用ページ</p>
              </div>
            </div>
            <button
              onClick={logoutAdmin}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-[#d4af37] mb-4">
            分析機能は現在停止中です
          </h2>
          <p className="text-gray-400">
            Supabaseの利用を停止したため、関連する分析機能は削除されました。
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;