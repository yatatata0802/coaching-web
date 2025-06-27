import styled from "styled-components";
import Header from "./components/Header";
import HeroVideo from "./components/HeroVideo";
import KineticText from "./components/KineticText";
import Section from "./components/Section";
import CrackEffect from "./components/CrackEffect";
import MaskedContent from "./components/MaskedContent";
import { colors } from "./styles/GlobalStyles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";
import { keyframes } from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.dominant};
  color: white;
  position: relative;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
`;

const HeroSectionContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const HeroSubHeading = styled.p`
  font-size: 1.8em;
  margin-top: 24px;
  margin-bottom: 24px;
  font-family: "Noto Serif JP", serif;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45), 0 1px 0 #d4af37;
  background: rgba(10, 10, 10, 0.32);
  border-radius: 10px;
  padding: 0.7em 1.2em;
`;

const CallToAction = styled.button`
  background-color: ${colors.accent1};
  color: ${colors.dominant};
  padding: 15px 30px;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${colors.accent1} 0%, transparent 70%);
    opacity: 0;
    transform: scale(0);
    transition: transform 0.5s ease, opacity 0.5s ease;
    z-index: 0;
  }

  &:hover {
    background-color: ${colors.accent2};

    &::before {
      transform: scale(1);
      opacity: 0.5;
    }
  }
`;

const StyledSection = styled(Section)`
  scroll-snap-align: start;
  margin-top: 3.5em;
  padding: 2em 1.2em;
  h2 {
    font-size: 3em;
    margin-bottom: 20px;
    color: ${colors.accent1};
    font-family: "Noto Serif JP", serif;
  }
  h3 {
    font-size: 2em;
    margin-top: 30px;
    margin-bottom: 15px;
    color: ${colors.accent1};
    font-family: "Noto Serif JP", serif;
  }
  p {
    font-size: 1.2em;
    line-height: 1.8;
    max-width: 800px;
    margin-bottom: 15px;
    font-family: "Noto Sans JP", sans-serif;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 10px;
    font-family: "Noto Sans JP", sans-serif;
  }
`;

// ゴールド下矢印アニメーション
const bounce = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(16px); opacity: 1; }
`;
const ScrollDownWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;
const ScrollText = styled.div`
  color: #d4af37;
  font-size: 1em;
  letter-spacing: 0.12em;
  margin-bottom: 6px;
  font-family: "Noto Serif JP", serif;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
`;
const Arrow = styled.div`
  width: 28px;
  height: 28px;
  border-left: 3px solid #d4af37;
  border-bottom: 3px solid #d4af37;
  transform: rotate(-45deg);
  animation: ${bounce} 1.6s infinite;
  margin-bottom: 2px;
  filter: drop-shadow(0 2px 8px #d4af37aa);
`;

