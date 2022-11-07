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
  } catch (e) {
    console.error('Failed to set object', obj, pointer, value);
  }
};

export const objPointer = (obj, pointer) => {
  let result = obj;
  let field;

  try {
    let pointerPaths = pointer.split('.');

    if (pointerPaths.length === 0) {
      pointerPaths = [pointer];
    }

    while (pointerPaths.length > 0) {
      field = pointerPaths.shift();
  
      if (!field) {
        return;
      }

      result = result[field];
    }

    return result;
  } catch (e) {
    console.error('Failed to find pointer', e);
  }
};

export default {
  hasProp,
  cleanCopy,
  updateObj,
  setObjField,
  objPointer,
};
