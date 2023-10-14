import _ from 'lodash';

const outputValue = (value) => {
    if (_.isPlainObject(value)) {
        return '[complex value]';
    }
    return typeof(value) === 'string' ? `'${value}'` : value;
  }

const makePlain = (array) => {
    const cloneAr = _.cloneDeep(array);

    const iter = (currentValues, keys) => {
        const resLines = currentValues.filter(({ status }) => status !== 'no changed').map((item) => {
            const arrOfKeys = [...keys, item.key];
            const prop = arrOfKeys.join('.');

            switch(item.status) {
                case 'new':
                    return `Property '${prop}' was added with value: ${outputValue(item.value)}`;
                case 'deleted':
                    return `Property '${prop}' was deleted`;
                case 'changed':
                    return `Property '${prop}' was updated. From ${outputValue(item.oldValue)} to ${outputValue(item.newValue)}`;
                case 'nested':
                    return iter(item.children, arrOfKeys);
                default:
                    throw new Error('unknown status of property');
            }
        })
        return resLines.join('\n');
    }
    return iter(cloneAr, [])
};

export default makePlain;
