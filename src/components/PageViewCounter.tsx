import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { getTotalViews } from "../lib/supabase";

const PageViewCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTotalViews = async () => {
      try {
        const views = await getTotalViews();
        setTotalViews(views);
      } catch (error) {
        console.error("PV取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalViews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <Eye size={14} />
        <span>読み込み中...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 text-gray-400 text-sm"
    >
      <Eye size={14} />
      <span>累積閲覧数: {totalViews.toLocaleString()}</span>
    </motion.div>
  );
};

export default PageViewCounter;
