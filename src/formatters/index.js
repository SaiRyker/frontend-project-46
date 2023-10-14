import makePlain from "./plain.js";
import makeStylish from "./stylish.js";

const formateChoice= (data, format) => {

    switch(format) {
        case 'stylish':
          return makeStylish(data);
        case 'plain':
          return makePlain(data);
        default:
          throw new Error('something went wrong');
      }
}

export default formateChoice;
