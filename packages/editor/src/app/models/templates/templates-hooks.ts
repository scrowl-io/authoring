import { API } from './';
import { rq } from '../../services';

export const load = (template) => {
  return new Promise<rq.ApiResult>((resolve) => {
    API.load(template).then(resolve);
  });
};

export const get = () => {
  return new Promise<rq.ApiResult>((resolve) => {
    API.get().then(resolve);
  });
};

export default {
  load,
  get,
};