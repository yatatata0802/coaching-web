import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import WhatIsCoachingPage from "./pages/WhatIsCoachingPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";

import ScrollToTop from "./components/ScrollToTop";
import FloatingSocial from "./components/ui/FloatingSocial";
import FloatingCTA from "./components/FloatingCTA";
import { usePageView } from "./hooks/usePageView";
import PageViewCounter from "./components/PageViewCounter";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  // PVカウントフックを使用
  usePageView();

  return (
    <>
      <ScrollToTop />
      <div className="w-full min-h-screen bg-[#0a0a0a] text-white font-sans">
        {/* 累積PV表示 */}
        <div className="fixed top-20 right-4 z-50">
          <PageViewCounter />
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/main"
            element={
              <>
                <Header />
                <HomePage />
                <FloatingSocial />
                <FloatingCTA />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <ProfilePage />
                <FloatingSocial />
              </>
            }
          />
          <Route
            path="/what-coaching"
            element={
              <>
                <Header />
                <WhatIsCoachingPage />
                <FloatingSocial />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Header />
                <ServicesPage />
                <FloatingSocial />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <ContactPage />
                <FloatingSocial />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <Header />
                <BlogPage />
                <FloatingSocial />
              </>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <>
                <Header />
                <BlogDetailPage />
                <FloatingSocial />
              </>
            }
          />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
