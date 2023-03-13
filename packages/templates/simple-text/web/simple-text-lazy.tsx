import React, { Suspense, lazy } from 'react';

const SimpleTextLazy = lazy(
  () =>
    import(/* webpackChunkName: "template-simple-text" */ '../src/simple-text')
);

const SimpleText = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SimpleTextLazy {...props} />
    </Suspense>
  );
};

export default SimpleText;
