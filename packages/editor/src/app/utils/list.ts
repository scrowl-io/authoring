import { hasProp, objPointer } from './obj';

export type OperatorType = 'EQ' | 'NE';

export const filterBy = (list: Array<{}>, prop: string, value: any, op?: OperatorType) => {
  return list.filter((item) => {
    if (!hasProp(item, prop)) {
      return false;
    }

    switch (op) {
      case 'NE':
        return item[prop] !== value;
      default:
        return item[prop] === value;
    }
  })
};

export const indexBy = (list: Array<{}>, prop: string, value: any): number => {
  let idx = -1;
  let listLn = list.length;

  for (let i = 0; i < listLn; i++) {
    if (hasProp(list[i], prop) && list[i][prop] === value) {
      idx = i;
      break;
    }
  }

  return idx;
};

export const sortBy = (list, pointer: string, reverse: boolean = false) => {
  return list.sort((a, b) => {
    let result = 0;
    let valA: any;
    let valB: any;

    valA = objPointer(a, pointer);
    valB = objPointer(b, pointer);

    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
    }

    if (typeof valB === 'string') {
      valB = valB.toLowerCase();
    }

    if (valA === valB) {
      return 0;
    }

    result = valA < valB ? -1 : 1;
    return reverse ? result * -1 : result;
  })
};

export default {
  filterBy,
  indexBy,
  sortBy,
};
