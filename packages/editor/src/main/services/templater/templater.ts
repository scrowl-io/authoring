import engine from 'handlebars';
import { ApiResult, JsonResult } from '../requester';

engine.registerHelper('raw', options => {
  return options.fn();
});

export const compile = (
  contents: string,
  data: JsonResult
): ApiResult => {
  try {
    return {
      error: false,
      data: {
        contents: engine.compile(contents)(data),
      },
    };
  } catch (e) {
    return {
      error: true,
      message: 'Failed to compile',
      data: {
        trace: e,
      },
    };
  }
};

export default {
  compile,
};
