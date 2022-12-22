import express from 'express';
import {
  RegisterEndpoint as MainRegisterEndpoint,
} from '../../../main/services/requester/requester.types';

export type {
  ApiResult,
  RegisterEndpointType,
} from '../../../main/services/requester/requester.types';

export interface RegisterEndpoint extends Omit<MainRegisterEndpoint, 'fn'> {
  fn?: express.Handler;
};

export interface RegisterEndpoints {
  [key: string]: RegisterEndpoint;
}
