import * as bpDefault from './blueprint-default';
import * as bpBeginner from './blueprint-beginner';

export const get = (blueprint?: string) => {
  switch (blueprint) {
    case 'beginner':
      return bpBeginner.make();
    case 'default':
    default:
      return bpDefault.make();
  }
};

export default {
  get,
};
