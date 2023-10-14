import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import parse  from './parsers.js';
import searchStatus from './searchStatus.js';
import formateChoice from './formatters/index.js';


const getExtension = (filepath) => extname(filepath);

const getParsedData = (filepath) => parse(readFileSync(resolve('__fixtures__', filepath)), getExtension(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1Data = getParsedData(filepath1);
  const file2Data = getParsedData(filepath2);
  
  const dataForFormatting = searchStatus(file1Data, file2Data);

  return formateChoice(dataForFormatting, format);
};

export default genDiff;
