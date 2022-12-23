import express from 'express';
import { rq } from '../../services';
import { EndpointsApi } from './endpoints.types';

export const get: express.Handler = (req, res) => {
  res.send({
    error: false,
    data: {
      endpoints: rq.register.ENDPOINTS,
    },
  });
};

export const API: EndpointsApi = {
  get: {
    name: '/endpoints',
    type: 'invoke',
    fn: get,
  },
};

export default {
  API,
};