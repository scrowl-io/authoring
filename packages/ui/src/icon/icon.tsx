import * as React from 'react';
import { IconDefaultProps } from './icon.types';
import * as IconCss from './_icon.scss';
import { css } from '../utils';

export const Icon = ({
  className,
  style,
  icon,
  appearance,
  display,
  filled,
  wght,
  opsz,
  grad,
  pxScale,
  ...props
}: IconDefaultProps) => {
  const baseClass = 'icons';
  const fill = `'FILL' ${filled ? 1 : 0}`;
  const styleWght = `'wght' ${wght ? wght : 400}`;
  const styleGrad = `'GRAD' ${grad ? grad : 0}`;
  const styleOpsz = `'opsz' ${opsz && opsz >= 20 && opsz <= 48 ? opsz : 48}`;
  const localStyles = Object.assign(
    {
      fontVariationSettings: `${fill}, ${styleWght}, ${styleGrad}, ${styleOpsz}`,
    },
    style
  );
  let classes = css.getClasses({
    module: IconCss,
    base: baseClass,
    modifiers: [
      {
        base: 'Appearance',
        value: appearance,
      },
      {
        base: 'PxScale',
        value: pxScale,
      },
    ],
  });

  switch (display) {
    case 'rounded':
      classes += ` ${IconCss.owluiIconsRounded}`;
      break;
    case 'sharp':
      classes += ` ${IconCss.owluiIconsSharp}`;
      break;
    case 'outlined':
    default:
      classes += ` ${IconCss.owluiIconsOutlined}`;
      break;
  }

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <span className={classes} {...props} style={localStyles}>
      {icon}
    </span>
  );
};

export default {
  Icon,
};
