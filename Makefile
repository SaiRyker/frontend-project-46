help:
	node bin/gendiff.js -h

gendiff:
	node bin/gendiff.js 'file1.json' 'file2.json'

lint:
	npx eslint .