import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import parse  from './parsers.js';

const getExtension = (filepath) => extname(filepath);

const getParsedData = (filepath) => parse(readFileSync(resolve('__fixtures__', filepath)), getExtension(filepath));

const genDiff = (filepath1, filepath2) => {
  const file1Data = getParsedData(filepath1);
  const file2Data = getParsedData(filepath2);

  const sortedKeys1 = _.sortBy(_.keys(file1Data));
  const sortedKeys2 = _.sortBy(_.keys(file2Data));
  const uniqSortedKeys = _.uniq([...sortedKeys1, ...sortedKeys2]);

  // eslint-disable-next-line no-shadow
  const findDifference = (uniqSortedKeys, sortedKeys1, sortedKeys2) => {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key of uniqSortedKeys) {
      if (sortedKeys1.includes(key) && sortedKeys2.includes(key)) {
        if (file1Data[`${key}`] !== file2Data[`${key}`]) {
          result.push({
            status: 0, key, oldValue: file1Data[`${key}`], newValue: file2Data[`${key}`],
          });
        } else {
          result.push({ status: 1, key, value: file1Data[`${key}`] });
        }
      } else if (sortedKeys1.includes(key) && !(sortedKeys2.includes(key))) {
        result.push({ status: -1, key, value: file1Data[`${key}`] });
      } else if (sortedKeys2.includes(key) && !(sortedKeys1.includes(key))) {
        result.push({ status: 2, key, newValue: file2Data[`${key}`] });
      }
    }
    return result;
  };

  const diffRes = findDifference(uniqSortedKeys, sortedKeys1, sortedKeys2);

  const buildResult = (diffResult) => {
    let result = '{\n';
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of diffResult) {
      switch (obj.status) {
        case -1:
          result += String(`  - ${obj.key}: ${obj.value}\n`);
          break;
        case 1:
          result += String(`    ${obj.key}: ${obj.value}\n`);
          break;
        case 0:
          result += String(`  - ${obj.key}: ${obj.oldValue}\n  + ${obj.key}: ${obj.newValue}\n`);
          break;
        case 2:
          result += String(`  + ${obj.key}: ${obj.newValue}\n`);
          break;
        default:
          return 0;
      }
    }
    result += '}';
    return result;
  };

  return buildResult(diffRes);
};

console.log(genDiff('file1.yaml', 'file2.yaml'))
export default genDiff;
