install:
	npm ci

help:
	node bin/gendiff.js -h

lint:
	npx eslint .

fix:
	npx eslint . --fix

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish

link:
	npm link

setup: install link