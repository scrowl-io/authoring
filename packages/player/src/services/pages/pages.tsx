import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageDefinition, PageProps } from './pages.types';
import {
  PlayerRootConfig,
  PlayerTemplateList,
  TemplateComponent,
} from '../../root/root.types';
import { Error } from '../../components';

const Page = ({ slides, templates, ...props }: PageProps) => {
  const controller = new window['Scrowl'].core.scroll.Controller();
  const player = document.querySelector('.player-main');

  useEffect(() => {
    player?.scrollTo({ top: 0 });
  }, [slides]);

  useEffect(() => {
    return () => {
      controller.destroy(true);
    };
  });

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
            controller={controller}
          />
        );
      })}
    </div>
  );
};

const finishCourse = () => {
  console.log('finished the course');
};

export const create = (
  rootConfig: Array<PlayerRootConfig>,
  templateList: PlayerTemplateList
) => {
  const data: Array<PageDefinition> = [];

  rootConfig.forEach((config, mIdx) => {
    config.lessons.forEach((page, lIdx) => {
      const id = `module-${mIdx}--lesson-${lIdx}`;
      const url = `/${id}`;

      let nextLessonUrl;
      let nextLessonId;
      let nextLessonText;

      if (lIdx < config.lessons.length - 1) {
        nextLessonId = `module-${mIdx}--lesson-${lIdx + 1}`;
        nextLessonUrl = `/${nextLessonId}`;
        nextLessonText = `Continue to Lesson ${lIdx + 1}`;
      }

      data.push({
        module: config.module,
        lesson: page.lesson,
        url,
        Element: () => {
          return (
            <>
              <Page id={id} slides={page.slides} templates={templateList} />
              {lIdx < config.lessons.length - 1 ? (
                <>
                  <Link to={nextLessonUrl}>{nextLessonText}</Link>
                </>
              ) : (
                <button onClick={finishCourse}>Finish Course</button>
              )}
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
