import React from 'react';

export const NavResource = ({ resource }) => {
  return (
    <div>
      <p>{resource.filename}</p>
      <p>{resource.description}</p>
    </div>
  );
};

export default {
  NavResource,
};
