import { JSON_DATA, JSON_VALUE, pointer } from './json';

export const indexOf = (
  list: Array<JSON_DATA>,
  field: string,
  val: JSON_VALUE
) => {
  let res;
  let idx = -1;

  for (let i = 0, ii = list.length; i < ii; i++) {
    res = pointer(list[i], field) as JSON_VALUE;

    if (res === null || res === undefined) {
      continue;
    }

    if (res === val) {
      idx = i;
      break;
    }
  }

  return idx;
};

export const sortBy = (
  list: Array<JSON_DATA>,
  fields: Array<string>,
  reverse: boolean = false
) => {
  const fieldsLn = fields.length;

  return list.sort((a, b) => {
    let result = 0;
    let valA: any;
    let valB: any;

    for (let i = 0; i < fieldsLn; i++) {
      result = 0;
      valA = pointer(a, fields[i]);
      valB = pointer(b, fields[i]);

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
    }

    return result;
  });
};

export default {
  indexOf,
  sortBy,
};