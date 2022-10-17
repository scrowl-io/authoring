import { Service } from './service.types';
import * as fs from './file-system';
import * as rq from './requester';
import * as mu from './menu';

export const init = () => {
  const services = [fs, rq, mu];

  services.forEach((service: Service) => {
    if (service.init) {
      service.init();
    }
  })
};

export default {
  init,
};
