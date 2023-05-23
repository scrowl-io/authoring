export type AsyncForEachResult<T> = {
  error: boolean;
  data: T;
  result: unknown;
}

export const asyncForEach = <T extends unknown>(
  list: Array<T>,
  fn: Function
): Promise<Array<AsyncForEachResult<T>>> => {
  return new Promise(async function (resolve) {
    const promises: Array<AsyncForEachResult<T>> = [];
    let result;

    for (let i = 0, ii = list.length; i < ii; i++) {
      try {
        result = await fn(list[i], i, list);
        promises.push({
          error: false,
          data: list[i],
          result,
        });
      } catch (e) {
        promises.push({
          error: false,
          data: list[i],
          result: e,
        });
      }
    }
  });
};

export default {
  asyncForEach,
};