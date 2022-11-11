import { JSON_DATA } from './json.types';

export const pointer = (item: JSON_DATA, pointer: string) => {
  let result: JSON_DATA = item;
  let field;

  try {
    let pointerPaths: Array<string> = pointer.split('.');

    if (pointerPaths.length === 0) {
      pointerPaths = [pointer];
    }

    while (pointerPaths.length > 0) {
      field = pointerPaths.shift();

      if (!field) {
        return;
      }

      result = result[field] as JSON_DATA;
    }

    return result;
  } catch (e) {
    console.error('JSON pointer failed', e);
    return;
  }
};

export default {
  pointer,
};
