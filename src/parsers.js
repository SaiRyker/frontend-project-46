import yaml from 'js-yaml';

const parse = (data, parseExtension) => {
  switch(parseExtension) {
    case '.yaml':
    case '.yml':
        return yaml.load(data);
    case '.json':
        return JSON.parse(data);
    default:
        throw new Error('no existing extension of file');
  }
}

export default parse;
