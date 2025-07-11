import React from "react";
import ProfilePage from "./ProfilePage";

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <div className="bg-red-600 text-white text-center py-2 font-bold text-lg">
        管理者専用ダッシュボード
      </div>
      <ProfilePage />
    </div>
  );
};

export default AdminDashboardPage;
