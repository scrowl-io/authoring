import * as bpDefault from './blueprint-default';
import * as bpBeginner from './blueprint-beginner';
import * as bpAssessment from './blueprint-assessment';

export const get = (blueprint?: string) => {
  switch (blueprint) {
    case 'beginner':
      return bpBeginner.make();
    case 'assessment':
      return bpAssessment.make();
    case 'default':
    default:
      return bpDefault.make();
  }
};

export default {
  get,
};
