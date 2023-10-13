import { test, expect } from '@jest/globals';
import * as path from 'node:path';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylish = fs.readFileSync(getFixturePath('stylishTemplate.txt'),'utf8');
console.log(stylish)
console.log(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))


test('for genDiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(stylish);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(stylish);
});
