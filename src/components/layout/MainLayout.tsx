import React from 'react';
import Header from '../Header';
import FloatingSocial from '../ui/FloatingSocial';
import FloatingCTA from '../FloatingCTA';
import ScrollToTop from '../ScrollToTop';
import { usePageView } from '../../hooks/usePageView';

interface MainLayoutProps {
  children: React.ReactNode;
  showFloatingCTA?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showFloatingCTA = true,
}) => {
  // ページビューをカウント
  usePageView();

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <ScrollToTop />
      <Header />
      <main className="flex-grow w-full">
        {children}
      </main>
      <footer className="text-center py-4 text-xs text-gray-500 bg-black">
        <p>&copy; {new Date().getFullYear()} Mitsunori Yatagai. All Rights Reserved.</p>
      </footer>
      <FloatingSocial />
      
    </div>
  );
};

export default MainLayout;
