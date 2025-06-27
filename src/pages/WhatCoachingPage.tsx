import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { colors } from "../styles/GlobalStyles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatCoachingContainer = styled.div`
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

const ContentSection = styled.section`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5em;
`;

const ContentBlock = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 2.2em 1.5em 1.7em 1.5em;

  @media (max-width: 600px) {
    padding: 1.2em 0.5em 1em 0.5em;
  }
`;

const ContentTitle = styled.h2`
  font-size: 1.25em;
  color: #d4af37;
  font-weight: 700;
  margin-bottom: 0.7em;
`;

const ContentText = styled.p`
  font-size: 1.13em;
  line-height: 2;
  margin: 0;
  letter-spacing: 0.01em;
`;

const Accent = styled.span`
  color: #d4af37;
  font-weight: bold;
`;

const WhatCoachingPage: React.FC = () => {
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
  }, []);

  return (
    <>
      <WhatCoachingContainer>
        <HeroSection>
          <HeroTitle>What's Coaching?</HeroTitle>
        </HeroSection>
        <ContentSection>
          <ContentBlock className="reveal-section">
            <ContentTitle>コーチングとは何か</ContentTitle>
            <ContentText>
              コーチングは、<Accent>あなたの中にある答えを引き出す</Accent>
              プロセスです。
              <br />
              私たちは、あなたが既に持っている能力や可能性を信じています。
              <br />
              コーチは答えを与えるのではなく、あなた自身が答えを見つけられるようサポートします。
            </ContentText>
          </ContentBlock>

          <ContentBlock className="reveal-section">
            <ContentTitle>従来のコンサルティングとの違い</ContentTitle>
            <ContentText>
              コンサルティングが「答えを教える」ものであるなら、
              <br />
              コーチングは「答えを引き出す」ものです。
              <br />
              <br />
              あなたの人生の主人公は、あなた自身です。
              <br />
              コーチは、その主人公が自分の物語を力強く生きられるよう、
              <br />
              伴走者として寄り添います。
            </ContentText>
          </ContentBlock>

          <ContentBlock className="reveal-section">
            <ContentTitle>なぜコーチングが必要なのか</ContentTitle>
            <ContentText>
              現代社会では、多くの人が「正解」を求めがちです。
              <br />
              しかし、人生に唯一の正解はありません。
              <br />
              <br />
              コーチングを通じて、あなたは：
              <br />
              • 自分の価値観を明確にする
              <br />
              • 本当にやりたいことを見つける
              <br />
              • 行動を起こす勇気を得る
              <br />
              • 継続的な成長を実現する
              <br />
              <br />
              これらを実現できます。
            </ContentText>
          </ContentBlock>

          <ContentBlock className="reveal-section">
            <ContentTitle>コーチングの効果</ContentTitle>
            <ContentText>
              コーチングを受けることで、以下のような変化が期待できます：
              <br />
              <br />
              <Accent>• 自己理解の深化</Accent> - 自分の強みや価値観が明確になる
              <br />
              <Accent>• 目標の明確化</Accent> - 本当に達成したい目標が見えてくる
              <br />
              <Accent>• 行動力の向上</Accent> - 一歩を踏み出す勇気が生まれる
              <br />
              <Accent>• 継続的な成長</Accent> -
              自分で自分を成長させる力が身につく
              <br />
              <Accent>• 人生の充実感</Accent> - 自分の人生を主体的に生きられる
            </ContentText>
          </ContentBlock>
        </ContentSection>
      </WhatCoachingContainer>
    </>
  );
};

export default WhatCoachingPage;
