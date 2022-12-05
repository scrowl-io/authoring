import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import a11yEmoji from '@fec/remark-a11y-emoji';
import { Link, Input } from './components';

export const Markdown = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        a: Link,
        input: Input,
      }}
      children={children}
      remarkPlugins={[remarkGfm, a11yEmoji]}
    />
  );
};

export default {
  Markdown,
};
