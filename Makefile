dev-install: ## 開発用に動作する状態にする
	test -f .env || (cp .env.example .env && echo '.env に APP_PATH を設定してください'; exit 1)
	make build
	make yarn-install
	docker-compose up -d
.PHONY: dev-install

yarn-install: ## 依存パッケージを取得する
	docker-compose run --rm nuxt yarn install --frozen-lockfile
.PHONY: yarn-install

stop: ## フロントエンドの開発コンテナを停止する
	docker-compose stop nuxt || true
.PHONY: stop

start:
	docker-compose up workspace
.PHONY: start

up:
	docker-compose up -d
.PHONY: up

down: ## フロントエンドコンテナを削除する
	docker-compose down
.PHONY: down

restart: ## フロントエンドの開発コンテナを再起動する
	make stop
	make start
.PHONY: restart

build: ## コンテナイメージをビルドする
	docker-compose build
.PHONY: build

lint:
	docker-compose run nuxt yarn lint
.PHONY: lint

nuxt-container:
	docker-compose run nuxt ash
.PHONY:nuxt-container

.DEFAULT_GOAL := help
