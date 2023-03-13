import React, { Suspense, lazy } from 'react';

const LessonIntroLazy = lazy(
  () =>
    import(
      /* webpackChunkName: "template-lesson-intro" */ '../src/lesson-intro'
    )
);

const LessonIntro = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LessonIntroLazy {...props} />
    </Suspense>
  );
};

export default LessonIntro;
