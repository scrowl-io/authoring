import React from 'react';
import { Accordion } from '../../../../../../components';
import { Projects } from '../../../../../../models';
import * as css from '../../_overlay.scss';

export const Overview = () => {
  const modules = Projects.useModules().length;
  const lessons = Projects.useLessons().length;
  const slides = Projects.useSlides().length;

  return (
    <Accordion title="Overview" disableCollapse={true} show={true}>
      <dl className={css.publishCourseOverview}>
        <div className={css.publishCourseOverviewItem}>
          <dt>{modules === 1 ? 'Module' : 'Modules'}</dt>
          <dd>{modules}</dd>
        </div>
        <div className={css.publishCourseOverviewItem}>
          <dt>{lessons === 1 ? 'Lesson' : 'Lessons'}</dt>
          <dd>{lessons}</dd>
        </div>
        <div className={css.publishCourseOverviewItem}>
          <dt>{slides === 1 ? 'Slide' : 'Slides'}</dt>
          <dd>{slides}</dd>
        </div>
      </dl>
    </Accordion>
  );
};

export default {
  Overview,
};
