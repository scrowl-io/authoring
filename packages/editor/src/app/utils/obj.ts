export const hasProp = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const cleanCopy = obj => {
  return Object.assign({}, obj);
};

export const updateObj = (obj, data) => {
  for (const [prop, val] of Object.entries(data)) {
    if (hasProp(obj, prop)) {
      obj[prop] = val;
    }
  }
};

export default {
  hasProp,
  cleanCopy,
  updateObj,
};
