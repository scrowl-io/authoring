import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageDefinition, PageProps } from './pages.types';
import {
  // @ts-ignore
  PlayerRootConfig,
  PlayerTemplateList,
  TemplateComponent,
} from '../../root/root.types';
import * as css from '../../root/_root.scss';
import { Error } from '../../components';
import { NavBar } from '../../components/navbar';

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
    <div className="lesson">
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

const updateCourseProgress = (project, id) => {
  console.log('inside pages:');

  let lessonsArray: { index: number; targetId: string }[] = [];
  let counter = 1;
  project.outlineConfig.forEach((module, mIdx) => {
    module.lessons.forEach((_lesson, lIdx) => {
      const lessonObj = {
        index: counter,
        targetId: `module-${mIdx}--lesson-${lIdx}`,
      };
      counter++;
      lessonsArray.push(lessonObj);
    });
  });

  const currentSlide = lessonsArray.find((lesson) => {
    return lesson.targetId === id;
  });

  const currentSlideIndex = currentSlide?.index;
  const totalLessons = lessonsArray.length;

  let percentageCompleted;

  if (currentSlideIndex) {
    percentageCompleted = currentSlideIndex / totalLessons;
  }

  console.log(percentageCompleted);
  const runtime = window['Scrowl'].runtime;
  runtime?.updateProgress(percentageCompleted);
};

const finishCourse = () => {
  const runtime = window['Scrowl'].runtime;
  runtime?.finish();
};

export const create = (project, templateList: PlayerTemplateList) => {
  const data: Array<PageDefinition> = [];

  project.outlineConfig.forEach((module, mIdx) => {
    module.lessons.forEach((page, lIdx) => {
      const id = `module-${mIdx}--lesson-${lIdx}`;
      const url = `/${id}`;

      let nextLessonUrl;
      let nextLessonId;
      let nextLessonText;

      if (
        lIdx < module.lessons.length - 1 ||
        mIdx < project.outlineConfig.length - 1
      ) {
        nextLessonId = `module-${mIdx}--lesson-${lIdx + 1}`;
        nextLessonUrl = `/${nextLessonId}`;
        nextLessonText = `Continue to the next lesson`;
      }

      if (
        lIdx === module.lessons.length - 1 &&
        mIdx <= project.outlineConfig.length - 1
      ) {
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
              <NavBar pageId={id} project={project} />
              <Page id={id} slides={page.slides} templates={templateList} />
              <div className={css.nextLessonContainer}>
                {lIdx < module.lessons.length - 1 ||
                mIdx < project.outlineConfig.length - 1 ? (
                  <Link
                    to={nextLessonUrl}
                    // @ts-ignore
                    onClick={() => updateCourseProgress(project, id)}
                  >
                    {nextLessonText}
                  </Link>
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
