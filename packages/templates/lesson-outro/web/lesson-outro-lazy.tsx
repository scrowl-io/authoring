import React, { Suspense, lazy } from 'react';

const LessonOutroLazy = lazy(
  () =>
    import(
      /* webpackChunkName: "template-lesson-outro" */ '../src/lesson-outro'
    )
);

const LessonOutro = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LessonOutroLazy {...props} />
    </Suspense>
  );
};

export default LessonOutro;
