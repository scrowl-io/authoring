import {
  app,
  BrowserWindow,
  shell,
  BrowserWindowConstructorOptions,
} from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { Models } from '../models';
import { Services, fs } from '../services';
import { log } from '../services';

export const init = () => {
  log.info('application starting');
  const appPath = fs.getAppPath('app.html');
  log.info(`RESOURCE_PATH: ${appPath}`);
  const preloadPath = fs.getDistPath('preload.js');
  log.info(`RESOURCE_PATH: ${preloadPath}`);
  const iconPath = fs.getAssetPath('icon.png');
  log.info(`RESOURCE_PATH: ${iconPath}`);
  const isDARWIN = process.platform === 'darwin';
  const isDevEnv = process.env.NODE_ENV === 'development';
  let mainWindow: BrowserWindow | null = null;
  let isQuitting = false;

  const installExtensions = () => {
    return Promise.all([
      installExtension(REACT_DEVELOPER_TOOLS),
    ]);
  };

  const create = async () => {
    try {
      const config: BrowserWindowConstructorOptions = {
        show: false,
        width: 1440,
        minWidth: 1024,
        height: 728,
        icon: iconPath,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          preload: preloadPath,
        },
      };

      if (isDevEnv) {
        const installResult = await installExtensions();

        console.log(`\n\nAdded Extensions: ${installResult}\n\n`);
      }

      mainWindow = new BrowserWindow(config);
      
      if (!mainWindow) {
        log.error(`Failed to launch application window`);
        throw 'Unable to create App window';
      }

      mainWindow.loadURL(appPath);
      log.info(`application attached to window`);

      mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
          log.error(`Failed to show application window`);
          throw new Error('"mainWindow" is not defined');
        }

        if (process.env.START_MINIMIZED) {
          log.info(`starting minimized`);
          mainWindow.minimize();
        } else {
          log.info(`starting`);
          mainWindow.show();
        }

        if (isDevEnv) {
          mainWindow.webContents.openDevTools({
            mode: 'detach',
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
      log.info('application ready');
      Models.init();
      log.info('models initialized');
      Services.init();
      log.info('services initialized');
      create();
      log.info('application initialized');

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) create();
      });
    })
    .catch(log.error);
};

export default {
  init,
};
