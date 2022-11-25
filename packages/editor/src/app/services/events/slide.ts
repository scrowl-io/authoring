export const EVENTS = {
  focus: 'slideFocus',
};

export const onFocus = (listener) => {
  document.addEventListener(EVENTS.focus, listener);
};

export const offFocus = (listener) => {
  document.removeEventListener(EVENTS.focus, listener);
};

export const focus = (id: number) => {
  const event = new CustomEvent(EVENTS.focus, { detail: id });

  document.dispatchEvent(event);
};

export default {
  EVENTS,
  onFocus,
  offFocus,
  focus,
};
