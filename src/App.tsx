import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const WhatIsCoachingPage = lazy(() => import("./pages/WhatIsCoachingPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
            <MainLayout showFloatingCTA={false}>
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
            <MainLayout showFloatingCTA={false}>
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
          path="/admin"
          element={
            <MainLayout showFloatingCTA={false}>
              <AdminPage />
            </MainLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
