import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageDefinition, PageProps } from './pages.types';
import {
  PlayerRootConfig,
  PlayerTemplateList,
  TemplateComponent,
} from '../../root/root.types';
import * as css from '../../root/_root.scss';
import { Error } from '../../components';
import { NavBar } from '../../components/navbar';

const Page = ({ slides, templates, ...props }: PageProps) => {
  let controller;

  if (window['Scrowl'] && window['Scrowl'].core) {
    controller = useRef(new window['Scrowl'].core.scroll.Controller());
  }

  const player = document.querySelector('.player-main');

  useEffect(() => {
    player?.scrollTo({ top: 0 });
  }, [slides]);

  return (
    <div>
      {slides.map((slide, idx) => {
        const id = `${props.id}--slide-${idx}`;
        const component = slide.template.meta.component;

        if (!templates.hasOwnProperty(component)) {
          return <Error msg={`Unabled to find template: ${component}`} />;
        }

        const Template = templates[component] as TemplateComponent;

        return (
          <Template
            key={idx}
            id={id}
            schema={slide.template}
            controller={controller.current}
            duration={0}
          />
        );
      })}
    </div>
  );
};

const finishCourse = () => {
  const runtime = window['Scrowl'].runtime;
  runtime?.finish();
};

export const create = (
  rootConfig: Array<PlayerRootConfig>,
  templateList: PlayerTemplateList
) => {
  const data: Array<PageDefinition> = [];

  console.log(rootConfig);

  rootConfig.forEach((module, mIdx) => {
    module.lessons.forEach((page, lIdx) => {
      const id = `module-${mIdx}--lesson-${lIdx}`;
      const url = `/${id}`;

      let nextLessonUrl;
      let nextLessonId;
      let nextLessonText;

      if (lIdx < module.lessons.length - 1 || mIdx < rootConfig.length - 1) {
        nextLessonId = `module-${mIdx}--lesson-${lIdx + 1}`;
        nextLessonUrl = `/${nextLessonId}`;
        nextLessonText = `Continue to the next lesson`;
      }

      if (lIdx === module.lessons.length - 1 && mIdx <= rootConfig.length - 1) {
        nextLessonId = `module-${mIdx + 1}--lesson-0`;
        nextLessonUrl = `/${nextLessonId}`;
        nextLessonText = `Continue to the first Lesson of Module ${mIdx + 1}`;
      }

      data.push({
        module: module.module,
        lesson: page.lesson,
        url,
        Element: () => {
          return (
            <>
              <NavBar rootConfig={rootConfig} />
              <Page id={id} slides={page.slides} templates={templateList} />
              <div className={css.nextLessonContainer}>
                {lIdx < module.lessons.length - 1 ||
                mIdx < rootConfig.length - 1 ? (
                  <Link to={nextLessonUrl}>{nextLessonText}</Link>
                ) : (
                  <button onClick={finishCourse}>Finish Course</button>
                )}
              </div>
            </>
          );
        },
      });
    });
  });

  return data;
};

export default {
  create,
};
