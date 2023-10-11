import { test, expect } from '@jest/globals';
import * as path from 'node:path';
// import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = `{
  - Lunch included: false
  + Lunch included: true
  - destination: Los Angeles
  + destination: New York
  - plane: Boeing 737
  + plane: Boeing 738
    timeOfFlying: 12 hours
  + Luxury packet: true\n}`;

test('for genDiff', () => {
  expect(genDiff(getFixturePath('forTest1.json'), getFixturePath('forTest2.json'))).toEqual(result);
  expect(genDiff(getFixturePath('forTest1.yml'), getFixturePath('forTest2.yml'))).toEqual(result);
  expect(genDiff(getFixturePath('forTest1.yaml'), getFixturePath('forTest2.yaml'))).toEqual(result);
});
