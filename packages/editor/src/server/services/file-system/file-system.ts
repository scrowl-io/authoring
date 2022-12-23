import path from 'path';

const basePath = process.env.PWD;

export const rootPath = path.join(basePath || '', 'src', 'server');

export default {
  rootPath,
};
