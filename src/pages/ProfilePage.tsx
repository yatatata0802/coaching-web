import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowUp } from "lucide-react";
import SEO from "../components/SEO";
import AnimatedText from "../components/ui/AnimatedText";
import VisualGuide from "../components/ui/VisualGuide";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const profileTitle = '人生を"作品"として生きる\n矢田谷充則という物語';

  const basicProfile = [
    "1983年生まれ／大阪府大阪市在住",
    "関西外国語大学 卒業",
    "元・大阪府警警察官（20年間勤務）",
    "自己実現コーチ（GCS認定コーチ）",
    "趣味：筋トレ/ゲーム/美容と健康オタク",
    "家族構成：妻・娘（小1）の3人暮らし",
  ];

  const highlightText = (text: string, highlights: string[]) => {
    let result = text;
    highlights.forEach((highlight) => {
      result = result.replace(
        highlight,
        `<span class="text-[#e53935] font-semibold">${highlight}</span>`
      );
    });
    return result;
  };

  // タイトルを意味のある単位で分割
  const titleParts = [
    { text: '人生を"作品"として生きる', breakAfter: true },
    { text: "矢田谷充則という物語", breakAfter: false },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const profileStoryContent = [
    {
      type: "heading",
      level: 3,
      content:
        "タトゥーの針が肌に刺さる瞬間、私は20年間の警察人生に終止符を打った。",
    },
    {
      type: "paragraph",
      content: `現職の公安警察官が、
自らの身体に刺青を
入れる——。

その瞬間、私は確信しました。
「もう、後戻りはできない」__BR__

元公安警察官として
20年間“仮面”を被り
続けた私が、
なぜ今、あなたの人生の
“脚本”書き換えを
サポートするのか。
その全てを、ここに記します。

最初は憧れだった
警察官の制服が、
だんだんと重たい鎧に
変わっていきました。

「警察官は、真面目で
清廉潔白でなければ
ならない」__BR__
──社会が私に着せた、
その重たい"鎧"と、
任務が要求する
「完璧な別人格」という、
"偽り"の仮面を被って。

これは、そんな私が、
すべてを捨てる覚悟で、
20年分の鎧と仮面を
脱ぎ捨て、
自分の手で人生の脚本を
書き換えるまでの、
泥臭い記録です。`,
    },
    {
      type: "heading",
      level: 3,
      content: '【第一章】空手の道着という名の"制服"と、失われた主導権',
    },
    {
      type: "paragraph",
      content: `空手の道着は、私が４歳の時に最初に身につけた "制服"でした。

兄の背中を追い、
父の「強くなれ」という
言葉を疑うこともなく、
ただただ必死でした。
気づけば、中学3年生まで
毎週道場に通い続けて
いました。

誇りでした。
強さの象徴でした。
でもいつからか、
重く感じるように
なりました。
「行きたくない」

でも辞めませんでした。
いや、辞められなかった。
中学卒業と同時に
空手をやめたとき、
心から解放された気持ちが
強く、「やっと自由に
なれた！」という開放感が
ありました。

空手をやめて自由に
なった反動で、
好きなことだけをしたい
という気持ちが湧き
上がりました。
その結果、少しヤンチャ
したり、不良じみた生活を
楽しむようになりましたが、
縛られない自分でいたい
という思いが根底に
ありました。`,
    },
    {
      type: "heading",
      level: 3,
      content:
        '【第二章】再びの"鎧"と"仮面"──公安警察、トリプルフェイスの深き葛藤',
    },
    {
      type: "paragraph",
      content: `大学を卒業し、
私は再び"制服"を
身に纏いました。

今度は、警察官という
誇り高い制服です。
私生活においても、
心の中では常にこの制服を
着用し続けなければ
なりませんでした。

警察学校で学んだことは
「出る杭は打たれる」
「一番手より二番手」
という哲学でした。
学生時代の私は
「調子乗り」で
「目立ちたがり屋」でした。
しかし、その個性は一枚、
また一枚と、
分厚い鉄板の下に
封印されていきました。

世間の目、組織の正義、
沈黙という名のルール…。
憧れだったはずの"制服"は、
いつしか私の心を縛り、
動きを鈍らせる、
何重もの重たい"鎧"へと
変貌を遂げていったのです。

そして、配属された
「公安」という秘匿性の
高い世界で、
私はその鎧の上から、
さらに何枚もの"仮面"を
被ることを要求されました。

分かりやすく例えるなら、
名探偵コナンの「安室透」です。
私立探偵「安室透」、
黒ずくめの組織の一員
「バーボン」、
そして公安警察官「降谷零」。
彼は3つの顔（トリプルフェイス）を完璧に使い分けます。

私が送っていた日々は、
まさにそれでした。

1. 「正義」の仮面を被った、警察官としての顔
2. 「別の誰か」を完璧に演じる、公安としての顔
3. すべての仮面を脱いだ後、鏡の前に立つ、"生身の私"としての顔__BR__

この三つの顔の境界線は、
次第に曖昧になっていきました。

気づけば私は再び、
誰かが書いた「脚本」で
「正解」を演じるだけの
役者になっていました。`,
    },
    {
      type: "heading",
      level: 3,
      content: "【第三章】未来が、現在を殺しに来た日",
    },
    {
      type: "paragraph",
      content: `人生の転機は、
妻から教わった
「コーチング」との
出会いでした。

最初は正直、
「なんか怪しいなぁ」と
半信半疑でした。
しかし、YouTubeで偶然
見つけたコーチングの動画が、
私の人生を根底から
揺るがすことになったのです。

自分自身と向き合う中で、
私は見てしまいました。
**"未来の自分"**の姿を。

それは、警察官の"鎧"を
脱ぎ捨て、自分の言葉で、
自分の経験で、
誰かの人生に火をつけている
私の姿でした。

その「ありたい自分」の姿が、
あまりにも鮮明に、
あまりにもリアルに、
私の心に焼き付いて
しまいました。

心理学では、これを
「コンフォートゾーン
（快適な領域）が未来に移行する」
と呼ぶそうです。

しかし、私にとってそれは、
そんな生易しいものでは
ありませんでした。
未来が、現在を"殺し"に
来たのです。

理想の未来がリアルに
なればなるほど、
今の現実が耐え難いほどの
地獄に変わっていきました。
真面目を演じ、
自分を押し殺している
「警察官としての現在」が、
まるで拷問のように
感じられたのです。

「本当にこのままでいいのか？」
そんなぬるい問いでは
ありません。
「なぜ、私はまだ、
こんな場所にいるんだ？」

「ありたい自分」と
「あるべき自分」の間で、
私の心は引き裂かれそうでした。
思っていることと、
やっていることの致命的な矛盾。

身体は、正直でした。
私の魂の悲鳴を、
忠実に代弁し始めました。
動悸、呼吸の浅さ、
睡眠障害…。

そして、私は鬱状態になり、
1ヶ月間休職することに
なりました。
コーチングが、私に
「本当の地獄」を見せたのです。`,
    },
    {
      type: "heading",
      level: 3,
      content: '【第四章】反逆のタトゥーと、最後の"制服"',
    },
    {
      type: "paragraph",
      content: `結局、復帰することなく
退職を決意しました。

退職の報告をするや否や、私はタトゥーショップに予約の連絡を入れました。

まだ正式な退職日も
決まっていないのに、
現職の警察官が自らの身体に
刺青を入れました。

やっと自由になれる。
解放された。
空手をやめた時と似たような、
あの懐かしい感覚でした。

コーチングは地獄を見せた
のではなく、
現実を前に進めてくれたのです。

「なりたい姿を明確に
思い続けていたら、
必ず現実化する」
その言葉を、私は、
自らの身体で証明しました。`,
    },
    {
      type: "question",
      content: "──もし、今の自分を変えるとしたら、最初に何をしますか？",
    },
    {
      type: "heading",
      level: 3,
      content: '【最終章】人生を"作品"に変える『あなた』へ',
    },
    {
      type: "paragraph",
      content: `特別な人間だから、
できたわけではありません。

ただ、もうこの役を演じるのが
限界だった。それだけです。

これは、私が"脚本"を
この手で書き換えるまでの、
泥臭い記録です。

もう、誰かの言いなりに
なることは終わりです。

そして今、自分の人生の"脚本"を
見失っているあなたが、
新しいページを書き始めるための
物語です。

私の役目は、あなたの物語が
最高の輝きを放つよう、
隣でサポートすることです。

さあ、次はあなたの番です。
あなたの人生という、
最高の作品の、
最初の1ページを書き始めましょう。

矢田谷充則があなたの人生の
脚本を書き換えるお手伝いをします。`,
    },
    {
      type: "question",
      content: "──まずは、あなたの心の声に 耳を傾けることから始めませんか？",
    },
  ];

  return (
    <>
      <SEO
        title="PROFILE | 矢田谷充則の物語"
        description="公安警察官として20年間勤務した経験と、GCS認定コーチとしての専門知識を活かし、個人の目標達成と行動変容を支援する矢田谷充則の公式プロフィールページです。"
        keywords="矢田谷充則,プロフィール,GCS認定コーチ,元公安警察官,公安警察,筋トレ,ムエタイ,大阪,人生設計,継続力,目標達成,行動変容"
        type="person"
        author={{
          name: "矢田谷充則",
          jobTitle: "GCS認定コーチ, 元公安警察官",
          description:
            "公安警察官として20年間勤務した経験と、GCS認定コーチとしての専門知識を活かし、個人の目標達成と行動変容を支援する専門家。",
          knowsAbout: [
            "コーチング",
            "目標達成",
            "行動変容",
            "継続力",
            "公安警察",
            "警察官",
            "筋トレ",
            "ムエタイ",
            "人生設計",
          ],
          alumniOf: "関西外国語大学",
          gender: "male",
          sameAs: [
            "https://www.ginza-coach.com/coaches/view.cgi?username=2505FB4944",
          ],
        }}
      />
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans header-safe-padding pb-12 sm:pb-16 relative overflow-hidden">
        {/* ヒーローセクション - ヘッダー重なり修正 */}
        <section className="text-center py-8 sm:py-12 lg:py-16 px-4 sm:px-5 relative z-10 overflow-hidden">
          <div className="relative flex justify-center items-center mb-6 sm:mb-8 z-2 px-2">
            {/* タイトルアニメーション - 改行制御最適化 */}
            <div className="w-full max-w-4xl">
              {titleParts.map((part, partIndex) => (
                <div
                  key={partIndex}
                  className={`flex justify-center flex-wrap ${
                    part.breakAfter ? "mb-2 sm:mb-4" : ""
                  }`}
                >
                  {Array.from(part.text).map(
                    (char: string, charIndex: number) => (
                      <motion.span
                        key={`${partIndex}-${charIndex}`}
                        className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[0.04em] sm:tracking-[0.06em] md:tracking-[0.08em] mx-[0.02em] sm:mx-[0.03em] md:mx-[0.04em]"
                        style={{
                          textShadow: "0 0 16px #e53935, 0 0 32px #fff",
                          filter: "drop-shadow(0 0 8px #e53935)",
                        }}
                        initial={{
                          y: 80,
                          opacity: 0,
                          scale: 0.7,
                          rotate: -30 + charIndex * 2,
                          filter: "blur(6px)",
                        }}
                        whileInView={{
                          y: 0,
                          opacity: 1,
                          scale: 1.1,
                          rotate: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          delay: 0.12 + (partIndex * 20 + charIndex) * 0.04,
                          duration: 0.7,
                          type: "spring",
                          stiffness: 400,
                          damping: 18,
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* 顔写真 */}
          <div className="flex justify-center mb-8">
            <img
              src="/profile.jpg"
              alt="矢田谷充則"
              className="w-32 h-40 object-cover shadow-lg border-4 border-[#d4af37]"
            />
          </div>

          {/* プロフィール基本情報 - スマホ最適化 */}
          <div className="max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-10 p-4 sm:p-6 bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/20 border border-[#d4af37]/40 rounded-2xl text-left border-l-[5px] border-[#e53935] text-sm sm:text-base">
            {basicProfile.map((line, index) => (
              <div key={index} className="mb-1">
                {line}
              </div>
            ))}
          </div>

          {/* My Story セクション */}
          <section className="max-w-4xl mx-auto px-4 sm:px-5 relative z-10 jp-text-optimal text-balance">
            {/* タイトルのみ大きく表示 */}

            {/* headingごとにグループ化して四角で囲む */}
            {(() => {
              const blocks = [];
              let currentBlock = [];
              let blockIdx = 0;
              for (let i = 0; i < profileStoryContent.length; i++) {
                const item = profileStoryContent[i];
                if (item.type === "heading") {
                  if (currentBlock.length > 0) {
                    // 章末の問いかけを追加
                    if (blockIdx === 0) {
                      currentBlock.push({
                        type: "question",
                        content: "──あなたが本当に「やりたいこと」は何ですか？",
                      });
                    } else if (blockIdx === 1) {
                      currentBlock.push({
                        type: "question",
                        content:
                          "──あなたは今、誰の期待に応えるために生きていますか？",
                      });
                    } else if (blockIdx === 2) {
                      currentBlock.push({
                        type: "question",
                        content:
                          "──あなたが今、社会で演じている『役』は、本当にあなたが望んだものですか？",
                      });
                    } else if (blockIdx === 3) {
                      currentBlock.push({
                        type: "question",
                        content:
                          "──もし、今の自分を変えるとしたら、最初に何をしますか？",
                      });
                    }
                    blocks.push([...currentBlock]);
                    currentBlock = [];
                    blockIdx++;
                  }
                }
                currentBlock.push(item);
              }
              if (currentBlock.length > 0) blocks.push(currentBlock);
              return blocks.map((block, idx) => (
                <VisualGuide type="glow-border" key={idx}>
                  <motion.div
                    className="mb-8 p-6 sm:p-6 bg-gradient-to-br from-[#d4af37]/10 via-[#181818]/60 to-[#ffd700]/10 border-2 border-[#d4af37]/40 rounded-2xl shadow-[0_8px_32px_rgba(212,175,55,0.10)] transition-all duration-500"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {block.map((item, i) => {
                      if (item.type === "heading") {
                        return (
                          <motion.h3
                            key={i}
                            className="text-lg sm:text-xl md:text-2xl font-bold text-[#d4af37] mt-2 mb-4 leading-normal"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {item.content}
                          </motion.h3>
                        );
                      }
                      if (item.type === "question") {
                        return (
                          <motion.p
                            key={i}
                            className="text-base font-bold text-[#e53935] mt-6 mb-2 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {item.content}
                          </motion.p>
                        );
                      }
                      if (item.type === "paragraph") {
                        // さらに多くの区切り語や接続詞、感嘆符・疑問符の後、2文以上続いた場合にも空行を入れる
                        const breakAfter = [
                          "はじめまして。",
                          "あなたは今、",
                          "その瞬間、",
                          "記録です。",
                          "サポートするのか。",
                          "ここに記します。",
                          '【第一章】空手の道着という名の"制服"と、失われた主導権',
                          '【第二章】再びの"鎧"と"仮面"──公安警察、トリプルフェイスの深き葛藤',
                          "【第三章】未来が、現在を殺しに来た日",
                          "私は確信しました。",
                          "これは、そんな私が、",
                          "その結果、",
                          "その後、",
                          "そして、",
                          "しかし、",
                          "気づけば",
                          "自分自身と向き合う中で",
                          "そのとき、",
                          "つまり、",
                          "一方で、",
                          "なぜなら、",
                          "本当は、",
                          "実は、",
                          "もちろん、",
                          "例えば、",
                          "やがて、",
                          "だからこそ、",
                          "今思えば、",
                          "ふと、",
                          "ある日、",
                          "さて、",
                          "こうして、",
                          "ついに、",
                          "また、",
                          "さらに、",
                          "まず、",
                          "次に、",
                          "最後に",
                        ];
                        let text = item.content;
                        // 「1.」「2.」「3.」の直前で改行
                        text = text.replace(/(1\.)/g, "__BR__$1");
                        text = text.replace(/(2\.)/g, "__BR__$1");
                        text = text.replace(/(3\.)/g, "__BR__$1");
                        // さらに多くの区切りフレーズの直前または直後で空行を挿入
                        text = text.replace(/(でもいつからか)/, "__BR__$1");
                        text = text.replace(/(空手をやめて自由に)/, "__BR__$1");
                        // breakAfterリストのキーワードの後に空行を挿入（ただし「気づけば、」は区切らない）
                        breakAfter.forEach((keyword) => {
                          if (
                            keyword === "気づけば" ||
                            keyword === "自分自身と向き合う中で"
                          ) {
                            text = text.replace(
                              new RegExp(keyword + "(、?)", "g"),
                              (match, p1) => (p1 ? match : keyword + "__BR__")
                            );
                          } else {
                            text = text.split(keyword).join(keyword + "__BR__");
                          }
                        });
                        // 「！」や「？」の後にも改行（ただし直後が「」」の場合は改行しない）
                        text = text.replace(
                          /([！？])(?!」)([^<])/g,
                          "$1__BR__$2"
                        );
                        // 2文以上続いた場合に自動で空行を入れる（簡易的な段落分け）
                        text = text.replace(/(。[^。]{20,}。)/g, "$1__BR__");
                        // 強調キーワードをspanでラップ
                        const highlightWords = ["覚悟", "地獄", "自由"];
                        highlightWords.forEach((word) => {
                          text = text
                            .split(word)
                            .join(
                              `<span class='font-bold text-[#e53935]'>${word}</span>`
                            );
                        });
                        // 「。」または文末の「──」の後に改行
                        const parts: string[] = text.split(/(。|──|__BR__)/);
                        // 強調ワードを含む場合はdangerouslySetInnerHTMLで描画
                        if (
                          /<span class='font-bold text=\[#e53935\]'>/.test(
                            parts[0]
                          )
                        ) {
                          return (
                            <span
                              key={i}
                              dangerouslySetInnerHTML={{ __html: parts[0] }}
                            />
                          );
                        }
                        return (
                          <motion.p
                            key={i}
                            className={`text-sm leading-normal`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {parts.map((part, idx) => {
                              if (part === "──") {
                                return null;
                              }
                              if (part === "。") {
                                return (
                                  <React.Fragment key={idx}>
                                    {part}
                                    <br />
                                  </React.Fragment>
                                );
                              }
                              if (part === "__BR__") {
                                return <br key={idx} />;
                              }
                              // 強調ワードを含む場合はdangerouslySetInnerHTMLで描画
                              if (
                                part.includes(
                                  "<span class='font-bold text-[#e53935]'>"
                                )
                              ) {
                                return (
                                  <span
                                    key={idx}
                                    dangerouslySetInnerHTML={{ __html: part }}
                                  />
                                );
                              }
                              return (
                                <React.Fragment key={idx}>
                                  {part}
                                </React.Fragment>
                              );
                            })}
                          </motion.p>
                        );
                      }
                    })}
                  </motion.div>
                </VisualGuide>
              ));
            })()}
          </section>

          {/* ページ下部固定CTA → note誘導ボタンのみ残す */}
          <div className="fixed bottom-0 left-0 w-full z-50 p-4 sm:p-6 bg-[#0a0a0a]/90 backdrop-blur-sm border-t border-[#d4af37]/30 flex justify-center items-center">
            <a
              href="https://note.com/YOUR_NOTE_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-[#181818] to-[#333] text-[#ffd700] font-semibold text-base sm:text-lg shadow-md border-2 border-[#d4af37] hover:bg-[#222] hover:text-[#fff] transition-all duration-300 text-center"
              style={{ minWidth: 200 }}
            >
              ＞＞ 物語の“本編”を読む（note第1話へ）
            </a>
          </div>

          {/* GCS認定コーチセクション（LINE特典ボタンより上に移動） */}
          <section className="max-w-4xl mx-auto px-4 sm:px-5 relative z-10 mb-10 sm:mb-12 mt-16 pb-32">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-[#d4af37]/20 to-[#ffd700]/20 border border-[#d4af37]/40 rounded-2xl text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-2">
                GCS認定コーチ
              </h2>
              <p className="text-gray-300 text-base mb-4">
                銀座コーチングスクールにて体系的なコーチングスキルを習得。厳格な基準をクリアした、プロのコーチです。
                <a
                  href="https://www.ginza-coach.com/coaches/view.cgi?username=2505FB4944"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#d4af37] font-bold underline ml-2 hover:text-[#ffd700] transition-colors"
                >
                  ▶︎認定コーチ詳細を見る <span className="text-xs">↗</span>
                </a>
              </p>
            </div>
          </section>

          {/* LINE特典ボタンをGCS認定コーチセクションの下に配置 */}
          <div className="flex justify-center my-8">
            <button
              onClick={() => window.open("https://lin.ee/MX41vXf", "_blank")}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#06C755] text-white font-bold text-xl sm:text-2xl shadow-2xl hover:bg-[#32e67f] transition-all duration-300 transform hover:scale-105 max-w-xs"
              style={{ minWidth: 220 }}
            >
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="12" fill="#fff" />
                <path
                  d="M20 8C12.268 8 6 13.477 6 20.222c0 3.77 2.49 7.09 6.32 9.13l-1.01 3.7a1 1 0 0 0 1.45 1.13l4.09-2.23c1.01.14 2.06.22 3.15.22 7.732 0 14-5.477 14-12.222C34 13.477 27.732 8 20 8Z"
                  fill="#06C755"
                />
                <path
                  d="M27.5 19.5h-2m-3 0h-2m-3 0h-2"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              LINEで特典を受け取る
            </button>
          </div>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-28 right-5 sm:bottom-10 sm:right-10 bg-[#d4af37] text-[#181818] p-3 rounded-full shadow-lg z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
