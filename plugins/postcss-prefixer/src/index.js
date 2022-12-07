/* eslint-disable @typescript-eslint/no-var-requires */
const parser = require('postcss-selector-parser');

module.exports = (opts = {}) => {
  const { prefix, ignore } = opts;

  if (typeof prefix !== 'string') {
    throw new Error('@scrowl/postcss-prefixer: prefix option needs to be a string');
  }

  if (prefix.length <= 0) {
    throw new Error('@scrowl/postcss-prefixer: prefix option needs to have a length');
  }

  if (ignore && !Array.isArray(ignore)) {
    throw new Error('@scrowl/postcss-prefixer: ignore option needs to be an array');
  }

  const ignoreLn = Array.isArray(ignore) ? ignore.length : 0;

  const isSelectorValid = selector => {
    return (
      (selector.type === 'class' || selector.type === 'id') &&
      (ignoreLn > 0 ? ignore.indexOf(selector.value) === -1 : true)
    );
  };

  const renamer = selector => {
    if (isSelectorValid(selector)) {
      selector.value = `${prefix}${selector.value}`;
    }
  };

  const transformer = parser(selectors => {
    selectors.walkClasses(renamer);
  });

  return {
    postcssPlugin: '@scrowl/postcss-prefixer',
    OnceExit(root) {
      root.walkRules(async rule => {
        await transformer.process(rule);
      });
    },
  };
};

module.exports.postcss = true;
