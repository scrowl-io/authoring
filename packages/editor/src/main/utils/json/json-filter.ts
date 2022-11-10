import { JSON_FILTER, JSON_DATA, JSON_FILTER_Comparison } from './json.types';
import { pointer } from './json-pointer';

const validate = (
  op: JSON_FILTER_Comparison['op'],
  compare: JSON_FILTER_Comparison['value'],
  value: JSON_FILTER_Comparison['value']
) => {
  let isMatch = false;

  switch (op) {
    case 'EQ':
      isMatch = value === compare;
      break;
    case 'CT':
      if (typeof compare !== 'string' || typeof value !== 'string') {
        return isMatch;
      }

      isMatch = compare.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      break;
  }

  return isMatch;
};

const match = (item: JSON_DATA, config: JSON_FILTER_Comparison) => {
  const value = pointer(item, config.field) as unknown;

  if (value === null || value === undefined) {
    return false;
  }

  const _val = value as JSON_FILTER_Comparison['value'];

  return validate(config.op, _val, config.value);
};

const matchAny = (item: JSON_DATA, filters: Array<JSON_FILTER_Comparison>) => {
  let isMatch = false;

  for (let i = 0, ii = filters.length; i < ii; i++) {
    isMatch = match(item, filters[i]);

    if (isMatch) {
      break;
    }
  }

  return isMatch;
};

export const filter = (item: JSON_DATA, filters: Array<JSON_FILTER>) => {
  let isMatch = false;

  filters.forEach((filterConfig) => {
    if (filterConfig.op === 'OR') {
      isMatch = matchAny(item, filterConfig.value);
    } else {
      isMatch = match(item, filterConfig);
    }
  });

  return isMatch;
};

export const filterAll = (
  list: Array<JSON_DATA>,
  filters: Array<JSON_FILTER>
) => {
  let matches: Array<JSON_DATA> = [];

  return list.filter((item) => {
    return filter(item, filters);
  });
};

export default {
  filter,
  filterAll,
};
