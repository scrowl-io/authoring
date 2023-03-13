import React, { Suspense, lazy } from 'react';

const TwoColumnLazy = lazy(
  () =>
    import(/* webpackChunkName: "template-two-column" */ '../src/two-column')
);

const TwoColumn = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TwoColumnLazy {...props} />
    </Suspense>
  );
};

export default TwoColumn;
