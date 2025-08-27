# Coaching Website

矢田谷充則のコーチングウェブサイト - クリーンアーキテクチャで構築された高品質なReactアプリケーション

## 🚀 プロジェクト概要

このプロジェクトは、コーチング事業のためのプロフェッショナルなウェブサイトです。React + TypeScript + Tailwind CSSで構築され、モダンなアニメーションとレスポンシブデザインを特徴としています。

## 📁 プロジェクト構造

```
src/
├── components/          # 再利用可能なコンポーネント
│   ├── layout/         # レイアウト関連コンポーネント
│   ├── sections/       # セクション固有のコンポーネント
│   └── ui/            # 基本UIコンポーネント
├── constants/          # 定数・設定値
├── hooks/             # カスタムフック
├── pages/             # ページコンポーネント
├── styles/            # スタイル関連
├── types/             # TypeScript型定義
└── utils/             # ユーティリティ関数
```

## 🛠️ 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Framer Motion** - アニメーション
- **React Router** - ルーティング
- **Lucide React** - アイコン
- **Vite** - ビルドツール

## 📋 利用可能なスクリプト

### 開発環境

```bash
npm run dev
```
開発サーバーを起動します（ポート3000、ホストモード有効）

### ビルド

```bash
# 通常のビルド（ローカル用）
npm run build

# GitHub Pages用ビルド
npm run build:gh-pages
```

### その他

```bash
# プレビュー
npm run preview

# リント
npm run lint
npm run lint:fix

# 型チェック
npm run type-check
```

## 🌐 デプロイメント

### ローカル開発
```bash
npm run dev
```

### GitHub Pages
```bash
npm run build:gh-pages
```
GitHub Pages用に最適化されたビルドを生成します。

### その他のホスティング
```bash
npm run build
```
通常のビルドを使用してください。

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: `#d4af37` (ゴールド)
- **セカンダリ**: `#ffd700` (ライトゴールド)
- **アクセント**: `#e53935` (レッド)
- **背景**: `#0a0a0a` (ダークブラック)

### コンポーネント
- **Button**: 3つのバリアント（primary, secondary, outline）
- **Card**: 3つのバリアント（default, highlighted, glass）
- **AnimatedText**: 文字単位のアニメーション

## 📱 レスポンシブ対応

- **モバイル**: 320px〜
- **タブレット**: 768px〜
- **デスクトップ**: 1024px〜

## 🔧 開発ガイドライン

### ファイル命名規則
- コンポーネント: PascalCase (`Button.tsx`)
- フック: camelCase with `use` prefix (`useScrollToTop.ts`)
- 定数: UPPER_SNAKE_CASE (`NAV_ITEMS`)
- 型: PascalCase (`FormData`)

### コンポーネント設計原則
1. **単一責任の原則**: 各コンポーネントは1つの責任のみ
2. **再利用性**: 汎用的なコンポーネントは`ui/`に配置
3. **型安全性**: すべてのpropsに型定義を追加
4. **アクセシビリティ**: 適切なARIA属性とセマンティックHTML

### 状態管理
- ローカル状態: `useState`
- フォーム状態: コンポーネント内で管理
- グローバル状態: 現在は不使用（必要に応じてContext API導入）

## 🚀 パフォーマンス最適化

- **コード分割**: ベンダーライブラリを分離
- **画像最適化**: WebP形式推奨
- **バンドル最適化**: Viteの最適化機能を活用
- **レイジーローディング**: 必要に応じて実装

## 🔍 品質保証

- **TypeScript**: 型安全性の確保
- **ESLint**: コード品質の維持
- **Prettier**: コードフォーマットの統一
- **レスポンシブテスト**: 複数デバイスでの動作確認

## 📄 ライセンス

このプロジェクトはプライベートプロジェクトです。

## 👥 貢献

プロジェクトへの貢献を歓迎します。以下の手順に従ってください：

1. フォークを作成
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 サポート

質問や問題がある場合は、Issueを作成してください。