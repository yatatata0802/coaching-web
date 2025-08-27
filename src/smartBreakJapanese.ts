// 日本語テキストを1行N文字以内＋助詞・語尾で改行しないようにbrタグを自動挿入する関数
export function smartBreakJapanese(
  text: string,
  maxLineLength: number = 25
): string {
  const forbiddenLineStart = [
    "は",
    "が",
    "を",
    "に",
    "で",
    "と",
    "も",
    "の",
    "や",
    "ね",
    "よ",
    "す",
    "た",
    "だ",
    "で",
    "が",
    "。",
    "、",
    "！",
    "？",
  ];
  const blocks = text.split(/([。！？\n])/).filter(Boolean);
  let result = "";
  let line = "";
  for (let block of blocks) {
    if (/^[。！？\n]$/.test(block)) {
      line += block;
      result += line + '<br class="mobile-only-br"/>';
      line = "";
      continue;
    }
    for (let i = 0; i < block.length; i++) {
      line += block[i];
      if (line.length >= maxLineLength) {
        const nextChar = block[i + 1];
        if (nextChar && forbiddenLineStart.includes(nextChar)) {
          continue;
        }
        result += line + '<br class="mobile-only-br"/>';
        line = "";
      }
    }
  }
  if (line) result += line;
  return result;
}
