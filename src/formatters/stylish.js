import _ from 'lodash';


const stringify = (val, depth) => {
    const spaceCounts = '    '.repeat(depth)
    if (!_.isObject(val)) {
      return val;
    }
  
    const lines = Object.entries(val).map(([key, value]) => {
      if (!_.isObject(value)) {
        return `${spaceCounts}${key}: ${value}`;
      }
  
      return `${spaceCounts}${key}: ${stringify(value, depth + 1)}`;
    });
    
    const result = ['{', ...lines].join('\n')
    return result + `\n${'    '.repeat(depth - 1)}}`;
  };

const childrenMap = (children, depth) => {
    const spaceCountsNew = '    '.repeat(depth - 1) + '  ';
    const clone = _.cloneDeep(children);
    let temp = "";
    for (const child of clone) {
        if (_.isArray(child)) {
            return childrenMap(child, depth+1);
        }
        else if (child.status === "nested") {
            temp += `${spaceCountsNew}  ${child.key}: {\n`;
            temp += childrenMap(child.children, depth+1);
            temp += `${spaceCountsNew}  }\n`;
        }
        else if (child.status === "no changed") {
           temp += `${spaceCountsNew}  ${child.key}: ${stringify(_.get(child, "value"), depth+1)}\n`
       } else if (child.status === "changed") {
           temp += `${spaceCountsNew}- ${child.key}: ${stringify(_.get(child, "oldValue",), depth+1)}\n${spaceCountsNew}+ ${child.key}: ${stringify(_.get(child, "newValue"), depth+1)}\n`
       } else if (child.status === "new") {
           temp += `${spaceCountsNew}+ ${child.key}: ${stringify(_.get(child, "value"), depth+1)}\n`
       } else if (child.status === "deleted") {
           temp += `${spaceCountsNew}- ${child.key}: ${stringify(_.get(child, "value"), depth+1)}\n`
       }
   }
   return temp
}

const makeStylish = (array) => {
    let result = "{\n"
    const cloneInitial = _.cloneDeep(array)

    for (const item of cloneInitial) {
        if (item.status === "nested") {
            result += `    ${item.key}: {\n`
            result += childrenMap(item.children, 2)
            result += '    }'
        }
        else if (item.status === "deleted") {
            result += `  - ${item.key}: `
            result += _.concat(stringify(item.value, 2)) 
        }
        else if (_.get(item, "status") === "new") {
            result += `  + ${item.key}: `
            result += stringify(item.value, 2)
        }
        result+= '\n'
        
    }

    return result + '}'
}

export default makeStylish;
