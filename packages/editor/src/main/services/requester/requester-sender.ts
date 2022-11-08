import { BrowserWindow } from 'electron';

export function send(name: string, ...args: unknown[]) {
  const window = BrowserWindow.getAllWindows()[0];

  if (window !== undefined) {
    window.webContents.send(name, ...args);
  }
}

export default {
  send,
};
