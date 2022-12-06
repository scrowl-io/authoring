import {
  app,
  BrowserWindow,
  shell,
  BrowserWindowConstructorOptions,
} from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { Models, Projects } from '../models';
import { Services, fs, rq, log } from '../services';
import { API } from './';

export const init = () => {
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

        log.info(`\n\nAdded Extensions: ${installResult}\n\n`);
      }

      mainWindow = new BrowserWindow(config);
      
      if (!mainWindow) {
        log.error(`Failed to launch application window`);
        throw 'Unable to create App window';
      }

      mainWindow.loadURL(appPath);
      log.info(`window loaded`);

      mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
          log.error(`Failed to show application window`);
          throw new Error('"mainWindow" is not defined');
        }

        if (process.env.START_MINIMIZED) {
          log.info(`window ready: minimized`);
          mainWindow.minimize();
        } else {
          log.info(`window ready`);
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

          const promptUnsavedChanges = (promptEv, project) => {
            fs.dialog.message(promptEv, {
              type: 'question',
              title: 'Confirm',
              message: 'Close Project Without Saving?',
              detail: 'Your changes are not saved.',
              buttons: ['Save Project', 'Discard Changes', 'Cancel']
            }).then((closeRes) => {
              if (closeRes.error) {
                log.error(closeRes);
                closeWindow();
              } else {
                const res = closeRes.data.response;

                switch (res) {
                  case 0:
                    closeEv.preventDefault();
                    Projects.save(promptEv, project).then((saveRes) => {
                      if (saveRes.error) {
                        log.error(saveRes);
                      }

                      closeWindow();
                    });
                    break;
                  case 1:
                    closeWindow();
                    break;
                  case 2:
                    closeEv.preventDefault();
                    break;
                }
              }
            });
          }
          
          API.onUnsaved((unsavedEv, { status, project }) => {
            API.offUnsaved();
            const { isDirty, isUncommitted } = status;

            if (isDirty || isUncommitted) {
              promptUnsavedChanges(unsavedEv, project);
            } else {
              closeWindow();
            }
          });

          API.unsaved();
          closeEv.preventDefault();
        } catch (err) {
          log.error('window failed to closed', err);
        }
      });

      mainWindow.on('closed', (ev: Electron.Event) => {
        log.info('window event: closed');
        mainWindow = null;
      });

      app.on('activate', () => {
        log.info('window activated');
        if (isDARWIN && mainWindow !== null) {
          mainWindow.show();
        }
      });

      mainWindow.webContents.setWindowOpenHandler(edata => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
      });
    } catch (e) {
      log.error('Failed to start app', e);
    }
  }

  if (isDARWIN) {
    log.info('setting application icon');
    app.dock.setIcon(iconPath);
  }

  app.on('before-quit', () => {
    log.info('application event: before quit');
    isQuitting = true;
  });
  
  app.on('window-all-closed', () => {
    log.info('application event: all closed');
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    try {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    } catch (err) {
      log.error('app failed to quit', err);
    }
  });

  app.on('will-quit', () => {
    log.info('application event: will quit');
    if (rq.templateServer) {
      rq.templateServer.close();
    }
  });

  app
    .whenReady()
    .then(() => {
      log.info('application event: ready');
      log.info('initializing: window apis');
      API.init();
      log.info('window apis initialized');
      log.info('initializing: models');
      Models.init();
      log.info('models initialized');
      log.info('initializing: services');
      Services.init();
      log.info('services initialized');
      log.info('creating window');
      create();
      log.info('window created');

      app.on('activate', () => {
        log.info('application event: activate');
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
