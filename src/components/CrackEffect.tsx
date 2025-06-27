import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '../styles/GlobalStyles';

gsap.registerPlugin(ScrollTrigger);

const CrackContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 999; // Ensure it's above the content

  svg {
    width: 100%;
    height: 100%;
    path {
      fill: none;
      stroke: ${colors.accent1};
      stroke-width: 5px;
      stroke-dasharray: 0 1000; // Will be set dynamically
      stroke-dashoffset: 0; // Will be set dynamically
    }
  }
`;

interface CrackEffectProps {
  targetSectionId: string;
}

const CrackEffect: React.FC<CrackEffectProps> = ({ targetSectionId }) => {
  const crackRef = useRef<SVGSVGElement>(null);
  const goldPathRef = useRef<SVGPathElement>(null); // Path for the gold line

  useEffect(() => {
    if (crackRef.current && goldPathRef.current) {
      const targetSection = document.getElementById(targetSectionId);
      if (!targetSection) return;

      const pathLength = goldPathRef.current.getTotalLength();
      goldPathRef.current.style.strokeDasharray = `${pathLength} ${pathLength}`;
      goldPathRef.current.style.strokeDashoffset = `${pathLength}`;

      gsap.to(goldPathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: targetSection,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
          // markers: true, // Debugging
        },
      });
    }
  }, [targetSectionId]);

  const crackPathD = "M 0 500 C 200 300, 400 700, 600 400 S 800 600, 1000 500";

  return (
    <CrackContainer>
      <svg ref={crackRef} viewBox="0 0 1000 1000">
        {/* Draw the gold crack line */} 
        <path
          ref={goldPathRef}
          d={crackPathD}
          fill="none"
          stroke={colors.accent1}
          strokeWidth="5px"
        />
      </svg>
    </CrackContainer>
  );
};

export default CrackEffect;
