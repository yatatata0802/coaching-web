import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../styles/GlobalStyles";
import gsap from "gsap";

const shine = keyframes`
  0% { opacity: 0; transform: translateY(40px) scaleY(0.8); }
  30% { opacity: 1; transform: translateY(0) scaleY(1); }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-40px) scaleY(1.2); }
`;

const ContactContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: "Noto Sans JP", sans-serif;
  padding-top: 96px;
  padding-bottom: 64px;
`;
const Hero = styled.section`
  position: relative;
  min-height: 32vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0a0a0a;
  overflow: hidden;
  padding: 64px 5vw 0 5vw;
`;
const Light = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 120vw;
  height: 32vh;
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
const HeroTitle = styled.h1`
  color: #fff;
  font-size: 2.1em;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 0.3em;
  text-align: center;
  opacity: 0;
`;
const HeroCatch = styled.div`
  color: #d4af37;
  font-size: 1.2em;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-bottom: 2.5em;
  text-align: center;
  opacity: 0;
`;
const FormSection = styled.section`
  max-width: 480px;
  margin: 3em auto 0 auto;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 2.5em 2em;
  @media (max-width: 600px) {
    margin: 2em auto 0 auto;
    padding: 1.5em 0.5em;
  }
`;
const Label = styled.label<{ active?: boolean; error?: boolean }>`
  display: block;
  font-size: 1.1em;
  margin-bottom: 0.5em;
  color: ${({ error, active }) =>
    error ? "#e53935" : active ? "#d4af37" : "#d4af37"};
  font-weight: 600;
  transform: ${({ active }) =>
    active ? "translateY(-8px) scale(0.95)" : "none"};
  transition: color 0.2s, transform 0.2s;
`;
const Input = styled.input<{ active?: boolean; error?: boolean }>`
  width: 100%;
  padding: 0.7em;
  margin-bottom: 1.2em;
  border: 2px solid
    ${({ error, active }) =>
      error ? "#e53935" : active ? "#d4af37" : "transparent"};
  border-radius: 8px;
  background: #181818;
  color: #fff;
  font-size: 1em;
  outline: none;
  transition: border 0.2s;
  box-shadow: ${({ active }) => (active ? "0 0 8px #d4af37" : "none")};
`;
const Textarea = styled.textarea<{ active?: boolean; error?: boolean }>`
  width: 100%;
  padding: 0.7em;
  margin-bottom: 1.2em;
  border: 2px solid
    ${({ error, active }) =>
      error ? "#e53935" : active ? "#d4af37" : "transparent"};
  border-radius: 8px;
  background: #181818;
  color: #fff;
  font-size: 1em;
  min-height: 120px;
  outline: none;
  transition: border 0.2s;
  box-shadow: ${({ active }) => (active ? "0 0 8px #d4af37" : "none")};
`;
const SubmitButton = styled.button`
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
  position: relative;
  overflow: hidden;
  transition: background 0.2s, color 0.2s;
  z-index: 1;
  &:hover {
    background: #fff;
    color: #d4af37;
  }
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, #fff 0%, #d4af37 80%, transparent 100%);
    opacity: 0.3;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: width 0.4s, height 0.4s, opacity 0.4s, transform 0.4s;
    z-index: 0;
  }
  &:active::after {
    width: 200%;
    height: 200%;
    opacity: 0.1;
    transform: translate(-50%, -50%) scale(1);
  }
`;
const CompleteMessage = styled.div`
  text-align: center;
  color: #d4af37;
  font-size: 1.3em;
  font-weight: 700;
  margin-top: 3em;
`;
const Assurance = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 0.98em;
  margin-top: 2em;
  margin-bottom: 0.5em;
`;

const ContactPage: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const catchRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<Record<string, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [complete, setComplete] = useState(false);
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.7,
      ease: "power2.out",
    });
    gsap.to(catchRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 1.2,
      ease: "power2.out",
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComplete(true);
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setActive((prev) => ({ ...prev, [e.target.name]: true }));
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setActive((prev) => ({ ...prev, [e.target.name]: false }));
    // 簡易バリデーション
    if (e.target.name === "email") {
      setError((prev) => ({
        ...prev,
        email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email),
      }));
    } else {
      setError((prev) => ({ ...prev, [e.target.name]: !form[e.target.name] }));
    }
  };

  return (
    <>
      <ContactContainer>
        <Hero>
          <Light />
          <HeroTitle ref={titleRef}>CONTACT</HeroTitle>
          <HeroCatch ref={catchRef}>
            あなたの"変わりたい"を、ここから。
          </HeroCatch>
        </Hero>
        <FormSection>
          {complete ? (
            <CompleteMessage>
              ご連絡ありがとうございます。
              <br />
              24時間以内にご返信します。
            </CompleteMessage>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Label htmlFor="name" active={active.name} error={error.name}>
                お名前
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                active={active.name}
                error={error.name}
                required
              />
              <Label htmlFor="email" active={active.email} error={error.email}>
                メールアドレス
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                active={active.email}
                error={error.email}
                required
              />
              <Label
                htmlFor="message"
                active={active.message}
                error={error.message}
              >
                お問い合わせ内容
              </Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                active={active.message}
                error={error.message}
                required
              />
              <SubmitButton type="submit">送信</SubmitButton>
            </form>
          )}
          <Assurance>
            無理な勧誘は一切しません。
            <br />
            ご相談内容・個人情報は秘密厳守でお取り扱いします。
          </Assurance>
        </FormSection>
      </ContactContainer>
    </>
  );
};

export default ContactPage;
