# Theme

This package contains all of the **root** styling of Owl UI. You do not need to add this package as a dependency as it is already listed as a dependency for each component.

The `global/variables` file is copied from the DSP output, you can read more about what that is [here](../../design/README.md). The naming convention of the variables are based on a reference/contextual methodology as described by [material design](https://m3.material.io/foundations/design-tokens/overview). Many of the values are derived directly from [OSG's branding site](https://stage.osg.ca/brand/).

This file, as well as other assets, are copied into the Theme with the [setup pipeline command](../../scripts/pipeline/cmd.setup.js). It runs whenever you `build:system`, `start:storybook`, `start:web`, or `publish:lerna`. **DO NOT** edit this file directly as it will be overwritten.

Any styling placed under `global` is required to be universal across all themes. Any specific styling needs to be isolated to a specific theme folder.

## Implementation

Components are styled using the [CSS Module](https://github.com/css-modules/css-modules) approach. When implementing Owl UI is it highly recommend that you use and have an understanding of [PostCSS](https://postcss.org/) to bundle your stylings.

If you are using Webpack as your build tool, below is the recommend configuration for bundling css/scss.

```js
const MiniCss = require('mini-css-extract-plugin');

const miniCssLoader = {
  loader: MiniCss.loader,
};
const cssLoader = {
  loader: 'css-loader',
  options: {
    url: false,
    modules: {
      localIdentName: '[local]',
    },
    sourceMap: true,
    importLoaders: 1,
  },
};
const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    implementation: require('postcss'),
    postcssOptions: {
      modules: true,
      plugins: [
        'postcss-import',
        'postcss-url',
        [
          'autoprefixer',
          {
            grid: true,
          },
        ],
      ],
    },
  },
};
const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    implementation: require('sass'),
  },
};

module.exports = [
  {
    test: /\.s[ac]ss$/i,
    use: [miniCssLoader, cssLoader, postCssLoader, sassLoader],
  },
];
```

## Customization

With the above configuration you also have the ability to isolate component styling by making use of the `prefix` prop available with each component. To enable isolation, simply change the value of `localIdentName` in the `cssLoader` config to `[folder]-[local]` then pass the folder name to the `prefix` on the component.

### Example Isolation

```jsx
// confirm/index.jsx

import { Default as DefaultBtn } from '@owlui/button';
import * as styles from './styles.module.scss';

const folderName = 'confirm';

export const Element = props => {
  const { children } = props;

  return (
    <div className={styles.confirmContainer}>
      <p>{children}</p>
      <DefaultBtn prefix={folderName}>Close</DefaultBtn>
      <DefaultBtn prefix={folderName} appearance="primary">
        Agree
      </DefaultBtn>
    </div>
  );
};

export default {
  Element,
};
```

```css
/* confirm/styles.module.scss */

@use '@owlui/button' as btn;

.container {
  background-color: #f5f5f5;
}

.owlui-button-default {
  border-radius: 100%;
}
```

### Modifying Theme Variables

You can also choose to modify theme variables for further customization. If you choose not to isolate your styles, you can simply make modifications in your root stylesheet. For example:

```css
@use '@owlui/theme/src' as theme with (
  $owl-sys-color-primary: #52fad1
);
```

If you do choose to isolate your styles, you then have the ability to adjust the `theme` variables on a per instance basis. For example you could have the primary color on your login page as `rebeccapurple` and then change it on the user profile page to `royalblue`.
