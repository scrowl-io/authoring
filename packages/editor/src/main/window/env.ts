import { fs } from '../services';

export const updateDev = () => {
  const isDevEnv = process.env.NODE_ENV === 'development';

  if (!isDevEnv) {
    return;
  }

  const configPath = fs.joinPath(__dirname, '../../../', 'scripts', 'dev.env.json');
  const configRes = fs.fileReadSync(configPath);

  if (configRes.error) {
    console.error(configRes);
    return;
  }

  const config = configRes.data.contents;

  config.startCount++;
  process.env.startCount = config.startCount.toString();
  fs.fileWriteSync(configPath, config);
};

export default {
  updateDev,
};