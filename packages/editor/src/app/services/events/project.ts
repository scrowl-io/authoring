export const EVENTS = {
  close: 'closeProject',
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

export default {
  EVENTS,
  onClose,
  offClose,
  close,
};
