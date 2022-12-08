import { player } from '../src';
import { RUNTIME_SERVICE } from '../../runtime/src/runtime.types';
import { CORE_PROPS } from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';

declare global {
  interface Window {
    Scrowl: {
      runtime?: RUNTIME_SERVICE;
      player: typeof player;
      core: CORE_PROPS;
      ui: UI_PROPS;
    };
  };
};
