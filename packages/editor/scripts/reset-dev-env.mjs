import fs from 'fs-extra';
import path from 'path';

const configPath = path.normalize('./scripts/dev.env.json');
let config = {};

if (fs.pathExistsSync(configPath)) {
  const file = fs.readFileSync(configPath, 'utf8');

  config = JSON.parse(file);
}

config.startCount = 0;
fs.outputFileSync(configPath, JSON.stringify(config, null, 2));
