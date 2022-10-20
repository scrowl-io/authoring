export const hasProp = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const cleanCopy = obj => {
  return Object.assign({}, obj);
};

export default {
  hasProp,
  cleanCopy,
};
