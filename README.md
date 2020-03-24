# sdvx-scoretool-frontend
[![CircleCI](https://circleci.com/gh/il-y-seto/sdvx-scoretool-frontend/tree/master.svg?style=svg)](https://circleci.com/gh/il-y-seto/sdvx-scoretool-frontend/tree/master)

SDVXのスコアツール
masterブランチにコミットが積みあがると自動でデプロイされ、[こちら](https://il-y-seto.github.io/sdvx-scoretool-frontend/)で公開されます(実質dev環境)

## はじめかた

```bash
# .envファイルをコピー
$ cp .env.example .env

# nuxtのコンテナをビルドして立ち上げ、パッケージの取得等も行う
$ make dev-install

# コンテナを立ち上げる
$ make up

# 必要なコンテナが立ち上がり、localhost:3000(多分)でアクセスすれば閲覧できるようになります(ホットリロードつき)
$ make start

```
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
