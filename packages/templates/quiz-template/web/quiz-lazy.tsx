import React, { Suspense, lazy } from 'react';

const QuizLazy = lazy(
  () => import(/* webpackChunkName: "template-quiz" */ '../src/quiz')
);

const Quiz = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizLazy {...props} />
    </Suspense>
  );
};

export default Quiz;
