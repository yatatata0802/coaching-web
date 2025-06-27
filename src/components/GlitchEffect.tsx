import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlitchEffectProps {
  targetSectionId: string;
}

const GlitchContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 998; // CrackEffectより下
  opacity: 0;
`;

const GlitchOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 半透明の黒いオーバーレイ
  filter: blur(0px) hue-rotate(0deg) saturate(100%);
  transform: translate(0, 0);
`;

const GlitchEffect: React.FC<GlitchEffectProps> = ({ targetSectionId }) => {
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (glitchRef.current) {
      const targetSection = document.getElementById(targetSectionId);
      if (!targetSection) return;

      gsap.to(glitchRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: targetSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          // markers: true, // デバッグ用
          onUpdate: (self) => {
            const progress = self.progress;
            // グリッチの強さをスクロールに応じて変化させる
            gsap.to(glitchRef.current!.querySelector('div'), {
              filter: `blur(${progress * 5}px) hue-rotate(${progress * 360}deg) saturate(${100 + progress * 100}%)`,
              x: Math.sin(progress * 10) * 20, // 左右の揺れ
              y: Math.cos(progress * 10) * 20, // 上下の揺れ
              duration: 0.1, // 素早く変化
              ease: 'none',
            });
          },
        },
      });

      gsap.to(glitchRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: targetSection,
          start: 'bottom top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }
  }, [targetSectionId]);

  return (
    <GlitchContainer ref={glitchRef}>
      <GlitchOverlay />
    </GlitchContainer>
  );
};

export default GlitchEffect;
