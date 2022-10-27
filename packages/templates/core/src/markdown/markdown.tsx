import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import a11yEmoji from '@fec/remark-a11y-emoji';

export const Markdown = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => (
          <a
            onClick={(e) => {
              e.preventDefault();
            }}
            {...props}
            target="_blank"
          />
        ),

        input: ({ node, ...props }) => (
          <input
            {...props}
            disabled={false}
            style={{
              pointerEvents: 'none',
              scale: '1.8',
              margin: '5px 12px 5px 7px',
            }}
          />
        ),
      }}
      children={children}
      remarkPlugins={[remarkGfm, a11yEmoji]}
    />
  );
};

export default {
  Markdown,
};
