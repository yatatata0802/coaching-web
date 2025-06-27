import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

interface KineticTextProps {
  text: string;
}

const TextWrapper = styled.h1`
  font-size: 5em;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  span {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%);
  }
`;

const KineticText: React.FC<KineticTextProps> = ({ text }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('span');
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 1, // ヒーロービデオの後にアニメーションを開始
      });
    }
  }, [text]);

  return (
    <TextWrapper ref={textRef}>
      {text.split('').map((char, index) => (
        <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </TextWrapper>
  );
};

export default KineticText;
