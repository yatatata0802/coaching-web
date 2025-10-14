import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import ErrorBoundary from "./components/ErrorBoundary";

// 動的インポートによるコード分割
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const WhatIsCoachingPage = lazy(() => import("./pages/WhatIsCoachingPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const TagPage = lazy(() => import("./pages/TagPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

// 改善されたローディングコンポーネント
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />
          <Route
            path="/what-is-coaching"
            element={
              <MainLayout>
                <WhatIsCoachingPage />
              </MainLayout>
            }
          />
          <Route
            path="/services"
            element={
              <MainLayout>
                <ServicesPage />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            }
          />
          <Route
            path="/blog"
            element={
              <MainLayout>
                <BlogPage />
              </MainLayout>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <MainLayout>
                <BlogDetailPage />
              </MainLayout>
            }
          />
          <Route
            path="/tags/:tagId"
            element={
              <MainLayout>
                <TagPage />
              </MainLayout>
            }
          />
          <Route
            path="/admin"
            element={
              <MainLayout>
                <AdminPage />
              </MainLayout>
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
