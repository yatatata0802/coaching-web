import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { incrementPageView } from "../lib/supabase";

export const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    

    const countPageView = async () => {
      try {
        
        await incrementPageView(currentPath);
        
      } catch (error) {
        
      }
    };

    
    countPageView();
  }, [location.pathname]);

  return null;
};
