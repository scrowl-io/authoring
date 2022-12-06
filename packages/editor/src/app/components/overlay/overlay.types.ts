import React from "react";

export type DrawerUnit = number | string;

export interface DrawerCommons {
  isAnimated: boolean;
  isOpen: boolean;
  slideFrom?: 'left' | 'right';
  onClose: () => void;
};

export type DrawerProps = DrawerCommons & React.HTMLAttributes<HTMLDivElement>;

export type DrawerStyles = {
  left?: DrawerUnit;
  right?: DrawerUnit;
  maxWidth: number;
  width: number;
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
    transform?: string;
  };
  animate: {
    left?: DrawerUnit;
    right?: DrawerUnit;
    transform?: string;
  };
  exit: {
    left?: DrawerUnit;
    right?: DrawerUnit;
    transform?: string;
    transition: DrawerTransition;
  };
  transition: DrawerTransition;
};

export interface BackdropCommons {
  isAnimated: boolean;
}

export type BackdropProps = BackdropCommons & React.AllHTMLAttributes<HTMLDivElement>;

export interface ModalProps extends React.AllHTMLAttributes<HTMLDivElement> {
  isOpen: boolean,
  title?: string,
  onClose: () => void;
  modalSize?: 'sm' | 'md' | 'lg';
}
