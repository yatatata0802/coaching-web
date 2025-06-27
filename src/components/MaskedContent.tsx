import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

interface MaskedContentProps {
  children: React.ReactNode;
  sectionId: string;
}

const MaskedContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* コンテンツが縦に並ぶように */
  justify-content: center;
  align-items: center;
  text-align: center; /* テキストを中央揃えに */
  opacity: 0; /* 初期状態では非表示 */
`;

const MaskedContent: React.FC<MaskedContentProps> = ({
  children,
  sectionId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const section = document.getElementById(sectionId);
      if (!section) return;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0, // Initially invisible
        },
        {
          opacity: 1, // Fully revealed
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "center center",
            scrub: true,
            // markers: true, // Debugging
          },
        }
      );
    }
  }, [sectionId]);

  return <MaskedContainer ref={containerRef}>{children}</MaskedContainer>;
};

export default MaskedContent;
