import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { colors } from "../styles/GlobalStyles";
gsap.registerPlugin(ScrollTrigger);

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ProfileContent = styled.div`
  max-width: 800px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 2rem;
  color: ${colors.accent1};
  letter-spacing: 0.2em;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #cccccc;
`;

const AboutContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: "Noto Sans JP", sans-serif;
  padding-top: 96px;
  padding-bottom: 64px;
`;
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 32vh;
  margin-bottom: 3em;
`;
const HeroTitle = styled.h1`
  font-size: 2.2em;
  font-weight: 900;
  color: #d4af37;
  letter-spacing: 0.04em;
  text-align: center;
  margin-bottom: 0.5em;
  line-height: 1.4;
`;
const StorySection = styled.section`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5em;
`;
const StoryBlock = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 2.2em 1.5em 1.7em 1.5em;
  @media (max-width: 600px) {
    padding: 1.2em 0.5em 1em 0.5em;
  }
`;
const StoryTitle = styled.h2`
  font-size: 1.25em;
  color: #d4af37;
  font-weight: 700;
  margin-bottom: 0.7em;
`;
const StoryText = styled.p`
  font-size: 1.13em;
  line-height: 2;
  margin: 0;
  letter-spacing: 0.01em;
`;
const Accent = styled.span`
  color: #d4af37;
  font-weight: bold;
`;
const ImpactMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 6em;
  margin-bottom: 2em;
`;
const ImpactText = styled.h2`
  font-size: 3.2em;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-align: center;
  line-height: 1.3;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 2em;
  }
  span {
    display: inline-block;
    filter: drop-shadow(0 0 8px #000);
    opacity: 0;
    transform: translateX(-80px) scale(0.8);
    color: #e53935;
    will-change: transform, color, filter, opacity;
  }
`;

const ProfilePage: React.FC = () => {
  const impactRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((section, i) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: 0.1 + i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    if (impactRef.current) {
      const chars = impactRef.current.querySelectorAll("span");
      gsap.set(chars, {
        x: -80,
        scale: 0.8,
        opacity: 0,
        color: "#e53935",
        filter: "drop-shadow(0 0 8px #000)",
      });
      ScrollTrigger.create({
        trigger: impactRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          chars.forEach((char, i) => {
            gsap.to(char, {
              x: 0,
              opacity: 1,
              scale: 1.2,
              color: "#e53935",
              filter: "drop-shadow(0 0 32px #fff) drop-shadow(0 0 16px #fff)",
              duration: 0.32,
              ease: "back.out(2.2)",
              delay: 0.09 * i,
              onComplete: () => {
                gsap.to(char, {
                  scale: 1,
                  color: "#e53935",
                  filter: "drop-shadow(0 0 8px #fff)",
                  duration: 0.18,
                  overwrite: true,
                });
              },
            });
          });
        },
      });
    }
  }, []);

  return (
    <AboutContainer>
      <HeroSection>
        <HeroTitle>人生を"作品"として生きる ── 矢田谷充則という物語</HeroTitle>
      </HeroSection>

      <StorySection>
        <StoryBlock className="reveal-section">
          <StoryTitle>フィジークとの出会い</StoryTitle>
          <StoryText>
            大学時代、<Accent>フィジーク</Accent>という競技に出会いました。
            これは、筋肉の美しさとバランスを競うスポーツです。
            当時の私は、ただ筋肉を大きくすることだけを考えていました。
            しかし、フィジークを通じて、<Accent>身体の美しさ</Accent>と
            <Accent>心の美しさ</Accent>の両方が大切だと気づいたのです。
          </StoryText>
        </StoryBlock>

        <StoryBlock className="reveal-section">
          <StoryTitle>挫折と再起</StoryTitle>
          <StoryText>
            フィジークの大会で結果を出せず、一度は諦めかけました。
            しかし、その時、<Accent>コーチング</Accent>という存在を知りました。
            コーチの指導を受けることで、自分の中に眠っていた
            <Accent>可能性</Accent>を発見できたのです。
            この経験が、私がコーチングを学ぶきっかけとなりました。
          </StoryText>
        </StoryBlock>

        <StoryBlock className="reveal-section">
          <StoryTitle>コーチングへの道</StoryTitle>
          <StoryText>
            フィジークの経験を活かし、<Accent>心と身体の両面</Accent>から
            人をサポートするコーチングを学びました。 私の使命は、
            <Accent>"なりたい自分"</Accent>を夢で終わらせないこと。
            フィジークで培った<Accent>継続力</Accent>と
            <Accent>自己管理能力</Accent>を活かし、
            あなたの人生を"作品"として輝かせるお手伝いをします。
          </StoryText>
        </StoryBlock>
      </StorySection>

      <ImpactMessage>
        <ImpactText ref={impactRef}>
          <span>変</span>
          <span>化</span>
          <span>は</span>
          <span>必</span>
          <span>ず</span>
          <span>起</span>
          <span>き</span>
          <span>る</span>
        </ImpactText>
      </ImpactMessage>
    </AboutContainer>
  );
};

export default ProfilePage;
