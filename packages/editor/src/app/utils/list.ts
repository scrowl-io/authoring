import { hasProp } from './obj';

export const filterBy = (list: Array<{}>, prop: string, value: any) => {
  return list.filter((item) => {
    if (!hasProp(item, prop)) {
      return false;
    }

    return item[prop] === value;
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
