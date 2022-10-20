import chalk from 'chalk';
import { prettyJson } from './strings.mjs';
import { hasProp } from './objects.mjs';

const COLORS = {
  black: 'black',
  red: 'red',
  green: 'green',
  yellow: 'yellow',
  blue: 'blue',
  purple: 'magenta',
  cyan: 'cyan',
  white: 'white',
  grey: 'grey',
  redBright: 'redBright',
  greenBright: 'greenBright',
  yellowBright: 'yellowBright',
  blueBright: 'blueBright',
  purpleBright: 'magentaBright',
  cyanBright: 'cyanBright',
  whiteBright: 'whiteBright',
};

const HIGHLIGHTS = {
  black: 'bgBlack',
  red: 'bgRed',
  green: 'bgGreen',
  yellow: 'bgYellow',
  blue: 'bgBlue',
  purple: 'bgMagenta',
  cyan: 'bgCyan',
  white: 'bgWhite',
  grey: 'bgGrey',
  redBright: 'bgRedBright',
  greenBright: 'bgGreenBright',
  yellowBright: 'bgYellowBright',
  blueBright: 'bgBlueBright',
  purpleBright: 'bgMagentaBright',
  cyanBright: 'bgCyanBright',
  whiteBright: 'bgWhiteBright',
};

const theme = {
  info: COLORS.white,
  warn: COLORS.yellow,
  debug: COLORS.purpleBright,
  log: COLORS.grey,
  error: COLORS.redBright,
  success: COLORS.green,
  failure: COLORS.red,
};

const print = (msg, color, noPrint) => {
  noPrint = noPrint !== undefined || noPrint !== null ? noPrint : false;

  let printable;

  if (msg instanceof Error) {
    printable = `${chalk[theme.error](msg.message)}\n${chalk[theme.error](
      msg.stack
    )}`;
  } else if (msg instanceof Object) {
    printable = `${chalk[color](prettyJson(msg))}`;
  } else {
    printable = chalk[color](msg);
  }

  if (!noPrint) {
    console.log(printable);
  }

  return printable;
};

const style = (msg, color, palette, noPrint) => {
  if (msg === undefined || msg === null) {
    console.log(chalk[theme.error]('Message must be defined'));
    return;
  }

  if (color === undefined || color === null) {
    console.log(chalk[theme.error]('Color must be defined'));
    return;
  }

  if (!hasProp(palette, color)) {
    console.log(
      chalk[theme.error](
        `Color not supported, must be one of these: ${Object.keys(palette).join(
          ', '
        )}`
      )
    );
    return;
  }

  return print(msg, palette[color], noPrint);
};

export const clear = () => {
  process.stdout.write('\x1b[2J');
};

export const color = (msg, color, noPrint) => {
  return style(msg, color, COLORS, noPrint);
};

export const highlight = (msg, color, noPrint) => {
  style(msg, color, HIGHLIGHTS, noPrint);
};

export const log = (msg, type) => {
  type = type || 'log';

  if (msg === undefined || msg === null) {
    console.log(chalk[theme.error]('Log message must be defined'));
    return;
  }

  if (!hasProp(theme, type)) {
    console.log(chalk[theme.warn](`Log type not supported: ${type}`));
  }

  print(msg, theme[type]);
};

export default {
  clear,
  color,
  highlight,
  log,
};
