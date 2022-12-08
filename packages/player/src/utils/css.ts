import { CssMapProps } from './utils.types';

export const removeMapPrefix = (cssMap: CssMapProps) => {
  const keys = Object.keys(cssMap);
  let key = '';
  
  for (let i = 0, ii = keys.length; i < ii; i++) {
    key = keys[i].replace('owlui', '').replace(/^-/g, '').replace(/^[A-Z]/g, (letter) => {
      return letter.toLocaleLowerCase();
    });

    cssMap[key] = cssMap[keys[i]];
  }

  return cssMap;
};

export default {
  removeMapPrefix,
};
