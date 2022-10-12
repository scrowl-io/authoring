import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    scrowlAPI: {
      actions: IpcRenderer;
    };
  }
}
