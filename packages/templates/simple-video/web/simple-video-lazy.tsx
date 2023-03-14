import React, { Suspense, lazy } from 'react';

const SimpleVideoLazy = lazy(
  () =>
    import(
      /* webpackChunkName: "template-simple-video" */ '../src/simple-video'
    )
);

const SimpleVideo = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SimpleVideoLazy {...props} />
    </Suspense>
  );
};

export default SimpleVideo;
