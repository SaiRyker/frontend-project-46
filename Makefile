install:
	npm ci

help:
	node bin/gendiff.js -h

gendiff:
	node bin/gendiff.js 'file1.json' 'file2.json'

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish