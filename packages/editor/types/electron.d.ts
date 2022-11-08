import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    scrowlAPI: {
      actions: {
        invoke: (channel: string, ...args: any[]) => Promise<any>;
        on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => void;
        send: (channel: string, ...args: any[]) => void;
        removeListener: (channel: string, listener: (...args: any[]) => void) => void;
        removeListenerAll: (channel: string) => void;
      };
    };
  }
}
