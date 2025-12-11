# 🎭 utip ライバー掲示板

[![CI/CD Pipeline](https://github.com/araragiafd/utip-liverboard/actions/workflows/ci.yml/badge.svg)](https://github.com/araragiafd/utip-liverboard/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ライバー事務所utipの所属ライバー専用掲示板サイトです。

## 🌟 デモ

- **ライブデモ**: [https://your-app.herokuapp.com](https://your-app.herokuapp.com)
- **スクリーンショット**: 

![ホーム画面](docs/screenshots/home.png)
![掲示板画面](docs/screenshots/board.png)

## 機能

- ライバー一覧表示
- ライバー別掲示板
- 投稿・返信機能
- レスポンシブデザイン

## 技術スタック

### フロントエンド
- React 18 + TypeScript
- React Router v6
- Tailwind CSS
- Axios

### バックエンド
- Node.js + Express
- SQLite (開発用)
- CORS対応

## セットアップ

### 1. 依存関係のインストール

```bash
# ルートディレクトリで実行
npm run install:all
```

### 2. 開発サーバーの起動

```bash
# 開発モード（フロントエンド・バックエンド同時起動）
npm run dev
```

または個別に起動：

```bash
# バックエンドのみ
npm run server:dev

# フロントエンドのみ（別ターミナルで）
npm run client:dev
```

### 3. アクセス

**ローカルアクセス:**
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:5000

**ネットワークアクセス（他の端末から）:**
```bash
# IPアドレスを確認
npm run ip

# ネットワークアクセス用に起動
npm run network
```

**他の端末からアクセスする方法:**

**同じWi-Fiネットワーク内:**
1. 同じWi-Fiネットワークに接続
2. `npm run ip` で表示されるIPアドレスを使用
3. スマートフォンやタブレットのブラウザで `http://[IPアドレス]:3000` にアクセス

**インターネット経由（異なるWi-Fiからも）:**

**方法1: ngrok（推奨）**
```bash
# 1. ngrokをインストール（https://ngrok.com/）
# 2. アカウント作成・認証トークン設定
# 3. 公開開始
npm run public
```

**方法2: Cloudflare Tunnel（無料・高性能）**
```bash
# 1. cloudflaredをインストール
# 2. ログイン: cloudflared tunnel login
# 3. 公開開始
npm run tunnel
```

**方法3: Heroku（本格デプロイ）**
```bash
# 1. Herokuアカウント作成・CLI インストール
# 2. heroku create your-app-name
# 3. git push heroku main
```

## API エンドポイント

### ライバー関連
- `GET /api/livers` - 全ライバー取得
- `GET /api/livers/:id` - 特定ライバー取得

### 投稿関連
- `GET /api/posts/liver/:liverId` - ライバー別投稿一覧
- `GET /api/posts/:id` - 投稿詳細（返信含む）
- `POST /api/posts` - 新規投稿作成
- `POST /api/posts/:id/replies` - 返信作成

### 管理者機能
- `POST /api/admin/livers` - ライバー追加
- `DELETE /api/admin/posts/:id` - 投稿削除
- `DELETE /api/admin/replies/:id` - 返信削除

## データベース構造

### livers テーブル
- id (PRIMARY KEY)
- name (ライバー名)
- avatar (アバター画像URL)
- description (説明)
- twitter_url (TwitterURL)
- youtube_url (YouTubeURL)
- created_at (作成日時)

### posts テーブル
- id (PRIMARY KEY)
- liver_id (ライバーID)
- title (タイトル)
- content (内容)
- author_name (投稿者名)
- created_at (作成日時)

### replies テーブル
- id (PRIMARY KEY)
- post_id (投稿ID)
- content (内容)
- author_name (投稿者名)
- created_at (作成日時)

## 本番環境への展開

1. 環境変数の設定
2. データベースをPostgreSQLに変更
3. 静的ファイルの配信設定
4. セキュリティ設定の強化

## ライセンス

MIT License