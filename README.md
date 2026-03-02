# Codex Todo App (React + TypeScript)

Codexを使って作成した、シンプルなTodoリストアプリです。  
React + TypeScriptをベースに、基本操作とローカル永続化を実装しています。

## 主な技術領域

- フロントエンド: React
- 言語: TypeScript
- ビルドツール: Vite
- スタイリング: CSS
- データ永続化: `localStorage`

## 主な機能

- タスク追加
- タスク削除
- 完了チェックの切り替え
- フィルタ表示
  - `all`（すべて）
  - `active`（未完了）
  - `completed`（完了済み）
- タスク編集（保存 / キャンセル、Enter / Escape対応）
- リロード後もタスクを保持（`localStorage`）

## コンポーネント構成

- `App`
  - Todo状態管理、フィルタ管理、各種ハンドラ（追加・削除・完了・編集）
  - `localStorage` への保存と復元
- `TodoInput`
  - 新規タスク入力と追加
- `FilterTabs`
  - 表示フィルタ切り替えUI
- `TodoList`
  - 表示対象タスク一覧の描画
- `TodoItem`
  - 単一タスク表示、完了切替、編集、削除

## セットアップと実行

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## 補足

- タスクデータはブラウザの`localStorage`キー `todo-app-tasks` に保存されます。
- 保存データが不正な形式の場合は安全に無視し、空リストで起動します。
