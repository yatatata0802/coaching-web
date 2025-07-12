import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WhatsCoachingPage from './pages/WhatsCoachingPage';
import ProfilePage from './pages/ProfilePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import SnsPage from './pages/SnsPage';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<Layout><HomePage /></Layout>} />
        <Route path="/what-coaching" element={<Layout><WhatsCoachingPage /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/sns" element={<Layout><SnsPage /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
