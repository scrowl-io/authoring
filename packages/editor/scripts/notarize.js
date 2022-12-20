const { notarize } = require("electron-notarize");
const dotenv = require("dotenv");

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  const log = process.stderr.write;

  log(`process.env: ${JSON.stringify(process.env, null, 2)}`);
  log(`process.env link: ${process.env.CSC_LINK}`);

  if (electronPlatformName !== "darwin") {
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    dotenv.config();
  }

  if (!process.env.APPLEID || !process.env.APPLEIDPASS) {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: "io.scrowl.app",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  });
};