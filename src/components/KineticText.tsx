import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

interface KineticTextProps {
  text: string;
}

const TextWrapper = styled.h1`
  font-size: 5.5em;
  font-weight: 900;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  text-align: center;
  line-height: 1.1;
  color: #e53935;
  text-shadow: 0 4px 12px rgba(229, 57, 53, 0.4), 0 2px 4px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.05em;
  white-space: nowrap;

  span {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%);
  }

  @media (max-width: 768px) {
    font-size: 3.5em;
    line-height: 1.1;
    letter-spacing: 0.03em;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    font-size: 2.5em;
    line-height: 1.1;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  @media (max-width: 360px) {
    font-size: 2em;
    line-height: 1.1;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
`;

const KineticText: React.FC<KineticTextProps> = ({ text }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll("span");
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "power3.out",
        delay: 1, // ヒーロービデオの後にアニメーションを開始
      });
    }
  }, [text]);

  // 改行位置を制御する関数
  const renderText = () => {
    const words = text.split("");
    const result = [];

    for (let i = 0; i < words.length; i++) {
      const char = words[i];
      const key = i;

      // スマホでの改行位置を制御
      if (char === " ") {
        result.push(<span key={key}>&nbsp;</span>);
      } else if (i === 4) {
        // 「このまま」の後で改行
        result.push(
          <React.Fragment key={key}>
            <span>{char}</span>
            <br />
          </React.Fragment>
        );
      } else {
        result.push(<span key={key}>{char}</span>);
      }
    }

    return result;
  };

  // 2行表示用のレンダリング関数
  const renderTwoLineText = () => {
    const line1Text = text.substring(0, 4); // 「このまま」
    const line2Text = text.substring(4); // 「終わっていいのか？」

    return (
      <>
        <div style={{ lineHeight: "1.1", whiteSpace: "nowrap" }}>
          {line1Text.split("").map((char, index) => (
            <span
              key={`line1-${index}`}
              style={{ opacity: 0, transform: "translateY(100%)" }}
            >
              {char}
            </span>
          ))}
        </div>
        <div
          style={{
            lineHeight: "1.1",
            marginTop: "0.1em",
            whiteSpace: "nowrap",
            wordBreak: "keep-all",
            lineBreak: "strict",
          }}
        >
          {line2Text.split("").map((char, index) => (
            <span
              key={`line2-${index}`}
              style={{
                opacity: 0,
                transform: "translateY(100%)",
                whiteSpace: "nowrap",
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </>
    );
  };

  return <TextWrapper ref={textRef}>{renderTwoLineText()}</TextWrapper>;
};

export default KineticText;
