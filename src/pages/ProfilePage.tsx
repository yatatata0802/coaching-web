import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
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
    <>
      <Header />
      <ProfileContainer>
        <ProfileContent>
          <Title>PROFILE</Title>
          <Description>
            プロフィールページの内容がここに表示されます。
          </Description>
        </ProfileContent>
      </ProfileContainer>
      <AboutContainer>
        <HeroSection>
          <HeroTitle>
            人生を"作品"として生きる ── 矢田谷充則という物語
          </HeroTitle>
        </HeroSection>
        <StorySection>
          <StoryBlock className="reveal-section">
            <StoryTitle>【1】はじまりの記憶：幼少期〜空手との出会い</StoryTitle>
            <StoryText>
              僕の人生は、4歳のときに空手道場の門を叩いたところから始まった。
              <br />
              兄の影響だったが、それは"自分で選んだ"というより、
              <br />
              "やるのが当たり前"と思わされていた選択だった。
              <br />
              <br />
              幼い頃の僕は、<Accent>"強さ"に憧れていた</Accent>。<br />
              強くなれば、自信が持てる。認められる。愛される。
              <br />
              そんな気持ちをどこかで抱えていた。
              <br />
              <br />
              でも、空手を続ける中で次第に、
              <br />
              "これって本当に自分のやりたいことなのか？"
              <br />
              という違和感が心に芽生えていった。
            </StoryText>
          </StoryBlock>
          <StoryBlock className="reveal-section">
            <StoryTitle>【2】解放と反発：空手をやめたその先に</StoryTitle>
            <StoryText>
              中学を卒業したとき、空手をやめた。
              <br />
              道場に通わない自分は、まるで鎖を解かれたようだった。
              <br />
              "やっと自由になれた"そう感じた。
              <br />
              <br />
              だがその自由は、次の迷いを連れてきた。
              <br />
              誰かの期待から解放されたぶん、自分が何者なのか分からなくなった。
              <br />
              学校にもなじめず、やや"はみ出し気味"な時期を過ごす。
              <br />
              ブレイクダンスとの出会いが、そんな自分に一つの光をくれた。
            </StoryText>
          </StoryBlock>
          <StoryBlock className="reveal-section">
            <StoryTitle>【3】ブレイクダンス：自分を"選ぶ"楽しさ</StoryTitle>
            <StoryText>
              地元の駅前で踊っていた先輩たちの姿に、胸が高鳴った。
              <br />
              "これや！かっこええ！"と直感した僕は、すぐに"教えてください"と声をかけた。
              <br />
              <br />
              空手とは違う。"やらされる"のではなく、"自分で選ぶ"表現。
              <br />
              音に合わせて、自分の意思で動く。
              <br />
              ブレイクダンスは、僕に<Accent>"自分を生きる感覚"</Accent>
              を教えてくれた。
            </StoryText>
          </StoryBlock>
          <StoryBlock className="reveal-section">
            <StoryTitle>
              【4】社会人としての自分：規律と成長のはざまで
            </StoryTitle>
            <StoryText>
              警察官として働きながら、僕は再び"規律"の中に戻った。
              <br />
              でも、今度は逃げなかった。自分で選んだ道だったからだ。
              <br />
              <br />
              日々の業務、当直、部下の指導。
              <br />
              決して楽な日々ではなかったが、その分、自分を律する力が磨かれていった。
              <br />
              並行して筋トレをライフワークとし、ムエタイの大会にも出場。
              <br />
              強くなるだけじゃない。<Accent>"自分を超える"</Accent>
              ということが、少しずつ分かってきた。
            </StoryText>
          </StoryBlock>
          <StoryBlock className="reveal-section">
            <StoryTitle>【5】転機：コーチングとの出会い</StoryTitle>
            <StoryText>
              "もっと成長したい。もっと、自分を生きたい"
              <br />
              そんな思いで出会ったのがコーチングだった。
              <br />
              <br />
              話すことで、こんなにも自分と向き合えるのか。
              <br />
              "人が本気で変わろうとすれば、必ず成長できる"
              <br />
              そう信じられるようになったとき、僕は"この力を人にも届けたい"と思った。
            </StoryText>
          </StoryBlock>
          <StoryBlock className="reveal-section">
            <StoryTitle>
              【6】ミッション：人生をデザインする伴走者として
            </StoryTitle>
            <StoryText>
              僕は、もう"空手をやらされた子供"じゃない。
              <br />
              "誰かに指示されて生きる人間"でもない。
              <br />
              <br />
              自分の意志で、挑戦を選び続けている。
              <br />
              筋トレも、格闘技も、コーチングも──
              <br />
              全部、"自分で選んだ生き方"だ。
              <br />
              <br />
              だからこそ、今くすぶっている人に伝えたい。
              <br />
              "変われない自分"にモヤモヤしているあなたに届けたい。
              <br />
              <br />
              人生は、自分でデザインできる。
              <br />
              そして、その一歩は、"誰かと話すこと"から始まる。
            </StoryText>
          </StoryBlock>
        </StorySection>
        <ImpactMessage>
          <ImpactText ref={impactRef}>
            {"このまま終わる？\nそれとも、ここから始める？"
              .split("")
              .map((char, i) => (
                <span key={i}>{char === "\n" ? <br /> : char}</span>
              ))}
          </ImpactText>
        </ImpactMessage>
      </AboutContainer>
    </>
  );
};

export default ProfilePage;
