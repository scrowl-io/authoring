import { player } from '../src';
import { RUNTIME_SERVICE } from '../../runtime/src/runtime.types';

declare global {
  interface Window {
    Scrowl: {
      runtime?: RUNTIME_SERVICE;
      player: typeof player;
    };
  };
};
