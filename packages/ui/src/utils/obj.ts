export const hasProp = (obj: object, prop: string) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const spreadProps = (target: object, source: object) => {
  const sourceKeys = Object.keys(source);

  sourceKeys.forEach((prop) => {
    if (!hasProp(target, prop)) {
      target[prop] = source[prop];
    }
  });

  return target;
};

export default {
  hasProp,
  spreadProps,
};
