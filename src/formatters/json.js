import _ from 'lodash';

const makeJson = (array) => {
    const cloneAr = _.cloneDeep(array);
    return JSON.stringify(cloneAr);
}

export default makeJson;
