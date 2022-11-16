import {
  app,
  BrowserWindow,
  shell,
  session,
  BrowserWindowConstructorOptions,
} from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { Models } from '../models';
import { Services, fs, rq, log } from '../services';
import { API } from './';

export const init = () => {
  log.info('application starting');
  const appPath = fs.getAppPath('app.html');
  const preloadPath = fs.getDistPath('preload.js');
  const iconPath = fs.getAssetPath('icon.png');
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

      mainWindow.on('close', (closeEv) => {
        try {
          const closeWindow = () => {
            if (isDARWIN) {
              if (isQuitting) {
                mainWindow = null;
                app.exit();
              } else {
                closeEv.preventDefault();
                mainWindow?.hide();
              }
            } else {
              app.exit();
            }
          }

          const promptUnsavedChanges = (promptEv) => {
            fs.dialog.message(promptEv, {
              type: 'question',
              title: 'Confirm',
              message: 'You have unsaved changes.\nAre you sure you want to quit?',
              buttons: ['Yes', 'No']
            }).then((closeRes) => {
              if (closeRes.error) {
                log.error(closeRes);
                closeWindow();
              } else {
                const res = closeRes.data.response;
  
                switch (res) {
                  case 0:
                    closeWindow();
                    break;
                  case 1:
                    closeEv.preventDefault();
                    break;
                }
              }
            });
          }
          
          API.onUnsaved((unsavedEv, { isDirty, isUncommitted }) => {
            API.offUnsaved();

            if (isDirty || isUncommitted) {
              promptUnsavedChanges(unsavedEv);
            } else {
              closeWindow();
            }
          });

          API.unsaved();
          closeEv.preventDefault();
        } catch (err) {
          console.error('window failed to closed', err);
        }
      });

      mainWindow.on('closed', (ev: Electron.Event) => {
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
      session.defaultSession.cookies.flushStore();

      if (process.platform !== 'darwin') {
        app.quit();
      }
    } catch (err) {
      console.error('app failed to quit', err);
    }
  });

  app.on('will-quit', () => {
    if (rq.templateServer) {
      rq.templateServer.close();
    }
  });

  app.once('quit',  () => {
    session.defaultSession.cookies.flushStore();
  });

  app
    .whenReady()
    .then(() => {
      session.defaultSession.cookies.flushStore();
      API.init();
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
