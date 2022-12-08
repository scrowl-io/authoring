import { CORE_PROPS } from '../src';

declare global {
  interface Window {
    Scrowl: {
      core: CORE_PROPS;
    }
  }
}
