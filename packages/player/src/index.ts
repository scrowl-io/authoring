import * as components from './components';
import { Root } from './root';

import { Integrations } from '@sentry/tracing';
import { init } from '@sentry/browser';

export * from './components/components.types';
export * from './root/root.types';

init({
  dsn: 'https://70d6376fbc6a466f95f3737f1488ad6b@o4504571869855744.ingest.sentry.io/4504571875098624',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

export const player = {
  ...components,
  Root,
};

export default {
  player,
};
