import * as components from './components';
import { Root } from './root';

export * from './components/components.types';
export * from './root/root.types';

export const player = {
  ...components,
  Root,
};

export default {
  player,
};
