import { Listener } from './requester.types';

export const invoke = (endpoint: string, ...args: unknown[]) => {
  return window.scrowlAPI.actions.invoke(endpoint, ...args);
};

export const on = (endpoint: string, listener: Listener) => {
  window.scrowlAPI.actions.on(endpoint, listener);
};

export const send = (endpoint: string, ...args: unknown[]) => {
  window.scrowlAPI.actions.send(endpoint, ...args);
};

export const off = (endpoint: string, listener: Listener) => {
  window.scrowlAPI.actions.removeListener(endpoint, listener);
};

export const offAll = (endpoint: string) => {
  window.scrowlAPI.actions.removeListenerAll(endpoint);
};