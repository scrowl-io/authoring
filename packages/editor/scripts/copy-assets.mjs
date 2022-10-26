import fs from './utils/file-system.mjs';

const config = {
  'node_modules/@scrowl/runtime/dist': {
    dest: './src/main/assets/project',
    includePaths: ['../../'],
  },
  'node_modules/@scrowl/template-core/dist': {
    dest: './src/main/assets/project',
    includePaths: ['../../'],
  },
  'node_modules/@scrowl/template-block-text/dist': {
    dest: './src/main/assets/templates/block-text',
    includePaths: ['../../'],
    options: {
      overwrite: true,
    },
  },
};

const findPath = (source, includePaths) => {
  // this function attempts to find the source file at the project location and any declared location in includesPaths (if any exists)
  if (!includePaths) {
    return source;
  }

  if (!Array.isArray(includePaths)) {
    throw new Error(`Paths to check must be an array: ${includePaths}`);
  }

  let checkPath, filePath;
  let pathChecks = includePaths.length ? ['./'].concat(includePaths) : ['./'];

  for (let i = 0, ii = pathChecks.length; i < ii; i++) {
    checkPath = `${pathChecks[i]}${source}`;

    if (fs.pathExistsSync(checkPath)) {
      filePath = checkPath;
      break;
    }
  }

  return filePath;
};

const copyDir = (source, options) => {
  fs.copySync(source, options.dest, options.options);
};

const copyFile = (source, options) => {
  let contents = fs.getFile(source);

  if (!contents) {
    return;
  }

  if (options.transformer) {
    // apply a transformation if there is one
    contents = options.transformer(contents);
  }

  fs.setFile(options.dest, contents); // write the file to the target destination
};

const copy = () => {
  let pathname;

  for (let source in config) {
    pathname = findPath(source, config[source].includePaths);

    if (!pathname) {
      continue;
    }

    if (fs.isDirectory(pathname)) {
      copyDir(pathname, config[source]);
    } else {
      copyFile(pathname, config[source]);
    }
  }
};

copy();