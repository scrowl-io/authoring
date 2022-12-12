export const EVENTS = {
  close: 'closeProject',
  open: 'openProject',
};

export const onClose = (listener) => {
  document.addEventListener(EVENTS.close, listener);
};

export const offClose = (listener) => {
  document.removeEventListener(EVENTS.close, listener);
};

export const close = () => {
  const event = new CustomEvent(EVENTS.close);

  document.dispatchEvent(event);
};

export const onOpen = (listener) => {
  document.addEventListener(EVENTS.open, listener);
};

export const offOpen = (listener) => {
  document.removeEventListener(EVENTS.open, listener);
};

export const open = () => {
  const event = new CustomEvent(EVENTS.open);

  document.dispatchEvent(event);
};

export default {
  EVENTS,
  onClose,
  offClose,
  close,
  onOpen,
  offOpen,
  open
};
