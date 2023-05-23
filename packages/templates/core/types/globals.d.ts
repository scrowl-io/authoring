import { CORE_PROPS } from '../src';
import { RUNTIME_SERVICE } from '../../../runtime/src/runtime.types';

declare global {
  interface Window {
    Scrowl: {
      core: CORE_PROPS;
      runtime?: RUNTIME_SERVICE;
    };
  }
}
