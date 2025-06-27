import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";
import WhatCoachingPage from "./pages/WhatCoachingPage";
import HeroVideo from "./components/HeroVideo";
import KineticText from "./components/KineticText";
import { colors } from "./styles/GlobalStyles";
import Header from "./components/Header";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.dominant};
  color: white;
  position: relative;
  overflow: hidden;
`;

const HeroSectionContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  text-align: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-top: 18vh;
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (max-width: 480px) {
    padding-top: 12vh;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const HeroSubHeading = styled.div`
  font-size: 1.6em;
  margin-top: 24px;
  margin-bottom: 24px;
  font-family: "Noto Serif JP", serif;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45), 0 1px 0 #d4af37;
  background: rgba(10, 10, 10, 0.32);
  border-radius: 10px;
  padding: 0.7em 1.2em;
  text-align: center;
  line-height: 1.6;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: block;

  @media (max-width: 768px) {
    font-size: 1.1em;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0.6em 1em;
    line-height: 1.5;
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 480px) {
    font-size: 0.9em;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 0.5em 0.8em;
    line-height: 1.4;
    max-width: 98%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 375px) {
    font-size: 0.85em;
    padding: 0.4em 0.6em;
    max-width: 99%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CallToAction = styled.button`
  background-color: ${colors.accent1};
  color: ${colors.dominant};
  padding: 15px 30px;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
  border-radius: 8px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${colors.accent1} 0%, transparent 70%);
    opacity: 0;
    transform: scale(0);
    transition: transform 0.5s ease, opacity 0.5s ease;
    z-index: 0;
  }

  &:hover {
    background-color: ${colors.accent2};

    &::before {
      transform: scale(1);
      opacity: 0.5;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.3em;
    padding: 12px 24px;
    margin-top: 16px;
    min-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 480px) {
    font-size: 1.1em;
    padding: 10px 20px;
    margin-top: 12px;
    min-width: 180px;
    margin-left: auto;
    margin-right: auto;
  }
`;

function Home() {
  const navigate = useNavigate();

  return (
    <AppContainer>
      <HeroVideo />
      <HeroSectionContent>
        <KineticText text="このまま終わっていいのか？" />
        <HeroSubHeading>
          毎朝、同じ顔。
          <br />
          毎日、同じルート。
          <br />
          心が、どこか置き去りのまま。
          <br />
          「こんなはずじゃない」って、気づいてるはずだ。
        </HeroSubHeading>
        <CallToAction onClick={() => navigate("/main")}>
          最初の一歩を踏み出す
        </CallToAction>
      </HeroSectionContent>
    </AppContainer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/what-coaching" element={<WhatCoachingPage />} />
      </Routes>
    </>
  );
}
