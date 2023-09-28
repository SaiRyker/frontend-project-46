import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve } from 'node:path';

const parse = (data) => JSON.parse(data);

const genDiff = (filepath1, filepath2) => {
    

    const file1 = parse(readFileSync(resolve(cwd(), filepath1)));
    const file2 = parse(readFileSync(resolve(cwd(), filepath2)));

    const sortedKeys1 = _.sortBy(_.keys(file1))
    const sortedKeys2 = _.sortBy(_.keys(file2))
    const uniqSortedKeys = _.uniq([...sortedKeys1, ...sortedKeys2])

    const findDifference = (uniqSortedKeys, sortedKeys1, sortedKeys2) => {
        const result = []
        for (const key of uniqSortedKeys) {
            if (sortedKeys1.includes(key) && sortedKeys2.includes(key)) {
                if (file1[`${key}`] !== file2[`${key}`]) {
                    result.push({status:0,key: key, oldValue:file1[`${key}`], newValue:file2[`${key}`]})
                } else {
                    result.push({status:1,key: key, value:file1[`${key}`]})
                }
            } else if (sortedKeys1.includes(key) && !(sortedKeys2.includes(key))){
                result.push({status:-1,key: key, value:file1[`${key}`]})
            } else if (sortedKeys2.includes(key) && !(sortedKeys1.includes(key))) {
                result.push({status:2,key: key, newValue:file2[`${key}`]})
            }
        }
        return result
    }

    const diffRes = findDifference(uniqSortedKeys, sortedKeys1, sortedKeys2)
    
    const buildResult = (diffRes) => {
        let result = '{\n'
        for (const obj of diffRes) {
            switch(obj.status) {
                case -1:
                    result += String(`  - ${obj.key}: ${obj.value}\n`)
                    break;
                case 1:
                    result += String(`    ${obj.key}: ${obj.value}\n`)
                    break;
                case 0:
                    result += String(`  - ${obj.key}: ${obj.oldValue}\n  + ${obj.key}: ${obj.newValue}\n`)
                    break;
                case 2:
                    result += String(`  + ${obj.key}: ${obj.newValue}\n`)
                    break;
            }
        }
        result += '}'
        return result
    }



    return buildResult(diffRes);
}



export default genDiff