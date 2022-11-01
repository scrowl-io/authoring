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

export const setObjField = (obj, pointer, value) => {
  let temp = obj;
  let field;
  let pointerPaths = pointer.split('.');

  if (pointerPaths.length === 0) {
    pointerPaths = [pointer];
  }

  try {
    while (pointerPaths.length > 0) {
      field = pointerPaths.shift();
  
      if (!field) {
        return;
      }
      
      if (pointerPaths.length !== 0) {
        temp = temp[field];
      } else {
        temp[field] = value;
      }
    }

    temp = value;
  } catch (e) {
    console.error('Failed to set object', obj, pointer, value);
  }
};

export default {
  hasProp,
  cleanCopy,
  updateObj,
  setObjField,
};
