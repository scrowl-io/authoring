import React from "react";

export type GenericEvent =
  | Event
  | React.ChangeEvent
  | React.DragEvent
  | React.FormEvent
  | React.FocusEvent
  | React.KeyboardEvent
  | React.MouseEvent
  | React.TouchEvent
  | React.WheelEvent
  | React.PointerEvent;