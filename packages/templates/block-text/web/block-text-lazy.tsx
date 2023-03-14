import React, { Suspense, lazy } from 'react';

const BlockTextLazy = lazy(
  () =>
    import(/* webpackChunkName: "template-block-text" */ '../src/block-text')
);

const BlockText = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlockTextLazy {...props} />
    </Suspense>
  );
};

export default BlockText;
