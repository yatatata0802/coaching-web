import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

interface KineticTextProps {
  text: string;
}

const KineticTextContainer = styled.h1`
  display: inline-block;
  font-size: 4em;
  font-weight: 900;
  letter-spacing: 0.13em;
  color: #e53935;
  text-align: center;
  margin-bottom: 1.5em;
  text-shadow: 0 2px 8px #000, 0 0px 1px #000;
  @media (max-width: 600px) {
    font-size: 2.4em;
    margin-bottom: 1em;
  }
  span {
    display: inline-block;
    transform: translateY(80px) scale(1.6);
    opacity: 0;
  }
`;

const KineticText: React.FC<KineticTextProps> = ({ text }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll("span");
      gsap.to(chars, {
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.12,
        ease: "back.out(1.7)",
        delay: 0.7,
      });
    }
  }, [text]);

  return (
    <KineticTextContainer ref={textRef}>
      {text.split("").map((char, index) => (
        <span key={index}>{char === " " ? "\u00A0" : char}</span>
      ))}
    </KineticTextContainer>
  );
};

export default KineticText;
