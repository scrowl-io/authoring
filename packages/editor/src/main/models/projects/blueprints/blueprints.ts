import * as bpDefault from './blueprint-default';

export const get = (blueprint?: string) => {
  switch (blueprint) {
    case 'default':
    default:
      return bpDefault.make();
  }
};

export default {
  get,
};
