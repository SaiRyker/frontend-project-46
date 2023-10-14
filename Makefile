install:
	npm ci

help:
	node bin/gendiff.js -h

gendiff:
	node bin/gendiff.js --format stylish 'file1.json' 'file2.json'

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish