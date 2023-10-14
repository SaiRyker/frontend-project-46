import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import parse  from './parsers.js';
import searchStatus from './searchStatus.js';
import formateChoice from './formatters/index.js';
import * as process from 'node:process';

const getExtension = (filepath) => extname(filepath);
const buildFullPath = (filepath) => resolve(process.cwd(), filepath);
const getData = (filepath) => parse(readFileSync(filepath, 'utf8'), getExtension(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1Data = getData(buildFullPath(filepath1));
  const file2Data = getData(buildFullPath(filepath2));
  const dataForFormatting = searchStatus(file1Data, file2Data);
  
  return formateChoice(dataForFormatting, format);
};

export default genDiff;
