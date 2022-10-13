import {
  app,
  BrowserWindow,
  shell,
  BrowserWindowConstructorOptions,
} from 'electron';
import { getAppPath, getAssetPath } from './locate';
import { Models } from '../models';

export const init = () => {
  const appPath = getAppPath('app.html');
  const preloadPath = getAppPath('preload.js');
  const iconPath = getAssetPath('icon.png');
  const isDARWIN = process.platform === 'darwin';
  const isDevEnv = process.env.NODE_ENV === 'development';
  let mainWindow: BrowserWindow | null = null;
  let isQuitting = false;

  const create = () => {
    try {
      const config: BrowserWindowConstructorOptions = {
        show: false,
        width: 1440,
        minWidth: 1024,
        height: 728,
        icon: iconPath,
        webPreferences: {
          preload: preloadPath,
        },
      };

      mainWindow = new BrowserWindow(config);

      if (!mainWindow) {
        throw 'Unable to create App window';
      }

      Models.init();
      mainWindow.loadURL(appPath);

      mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
          throw new Error('"mainWindow" is not defined');
        }

        if (process.env.START_MINIMIZED) {
          mainWindow.minimize();
        } else {
          mainWindow.show();
        }

        if (isDevEnv) {
          mainWindow.webContents.openDevTools({
            mode: 'detach',
            activate: true
          });
        }
      });

      mainWindow.on('close', (ev: Electron.Event) => {
        try {
          if (isDARWIN) {
            if (isQuitting) {
              mainWindow = null;
            } else {
              ev.preventDefault();
              mainWindow?.hide();
            }
          }
        } catch (err) {
          console.error('window failed to closed', err);
        }
      });

      mainWindow.on('closed', () => {
        mainWindow = null;
      });

      app.on('activate', () => {
        if (isDARWIN && mainWindow !== null) {
          mainWindow.show();
        }
      });

      mainWindow.webContents.setWindowOpenHandler(edata => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
      });
    } catch (e) {
      console.error('Failed to start app', e);
    }
  }

  if (isDARWIN) {
    app.dock.setIcon(iconPath);
  }

  app.on('before-quit', () => {
    isQuitting = true;
  });
  
  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    try {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    } catch (err) {
      console.error('app failed to quit', err);
    }
  });

  app
    .whenReady()
    .then(() => {
      create();

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) create();
      });
    })
    .catch(console.log);
};

export default {
  init,
};
