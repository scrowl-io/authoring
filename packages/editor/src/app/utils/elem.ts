import { GenericEvent } from './utils.types';

export enum ELEM_ALIGNMENT {
  LeftTop = "left-top",
  LeftCenter = "left-center",
  LeftBottom = "left-bottom",

  CenterTop = "center-top",
  CenterCenter = "center-center",
  CenterBottom = "center-bottom",

  RightTop = "right-top",
  RightCenter = "right-center",
  RightBottom = "right-bottom",
}

export const getPosition = (
  elem: any,
  alignment?: ELEM_ALIGNMENT,
  offset?: [number, number],
): [number, number] | undefined => {
  if (!elem) {
    return;
  }

  if (!alignment || !alignment.includes("-")) {
    alignment = ELEM_ALIGNMENT.CenterCenter;
  }

  let alignmentParts: any = alignment.split("-");
  if (alignmentParts.length !== 2) {
    alignmentParts = ELEM_ALIGNMENT.CenterCenter.split("-");
  }

  const elemBounds = elem.getBoundingClientRect();
  let x: number;
  let y: number;

  // x
  switch (alignmentParts[0]) {
    case "left":
      x = elemBounds.left;
      break;
    case "right":
      x = elemBounds.right;
      break;
    default: // center
    x = (elemBounds.left + elemBounds.right) / 2;
  }

  // y
  switch (alignmentParts[1]) {
    case "top":
      y = elemBounds.top;
      break;
    case "bottom":
      y = elemBounds.bottom;
      break;
    default: // center
    y = (elemBounds.top + elemBounds.bottom) / 2;
  }

  if (x === undefined || y === undefined) {
    return;
  }

  if (offset) {
    const [offsetX, offsetY] = offset;

    return [Math.round(x += offsetX), Math.round(y += offsetY)];  
  }
  
  return [Math.round(x), Math.round(y)];
};

export const stopEvent = (ev: GenericEvent) => {
  ev.stopPropagation();
  ev.preventDefault();
};

export default {
  ELEM_ALIGNMENT,
  getPosition,
  stopEvent,
};
