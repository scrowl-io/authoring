import React from 'react';

export const Link = ({ node, ...props }) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
      }}
      {...props}
      target="_blank"
    />
  );
};

export default {
  Link,
};
