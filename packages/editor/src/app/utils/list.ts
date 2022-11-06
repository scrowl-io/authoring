import { hasProp } from './obj';

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

export default {
  filterBy,
  indexBy,
};
