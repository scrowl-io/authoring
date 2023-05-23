import { GenericEvent, ELEM_ALIGNMENT } from './utils.types';

const getAlignment = (alignment: ELEM_ALIGNMENT = 'center-center') => {
  const [alignmentX, alignmentY] = alignment.split('-');

  return [alignmentX, alignmentY];
};

export const getPosition = (
  elem: any,
  options?: {
    alignment?: ELEM_ALIGNMENT,
    offset?: [number, number],
  }
): [number, number] | undefined => {
  if (!elem) {
    return;
  }

  const [alignmentX, alignmentY] = getAlignment(options?.alignment);
  const elemBounds = elem.getBoundingClientRect();

  let x: number;
  let y: number;

  switch (alignmentX) {
    case "left":
      x = elemBounds.left;
      break;
    case "right":
      x = elemBounds.right;
      break;
    default: // center
      x = (elemBounds.left + elemBounds.right) / 2;
      break;
  }

  switch (alignmentY) {
    case "top":
      y = elemBounds.top;
      break;
    case "bottom":
      y = elemBounds.bottom;
      break;
    default: // center
      y = (elemBounds.top + elemBounds.bottom) / 2;
      break;
  }

  if (x === undefined || y === undefined) {
    return;
  }

  if (!options || !options.offset) {
    return [Math.round(x), Math.round(y)];
  }
  
  const [offsetX, offsetY] = options.offset;

  return [Math.round(x += offsetX), Math.round(y += offsetY)];  
};

export const stopEvent = (ev: GenericEvent) => {
  if (!ev.stopPropagation && !ev.preventDefault) {
    return;
  }

  ev.stopPropagation();
  ev.preventDefault();
};

export default {
  getPosition,
  stopEvent,
};
