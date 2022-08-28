# knowledge-article-character-counter-crx

このプロジェクトは 以前開発した Knowledge の文字数カウンターの CLI ツールを Chrome の拡張機能にしたものです。

以前開発していた repository は https://github.com/50ra4/knowledge-article-character-counter になります。

作成した拡張機能は github pages に公開しているので、[こちら](https://50ra4.github.io/knowledge-article-character-counter-crx/)からダウンロードできます。

免責：当拡張機能を利用して起きたトラブルや損失について開発者は一切の責任を負いませんので、理解した上で本機能をご利用ください mm

## Setup

`git clone`後、プロジェクト直下で npm package の依存関係を install します。

```
npm i
```

別途、node.js（16.15.1）が必要です。

## Build

Vite を利用して、ソースコードを build します。
実行するとプロジェクト直下の extension のディレクトリに展開します。

```
npm run build
```

## Testing

Jest や@testing-library を用いて、テストを実行します。

```
npm run test
```

開発中にテストを実行する場合、Jest の watch オプションを追加することでソースファイルが変更される度にテストを実行します。

```
npm run test -- --watch
```

## Dev Server

Vite と`@crxjs/vite-plugin`の plugin を利用して、HMR を使いながら開発できます。

```
npm run dev
```

## Linting

ESLint を利用し、Lint を実行しています。

```
npm run lint:eslint
```

VSCode の拡張機能と併用することで、ファイル保存時に実行します。
また、husky と併せて利用しており、commit 時にチェックを実行しているため、エラー状態での commit を抑止します。

## Formatting

prettier を利用し、コードの整形を行なっています。

```
npm run lint:prettier
```

VSCode の拡張機能と併用することで、ファイル保存時に実行します。
また、husky と併せて利用しており、commit 時にチェックを実行し、自動で整形します。

## Document

作成した Chrome 拡張機能を公開時に利用する静的な html などを docs ディレクトリに構築します。

```
npm run docs
```
