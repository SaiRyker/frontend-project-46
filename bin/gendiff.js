import { Command } from 'commander';
import * as process from 'node:process';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const { format } = program.opts()
    // eslint-disable-next-line no-console
    console.log(genDiff(filepath1, filepath2, format));
  });

program.parse(process.argv);
