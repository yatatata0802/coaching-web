import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 光の差し込みアニメーション
const shine = keyframes`
  0% { opacity: 0; transform: translateY(40px) scaleY(0.8); }
  30% { opacity: 1; transform: translateY(0) scaleY(1); }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-40px) scaleY(1.2); }
`;

const Hero = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0a0a0a;
  overflow: hidden;
  padding: 64px 5vw 0 5vw;
  @media (max-width: 600px) {
    min-height: 50vh;
    padding: 64px 3vw 0 3vw;
  }
`;
const Light = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 120vw;
  height: 60vh;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.04) 60%,
    transparent 100%
  );
  transform: translateX(-50%);
  animation: ${shine} 4s ease-in-out 1.2s 1;
`;
const HeroSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60vh;
  pointer-events: none;
  z-index: 1;
`;
const HeroTitle = styled.h1`
  color: #fff;
  font-size: 2.6em;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 0.3em;
  text-align: center;
  opacity: 0;
  @media (max-width: 600px) {
    font-size: 1.5em;
  }
`;
const HeroSub = styled.div`
  color: #d4af37;
  font-size: 1.2em;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-bottom: 2.5em;
  text-align: center;
  opacity: 0;
  @media (max-width: 600px) {
    font-size: 1em;
    margin-bottom: 1.5em;
  }
`;
const HeroCatch = styled.div`
  color: #fff;
  font-size: 1.3em;
  font-weight: 400;
  text-align: center;
  margin-bottom: 2.5em;
  line-height: 1.7;
  letter-spacing: 0.04em;
  opacity: 0;
  @media (max-width: 600px) {
    font-size: 1em;
    margin-bottom: 1.5em;
  }
`;
const MainContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: "Noto Sans JP", sans-serif;
  padding-bottom: 4em;
`;
const Section = styled.section`
  max-width: 700px;
  margin: 4em auto 0 auto;
  padding: 2.5em 2em;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  @media (max-width: 600px) {
    margin: 2em auto 0 auto;
    padding: 1.5em 0.5em;
  }
`;
const SectionTitle = styled.h2`
  font-size: 1.6em;
  margin-bottom: 0.7em;
  border-left: 6px solid #d4af37;
  padding-left: 0.5em;
  color: #d4af37;
  font-weight: 700;
`;
const Accent = styled.span`
  color: #d4af37;
  font-weight: bold;
`;
const List = styled.ul`
  margin: 0.5em 0 1em 1.5em;
  color: #fff;
  line-height: 1.8;
`;
const InquirySection = styled(Section)`
  text-align: center;
`;
const InquiryButton = styled.button`
  font-size: 1.1em;
  padding: 0.7em 2em;
  background: #d4af37;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  letter-spacing: 0.05em;
  cursor: pointer;
  margin-top: 1.5em;
`;

const CanvasBG = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60vh;
  z-index: 0;
  pointer-events: none;
`;

// KineticText（1文字ずつアニメーション）
const KineticText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (ref.current) {
      const chars = ref.current.querySelectorAll("span");
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [text]);
  return (
    <h2
      ref={ref}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.02em",
        fontSize: "2em",
        color: "#D4AF37",
        fontWeight: 700,
        letterSpacing: "0.04em",
        marginBottom: "0.7em",
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            minWidth: char === " " ? "0.5em" : undefined,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
};

// MyStorySection: 高級感あるパララックス＋個別アニメーション＋背景Canvas＋ノイズ
const MyStoryBG = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;
const MyStoryWrapper = styled(Section)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(120deg, #181818 0%, #232323 100%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  min-height: 420px;
  margin-top: 5em;
`;

