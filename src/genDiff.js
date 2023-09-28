import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve } from 'node:path';

const parse = (data) => JSON.parse(data);

const genDiff = (filepath1, filepath2) => {
    const file1 = parse(readFileSync(resolve(cwd(), filepath1)));
    const file2 = parse(readFileSync(resolve(cwd(), filepath2)));
    console.log(file1);
    console.log(file2);
    return 0;
}

export default genDiff