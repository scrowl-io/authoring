import React from 'react';
import * as css from './_root.scss';
import { PlayerRootProps } from './root.types';

export const Root = ({ project, templateList, ...props }: PlayerRootProps) => {
  const runtime = window.Scrowl.runtime;

  if (runtime) {
    const startRes = runtime.start();

    if (startRes.error) {
      console.error(`unable to start runtime: ${startRes.message}`);
    }
  }

  console.log('');
  console.log('project', project);
  console.log('templateList', templateList);

  return (
    <div className={css.player} {...props}>
      <main className={css.playerMain}>Hello World</main>
    </div>
  );
};
