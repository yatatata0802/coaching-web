import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import WhatIsCoachingPage from "./pages/WhatIsCoachingPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";
import FloatingSocial from "./components/ui/FloatingSocial";
import FloatingCTA from "./components/FloatingCTA";

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="w-full min-h-screen bg-[#0a0a0a] text-white font-sans">
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
        </Routes>
      </div>
    </>
  );
}

export default App;