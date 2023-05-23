import { IpcRenderer } from 'electron';
import { JSON_DATA } from '../src/main/utils/json/json.types';

declare global {
  interface Window {
    scrowlProxy: {
      invoke: (channel: string, params: JSON_DATA | undefined, type?: 'GET' | 'POST' ) => Promise<any>;
      on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => void;
      send: (channel: string, ...args: any[]) => void;
      removeListener: (channel: string, listener: (...args: any[]) => void) => void;
      removeListenerAll: (channel: string) => void;
    };
    Scrowl: {
      config: {
        desktop: boolean;
      };
    };
  }
}
