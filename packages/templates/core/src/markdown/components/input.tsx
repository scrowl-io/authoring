import React from 'react';

export const Input = ({ node, ...props }) => {
  const styles = {
    scale: 1.8,
    margin: '5px 12px 5px 7px',
  };

  return <input disabled={false} style={styles} {...props} />;
};

export default {
  Input,
};
