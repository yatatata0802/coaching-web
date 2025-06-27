import styled from "styled-components";
import Header from "./components/Header";
import HeroVideo from "./components/HeroVideo";
import KineticText from "./components/KineticText";
import { colors } from "./styles/GlobalStyles";
import { keyframes } from "styled-components";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";

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
  padding: 20px;
  text-align: center;
`;

const HeroSubHeading = styled.p`
  font-size: 1.8em;
  margin-top: 24px;
  margin-bottom: 24px;
  font-family: "Noto Serif JP", serif;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45), 0 1px 0 #d4af37;
  background: rgba(10, 10, 10, 0.32);
  border-radius: 10px;
  padding: 0.7em 1.2em;
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
`;

// ゴールド下矢印アニメーション
const bounce = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(16px); opacity: 1; }
`;
const ScrollDownWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;
const ScrollText = styled.div`
  color: #d4af37;
  font-size: 1em;
  letter-spacing: 0.12em;
  margin-bottom: 6px;
  font-family: "Noto Serif JP", serif;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
`;
const Arrow = styled.div`
  width: 28px;
  height: 28px;
  border-left: 3px solid #d4af37;
  border-bottom: 3px solid #d4af37;
  transform: rotate(-45deg);
  animation: ${bounce} 1.6s infinite;
  margin-bottom: 2px;
  filter: drop-shadow(0 2px 8px #d4af37aa);
`;

function Home() {
  const navigate = useNavigate();
  return (
    <AppContainer>
      <HeroVideo />
      <HeroSectionContent>
        <KineticText text="あなたの物語は、まだ途中だ" />
        <HeroSubHeading>いまこそ、本当の自分を生きると決めよう</HeroSubHeading>
        <CallToAction onClick={() => navigate("/main")}>
          最初の一歩を踏み出す
        </CallToAction>
      </HeroSectionContent>
      <ScrollDownWrapper>
        <ScrollText>SCROLL</ScrollText>
        <Arrow />
      </ScrollDownWrapper>
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
