import React from 'react';
import * as css from './_root.scss';
import {
  PlayerRootProps,
  ProjectSlide,
  ProjectLesson,
  ProjectModule,
  PageConfig,
} from './root.types';
import { Error } from '../components';

const createPages = (
  slides: Array<ProjectSlide>,
  lessons: Array<ProjectLesson>,
  modules: Array<ProjectModule>
) => {
  const pages: Array<PageConfig> = [];

  while (modules.length > 0) {
    const module = modules.shift();

    if (!module) {
      break;
    }

    const config: PageConfig = {
      module: module,
      lessons: [],
    };
    const lCnt = lessons.length;
    let l = 0;

    while (lessons.length > 0 && l < lCnt) {
      l++;

      if (lessons[0].moduleId !== module.id) {
        continue;
      }

      const lesson = lessons.shift();

      if (!lesson) {
        break;
      }

      const configSlides: Array<ProjectSlide> = [];
      const sCnt = slides.length;
      let s = 0;

      while (slides.length > 0 && s < sCnt) {
        s++;

        if (
          slides[0].moduleId !== module.id ||
          slides[0].lessonId !== lesson.id
        ) {
          continue;
        }

        const slide = slides.shift();

        if (!slide) {
          break;
        }

        configSlides.push(slide);
      }

      config.lessons.push({
        lesson,
        slides: configSlides,
      });
    }

    pages.push(config);
  }

  return pages;
};

export const Root = ({ project, templateList, ...props }: PlayerRootProps) => {
  if (window.Scrowl) {
    const runtime = window.Scrowl.runtime;

    if (runtime) {
      const startRes = runtime.start();

      if (startRes.error) {
        console.error(`unable to start runtime: ${startRes.message}`);
      }
    }
  }

  console.log('project', project);
  console.log('templateList', templateList);

  if (!templateList || !Object.keys(templateList).length) {
    return <Error msg="Templates missing" />;
  }

  if (!project || !project.slides || !project.slides.length) {
    return <Error msg="Slides missing" />;
  }

  if (!project || !project.lessons || !project.lessons.length) {
    return <Error msg="Lessons missing" />;
  }

  if (!project || !project.modules || !project.modules.length) {
    return <Error msg="Modules missing" />;
  }

  const slides = project.slides;
  const lessons = project.lessons;
  const modules = project.modules;
  const pageConfig = createPages(slides, lessons, modules);

  console.log('');
  console.log('project', project);
  console.log('templateList', templateList);
  console.log('pageConfig', pageConfig);

  return (
    <div className={css.player} {...props}>
      <main className={css.playerMain}>Hello World</main>
    </div>
  );
};