const MyStorySection: React.FC = () => {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // 背景Canvasアニメーション（グラデ・ノイズ・光の揺らぎ）
  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let dpr = window.devicePixelRatio || 1;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // 粒子
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.1 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.12 + 0.04,
    }));
    // 光の揺らぎ
    let t = 0;
    let running = true;
    function draw() {
      if (!ctx) return;
      // グラデーション背景
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#181818");
      grad.addColorStop(1, "#232323");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      // 光の揺らぎ
      for (let i = 0; i < 2; i++) {
        ctx.save();
        ctx.globalAlpha = 0.1 + 0.07 * Math.sin(t * 0.7 + i);
        ctx.beginPath();
        ctx.ellipse(
          width * (0.3 + 0.4 * i),
          height * 0.4,
          80 + 20 * Math.sin(t + i),
          18 + 8 * Math.cos(t * 0.8 + i),
          Math.PI / 6,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 16;
        ctx.stroke();
        ctx.restore();
      }
      // 粒子
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        p.y += p.speed;
        if (p.y > height) p.y = -5;
      });
      // ノイズ
      const imageData = ctx.getImageData(0, 0, width, height);
      for (let i = 0; i < 2000; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const idx = (y * width + x) * 4;
        imageData.data[idx] = 255;
        imageData.data[idx + 1] = 255;
        imageData.data[idx + 2] = 255;
        imageData.data[idx + 3] = Math.random() * 32;
      }
      ctx.putImageData(imageData, 0, 0);
      t += 0.01;
      if (running) requestAnimationFrame(draw);
    }
    draw();
    // リサイズ対応
    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // パララックス効果（より立体的に）
  useEffect(() => {
    if (!wrapperRef.current) return;
    gsap.fromTo(
      wrapperRef.current,
      { y: 80, opacity: 0.7 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 90%",
          end: "bottom 60%",
          scrub: 0.8,
        },
      }
    );
  }, []);

  // 本文・ボタンの多段階アニメーション
  useEffect(() => {
    gsap.fromTo(
      p1Ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: p1Ref.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      p2Ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: p2Ref.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      p3Ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: p3Ref.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 1.0,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: btnRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <MyStoryWrapper id="story" ref={wrapperRef}>
      <MyStoryBG ref={bgRef} />
      <KineticText text="My Story" />
      <p
        ref={p1Ref}
        style={{
          fontSize: "1.1em",
          marginBottom: "1.2em",
          color: "#fff",
          letterSpacing: "0.01em",
          lineHeight: 1.8,
        }}
      >
        大阪府生まれ。無理やりやらされていた空手を辞め「自由」を手にした反動で、少しヤンチャな時期も。転機はブレイクダンスとの出会い。「自分で選んでやる楽しさ」を知り、自己表現に目覚めました。
      </p>
      <p
        ref={p2Ref}
        style={{
          fontSize: "1.1em",
          marginBottom: "1.2em",
          color: "#fff",
          letterSpacing: "0.01em",
          lineHeight: 1.8,
        }}
      >
        社会人になり筋トレやムエタイに打ち込む中で「もっと成長したい」という想いが募り、コーチングと出会います。「人が本気で変わろうとすれば必ず成長できる」という考えに深く共感し、自身の経験を活かして挑戦する人をサポートするため、コーチの道を歩み始めました。
      </p>
      <p
        ref={p3Ref}
        style={{
          fontSize: "1.1em",
          marginBottom: "1.2em",
          color: "#fff",
          letterSpacing: "0.01em",
          lineHeight: 1.8,
        }}
      >
        見た目・行動・雰囲気──すべてを通じて理想を体現する。あなたの人生そのものを"作品"としてデザインするお手伝いをします。
      </p>
    </MyStoryWrapper>
  );
};

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const catchRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<SVGPathElement>(null);
  const rippleRef = useRef<SVGCircleElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const [error, setError] = useState<string | null>(null);

  // パーティクルと光の筋のCanvasアニメーション
  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let dpr = window.devicePixelRatio || 1;
      let width = window.innerWidth;
      let height = Math.min(window.innerHeight * 0.6, 600);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 粒子生成
      const particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.7,
        alpha: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.2 + 0.05,
      }));
      // 光の筋
      const rays = Array.from({ length: 3 }, (_, i) => ({
        x: width * (0.2 + 0.3 * i),
        y: 0,
        length: height * 1.2,
        width: 2 + Math.random() * 2,
        alpha: 0.08 + Math.random() * 0.08,
        angle: -0.1 + Math.random() * 0.2,
      }));

      let frame = 0;
      let running = true;
      function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        // 光の筋
        rays.forEach((ray) => {
          ctx.save();
          ctx.globalAlpha = ray.alpha;
          ctx.translate(ray.x, ray.y);
          ctx.rotate(ray.angle);
          const grad = ctx.createLinearGradient(0, 0, 0, ray.length);
          grad.addColorStop(0, "#fff");
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(-ray.width / 2, 0, ray.width, ray.length);
          ctx.restore();
        });
        // 粒子
        particles.forEach((p) => {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.shadowColor = "#fff";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
          p.y += p.speed;
          if (p.y > height) p.y = -5;
        });
        // マウス・タッチで光の波紋
        if (mouse.current.active) {
          ctx.save();
          ctx.globalAlpha = 0.18;
          ctx.beginPath();
          ctx.arc(
            mouse.current.x,
            mouse.current.y,
            60 + 20 * Math.sin(frame * 0.1),
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = "#D4AF37";
          ctx.lineWidth = 2.5;
          ctx.shadowColor = "#D4AF37";
          ctx.shadowBlur = 16;
          ctx.stroke();
          ctx.restore();
        }
        frame++;
        if (running) requestAnimationFrame(draw);
      }
      draw();
      // リサイズ対応
      const handleResize = () => {
        width = window.innerWidth;
        height = Math.min(window.innerHeight * 0.6, 600);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        running = false;
        window.removeEventListener("resize", handleResize);
      };
    } catch (e: any) {
      setError(e.message || String(e));
    }
  }, []);

  // マウス・タッチインタラクション
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      let x = 0,
        y = 0;
      if ("touches" in e && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if ("clientX" in e) {
        x = e.clientX;
        y = e.clientY;
      }
      mouse.current.x = x;
      mouse.current.y = y;
      mouse.current.active = true;
    };
    const handleLeave = () => {
      mouse.current.active = false;
    };
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("touchmove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchend", handleLeave);
    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, []);

  // 既存のGSAPテキスト・SVGアニメーション
  useEffect(() => {
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.7,
      ease: "power2.out",
    });
    gsap.to(subRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.5,
      ease: "power2.out",
    });
    gsap.to(catchRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 2.3,
      ease: "power2.out",
    });
    if (flameRef.current) {
      gsap.to(flameRef.current, {
        repeat: -1,
        yoyo: true,
        duration: 2,
        attr: {
          d: "M60,60 Q70,40 80,60 Q90,80 80,100 Q70,120 60,100 Q50,80 60,60",
        },
        ease: "sine.inOut",
      });
    }
    if (rippleRef.current) {
      gsap.fromTo(
        rippleRef.current,
        {
          attr: { r: 10, opacity: 0.18 },
        },
        {
          attr: { r: 120, opacity: 0 },
          duration: 3,
          repeat: -1,
          ease: "power1.in",
          delay: 1.5,
        }
      );
    }
    // セクションのスクロールアニメーション
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

  if (error) {
    return (
      <div
        style={{
          color: "#D4AF37",
          background: "#111",
          padding: "2em",
          fontSize: "1.2em",
        }}
      >
        エラーが発生しました: {error}
      </div>
    );
  }

  return (
    <MainContainer>
      <Hero id="hero">
        <CanvasBG ref={canvasRef} />
        <Light />
        <HeroSVG viewBox="0 0 200 120">
          {/* 波紋（水） */}
          <circle
            ref={rippleRef}
            cx="140"
            cy="80"
            r="10"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
            opacity="0.18"
          />
        </HeroSVG>
        <HeroTitle ref={titleRef}>
          矢田谷 充則{" "}
          <span style={{ fontSize: "0.6em", color: "#D4AF37" }}>
            (Yatagai Mitsunori)
          </span>
        </HeroTitle>
        <HeroSub ref={subRef}>魅セルジブン × 踊ルココロ</HeroSub>
        <HeroCatch ref={catchRef}>
          "このままの自分でいいのか？"と問い続けているあなたへ
          <br />
          <br />
          <Accent>"なりたい自分"</Accent>を夢で終わらせない。
          <br />
          今の自分にモヤモヤしてるなら──
          <br />
          心と身体の両面から、"なりたい自分"に火をつける。
        </HeroCatch>
        <InquiryButton onClick={() => navigate("/")}>
          トップページに戻る
        </InquiryButton>
      </Hero>

      <MyStorySection />

      <Section id="support" className="reveal-section">
        <SectionTitle>サポート内容</SectionTitle>
        <div
          style={{ color: "#D4AF37", fontWeight: 600, marginBottom: "0.7em" }}
        >
          得意なサポート
        </div>
        <List>
          <li>
            <Accent>行動変容支援：</Accent>
            「変わりたい」を行動に繋げ、一歩踏み出す勇気を引き出します。
          </li>
          <li>
            <Accent>自己管理強化：</Accent>
            目標達成に不可欠な「継続する力」を育てます。
          </li>
          <li>
            <Accent>心と身体のサポート：</Accent>
            フィジーク経験を活かし、統合的なセルフマネジメントを支援します。
          </li>
        </List>
      </Section>

      <Section>
        <SectionTitle>こんな方をサポートします</SectionTitle>
        <List>
          <li>「このままじゃダメだ」と悩み、動き出せない方</li>
          <li>「もっと強くなりたい」と、新しい挑戦をしたい方</li>
          <li>モチベーションが続かず、三日坊主で終わってしまう方</li>
          <li>目標達成のために自己管理能力を磨きたい方</li>
        </List>
      </Section>

      <InquirySection id="contact" className="reveal-section">
        <div
          style={{
            fontSize: "1.2em",
            marginBottom: "1em",
            color: "#D4AF37",
            fontWeight: "bold",
          }}
        >
          さあ、はじめの一歩を。
        </div>
        <div style={{ marginBottom: "1.5em" }}>
          ご質問や初回セッションのお申し込みはこちらから。
          <br />
          お気軽にご連絡ください。
        </div>
        <InquiryButton
          onClick={() => alert("お問い合わせページは今後追加予定です。")}
        >
          お問い合わせ・お申し込み
        </InquiryButton>
        <InquiryButton
          style={{
            marginTop: "2.5em",
            background: "#232323",
            color: "#D4AF37",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          トップへ戻る
        </InquiryButton>
      </InquirySection>
    </MainContainer>
  );
};

export default MainPage;
