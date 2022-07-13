**2022/07/12 TypeScript対応しました**
<br/>
## NextJS と Strapi の多言語対応機能を使用したボイラープレート

ヘッダーに設置された、ドロップダウンメニューにより、ナビゲーションやページの内容の言語切り替えを行う。
（言語についてはブラウザ設定を自動反映）

### NextJSのi18nルーティング機能を使用した多言語メニュー切り替え

#### 基本設定手順
1. Next.config.js
2. Localesフォルダ以下に言語翻訳ファイルを設定する
3. 各ページで翻訳ファイルのインポート


### Strapi(HeadlessCMS)の多言語コンテンツと連携

#### Strapiの設定
1. 設定->Internationalizationの画面で、使用したい言語とデフォルト言語を指定
2. Content-TypeBuilderから、コンテントタイプと各フィードの「高度な設定」で「Enable localization for this field」をチェック

#### API連携設定
1. レスポンスデータから、IDを一旦取得し、その取得したIDをもとに、API連携を改めて行い、記事のタイトルや記事内容のデータを取得する
2. （非同期処理）awaitとPromiseAllを組み合わせてデータを取得する。
