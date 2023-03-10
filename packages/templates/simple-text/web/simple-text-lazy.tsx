import React, { Suspense, lazy } from 'react';

const SimpleTextLazy = lazy(() => import('../src/simple-text'));

const SimpleText = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SimpleTextLazy {...props} />
    </Suspense>
  );
};

export default SimpleText;
