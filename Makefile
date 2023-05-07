install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

serve:
	npx webpack serve

build:
	npx webpack