function Home() {
  const navigate = useNavigate();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppContainer>
      <Header />
      <HeroVideo />
      <HeroSectionContent>
        <KineticText text="このままで終わっていいのか？" />
        <HeroSubHeading>
          毎朝、同じ顔。
          <br />
          毎日、同じルート。
          <br />
          心が、どこか置き去りのまま。
          <br />
          <br />
          「こんなはずじゃなかった」って、気づいてるくせに。
        </HeroSubHeading>
        <CallToAction onClick={() => navigate("/main")}>
          最初の一歩を踏み出す
        </CallToAction>
      </HeroSectionContent>
      {/* Scroll Downアニメーション */}
      <ScrollDownWrapper>
        <ScrollText>SCROLL</ScrollText>
        <Arrow />
      </ScrollDownWrapper>
      <CrackEffect targetSectionId="profile" />
      <StyledSection id="profile">
        <MaskedContent sectionId="profile">
          <h2>Profile</h2>
          <p>
            <strong>「魅セルジブン×踊ルココロ 」</strong>
            をテーマに、挑戦を続けるあなたをサポートします。
          </p>
          <p>
            「なりたい自分」を夢で終わらせず、見た目、行動、雰囲気すべてに落とし込む具体的なメソッドを提供。
          </p>
          <p>
            筋トレや自己成長の経験を活かし、心と身体の両面から自己変革を支援します。
          </p>
          <p>
            「限界を感じているが、何から始めれば良いかわからない」「自信を持って行動できるようになりたい」そんなあなたが、自分を超え、理想を実現するためのサポートを行います。
          </p>
          <p>挑戦を通じて進化するあなた自身が、最大の影響力となる。</p>
          <CallToAction onClick={() => scrollToSection("contact-session")}>
            セッションのお申し込み・お問い合わせをする
          </CallToAction>
        </MaskedContent>
      </StyledSection>

      <CrackEffect targetSectionId="my-story" />
      <StyledSection id="my-story">
        <MaskedContent sectionId="my-story">
          <h2>My Story</h2>
          <h3>コーチングとの出会い</h3>
          <p>
            自分を変えたい、もっと強くなりたい。そんな気持ちで格闘技やフィジーク大会に挑み、心と身体を鍛えてきました。
          </p>
          <p>
            「カッコ悪いのは負けることじゃない、リングに立たないこと」——そう信じ、挑戦し続けてきました。
          </p>
          <p>
            でも、何かが足りない。どうすれば本当に変われるのか、いつも考えていました。
          </p>
          <p>
            年齢を言い訳にせず、「今日が人生で一番若い日」と捉え、限界に挑む中でコーチングに出会いました。
          </p>
          <p>
            「もっと強く」「もっとかっこよく」「もっと俺らしく」と思い、「自分で納得できる自分」になりたいと気づきました。
          </p>
          <p>
            挑戦を続ける人が自分らしさを磨き、前に進めるよう、一緒に歩んでいきたい。共に、その一歩を踏み出しましょう。
          </p>
          <h3>コーチとしてのミッション</h3>
          <p>私のミッションは、「なりたい自分」を夢で終わらせないことです。</p>
          <p>
            「こうなりたい」「もっと強くなりたい」と思っても、どう始めればいいかわからず立ち止まることって、案外あるものです。
          </p>
          <p>
            でも、今日が人生で一番若い日だからこそ、まず一歩踏み出してみることが大事だと思っています。
          </p>
          <p>やり方は人それぞれ。正解がなくても大丈夫です。</p>
          <p>
            なりたい自分に近づくために、笑いながら、時には失敗しながら、一緒に進んでいきましょう。
          </p>
          <p>
            行動を重ねることで、夢が現実に変わっていく。その過程を一緒に楽しめたら嬉しいです。
          </p>
          <h3>コーチ活動の中で感動したこと</h3>
          <p>
            コーチとして特に感動したのは、クライアントが一歩踏み出した瞬間に立ち会えたときです。
          </p>
          <p>
            最初は、自信が持てず、「どうしても行動に移せない」と悩んでいたクライアント。
          </p>
          <p>
            コーチングを通じて少しずつ「やりたい自分」と向き合い、自分で決めて動き出す力を育てていきました。
          </p>
          <p>
            ある日、クライアントが「自分を変えるために環境を整える」と力強く語ったとき、その表情が今でも印象に残っています。
          </p>
          <p>
            「変わりたい」という思いが、「自分で決めて動き出す力」に変わった瞬間でした。
          </p>
          <p>
            クライアントの成長に寄り添えることが、コーチとしてのやりがいです。
          </p>
          <p>これからも、挑戦する人を全力でサポートしていきます。</p>
        </MaskedContent>
      </StyledSection>

      <CrackEffect targetSectionId="coaching-data" />
      <StyledSection id="coaching-data">
        <MaskedContent sectionId="coaching-data">
          <h2>Coaching Data</h2>
          <ul>
            <li>コーチ活動開始時期</li>
            <li>セッション時間数</li>
            <li>セッション経験人数</li>
            <li>クライアントの属性・職業</li>
            <li>サポートしたテーマ</li>
          </ul>
        </MaskedContent>
      </StyledSection>

      <CrackEffect targetSectionId="about-session" />
      <StyledSection id="about-session">
        <MaskedContent sectionId="about-session">
          <h2>About Session</h2>
          <ul>
            <li>セッション可能な曜日・時間帯</li>
            <li>セッション手段</li>
          </ul>
          <h3>強み・得意分野</h3>
          <p>
            <strong>強み</strong>
          </p>
          <p>
            格闘技や筋トレで培ったストイックさと自己管理力が強みです。クライアントと共に考え、一歩踏み出す勇気を引き出す伴走型コーチングが得意で、自然体でサポートします。「なりたい自分」を夢で終わらせないために、目標設定や行動プラン作成を支援します。
          </p>
          <p>
            <strong>得意分野</strong>
          </p>
          <ul>
            <li>行動変容支援：具体策で挑戦力を引き出す</li>
            <li>自己管理強化：継続力を育てるアプローチ</li>
            <li>
              心と身体の両面サポート：フィジーク経験を活かしたセルフマネジメント
            </li>
          </ul>
          <h3>セッション料金</h3>
          <p>体験セッション可否・時間・料金不可・・</p>
          <h3>こんな方をサポートしたい</h3>
          <ul>
            <li>
              <strong>自分を変えたい人</strong>
              <br />
              「このままじゃダメだ」と思いながらも、どうやって動き出せばいいか迷っている方。
            </li>
            <li>
              <strong>挑戦を続けたい人</strong>
              <br />
              「もっと強くなりたい」「新しい自分に出会いたい」と考え、行動に移したい方。
            </li>
            <li>
              <strong>モチベーションを維持したい人</strong>
              <br />
              やる気が続かず、何かを始めても三日坊主で終わってしまう方。
            </li>
            <li>
              <strong>自己管理力を高めたい人</strong>
              <br />
              目標達成のために自己管理力を磨きたい方。
            </li>
          </ul>
          <h3>セッションの詳細</h3>
        </MaskedContent>
      </StyledSection>

      <CrackEffect targetSectionId="career-details" />
      <StyledSection id="career-details">
        <MaskedContent sectionId="career-details">
          <h2>経歴詳細</h2>
          <p>大阪府生まれ。</p>
          <p>
            4歳から中学3年まで空手に打ち込み、礼儀や根気強さを学びながら、「強さ」に対する憧れを育んできました。
          </p>
          <p>
            兄の影響で始めた空手でしたが、実は親から無理やりやらされていた部分もあり、次第に窮屈さを感じていました。
          </p>
          <p>
            中学卒業と同時に空手をやめたとき、心から解放された気持ちが強く、「やっと自由になれた！」という爽快感がありました。
          </p>
          <p>
            空手をやめて自由になった反動で、好きなことだけをしたいという気持ちが湧き上がりました。
          </p>
          <p>
            その結果、少しヤンチャしたり、不良じみた生活を楽しむようになりましたが、縛られない自分でいたいという思いが根底にありました。
          </p>
          <p>
            「人と違うことがしたい」「目立ちたい」という気持ちが強く、そんな時に出会ったのが、ブレイクダンスでした。
          </p>
          <p>
            地元の先輩たちが京橋駅でブレイクダンスをしているのを見て、衝撃を受けました。
          </p>
          <p>
            「これだ！かっこええ！」と直感し、その場で先輩たちに「教えてください！」と声をかけたのが始まりでした。
          </p>
          <p>
            「自由に、自分らしくカッコよく生きたい」という思いがブレイクダンスを通じて強まりました。
          </p>
          <p>
            やらされていた空手とは異なり、「自分で選んでやる楽しさ」を強く実感できた経験です。
          </p>
          <p>
            卒業後、社会人として仕事に就き、業務の中で自己管理能力を磨きました。
          </p>
          <p>
            筋トレをライフワークとし、ムエタイのアマチュア大会にも出場。目標達成のためにトレーニングに打ち込み、ストイックな自己管理力を高めました。
          </p>
          <p>
            社会人として働きながら、「自分をもっと成長させたい」という想いは常に心の中にありました。
          </p>
          <p>
            特に、「なりたい自分」を夢で終わらせないためには、どうすればいいかを考え続けていました。
          </p>
          <p>
            そんな時、コーチングに出会い、
            <strong>
              「人が本気で変わろうとすれば、必ず成長できる」という考え方に深く共感しました。
            </strong>
          </p>
          <p>
            自分の経験を振り返り、
            <strong>「挑戦し続ける生き方を伝えたい」</strong>
            と強く感じ、コーチングの道を歩み始めました。
          </p>
          <p>
            見た目・行動・雰囲気──すべてを通じて、理想を体現できる人間へと進化させる。
          </p>
          <p>
            人生そのものを"作品"としてデザインし、その生き様で周囲に影響を与える存在を目指しています。
          </p>
          <p>
            挑戦するすべての人の背中を押し、共に進化していけるコーチでありたい。
          </p>
          <p>これからも、全力でサポートし続けます。</p>
        </MaskedContent>
      </StyledSection>

      {/* 新しいお問い合わせ・セッション申し込みセクション */}
      <CrackEffect targetSectionId="contact-session" />
      <StyledSection id="contact-session">
        <MaskedContent sectionId="contact-session">
          <h2>セッションのお申し込み・お問い合わせ</h2>
          <p>
            あなたの「変わりたい」という強い意志を、私たちと共に形にしませんか？
          </p>
          <p>
            まずはお気軽にご相談ください。最初の一歩を、全力でサポートします。
          </p>
          {/* ここにフォームや連絡先情報を追加予定 */}
          <p>お問い合わせ先: example@example.com</p>
        </MaskedContent>
      </StyledSection>
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
