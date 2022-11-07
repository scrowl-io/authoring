import { TemplatesEndpoints } from './templates.types';
import { rq } from '../../services';

const ENDPOINTS: TemplatesEndpoints = {
  load: '/templates/load',
  get: '/templates/get',
};

export const load = (template) => {
  return rq.invoke(ENDPOINTS.load, template);
};

export const get = () => {
  return rq.invoke(ENDPOINTS.get);
}

export default {
  load,
};
