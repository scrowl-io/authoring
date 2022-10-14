import React from "react";

export type DrawerUnit = number | string;

export interface DrawerCommons {
  isAnimated: boolean;
  isOpen: boolean;
  slideFrom?: 'left' | 'right';
};

export type DrawerProps = DrawerCommons & React.HTMLAttributes<HTMLDivElement>;

export type DrawerStyles = {
  left?: DrawerUnit;
  right?: DrawerUnit;
};

export interface DrawerTransition {
  left?: {
    duration: DrawerUnit;
  };
  right?: {
    duration: DrawerUnit;
  }
};

export type DrawerOpts = {
  initial: {
    left?: DrawerUnit;
    right?: DrawerUnit;
  };
  animate: {
    left?: DrawerUnit;
    right?: DrawerUnit;
  };
  exit: {
    left?: DrawerUnit;
    right?: DrawerUnit;
    transition: DrawerTransition;
  };
  transition: DrawerTransition;
};
