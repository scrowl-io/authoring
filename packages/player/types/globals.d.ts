import { player } from '../src';
import { RUNTIME_SERVICE } from '../../runtime/src/runtime.types';
import { core } from '@scrowl/template-core';

declare global {
  interface Window {
    Scrowl: {
      runtime?: RUNTIME_SERVICE;
      player: typeof player;
      core: typeof core;
    };
  };
};
