import {
  LookupConfigCss,
} from './utils.types';
import { str, obj } from './';

export const getClasses = (config: LookupConfigCss) => {
  const baseKey = str.toCapital(config.base);
  const globalKey = `scrowlui${baseKey}`;

  const lookupCSS = (className: string) => {
    const lookup = `${baseKey}${className}`;
    const globalLookup = `${globalKey}${className}`;

    if (obj.hasProp(config.module, lookup)) {
      return config.module[lookup];
    }

    if (obj.hasProp(config.module, globalLookup)) {
      return config.module[globalLookup];
    }

    // if (obj.hasProp(globalMod, lookup)) {
    //   return globalMod[lookup];
    // }

    // if (obj.hasProp(globalMod, globalLookup)) {
    //   return globalMod[globalLookup];
    // }

    return '';
  };

  let classes = '';

  if (!config.modifiers) {
    return classes;
  }

  config.modifiers.forEach(modifier => {
    if (!modifier.value) {
      return;
    }

    const modifierClass = `${modifier.base}${modifier.value}`;
    const optClass = lookupCSS(modifierClass);

    if (optClass) {
      classes += ` ${optClass}`;
    }
  });

  return classes;
};

export default {
  getClasses,
};
