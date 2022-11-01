import { TemplatesEndpoints } from './templates.types';
import { rq } from '../../services';

const ENDPOINTS: TemplatesEndpoints = {
  load: '/templates/load',
};

export const load = (template) => {
  return rq.invoke(ENDPOINTS.load, template);
};

export default {
  load,
};
