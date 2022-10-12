import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './root';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

root.render(<Root />);
