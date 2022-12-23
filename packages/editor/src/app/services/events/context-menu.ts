import { ContextMenuItem, ContextMenuPayload } from '../menu';

export const EVENTS = {
  open: 'openContextMenu',
  close: 'closeContextMenu',
};

export const onClose = (listener) => {
  document.addEventListener(EVENTS.close, listener);
};

export const offClose = (listener) => {
  document.removeEventListener(EVENTS.close, listener);
};

export const close = (ev: { canceled: boolean, item?: ContextMenuItem }) => {
  const event = new CustomEvent(EVENTS.close, { detail: ev });

  document.dispatchEvent(event);
};

export const onOpen = (listener) => {
  document.addEventListener(EVENTS.open, listener);
};

export const offOpen = (listener) => {
  document.removeEventListener(EVENTS.open, listener);
};

export const open = (target: HTMLElement, config: ContextMenuPayload) => {
  const event = new CustomEvent(EVENTS.open, { detail: { target, config } });

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