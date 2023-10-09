help:
	node bin/gendiff.js -h

gendiff:
	node bin/gendiff.js 'forTest1.json' 'forTest2.json'

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest