import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageDefinition, PageProps } from './pages.types';
import {
  // @ts-ignore
  PlayerRootConfig,
  PlayerTemplateList,
  TemplateComponent,
} from '../../root/root.types';
import utils from '../../utils';
import * as _css from '../../root/_root.scss';
import { Error } from '../../components';
import { NavBar } from '../../components/navbar';

const css = utils.css.removeMapPrefix(_css);

const Page = ({ slides, controller, templates, ...props }: PageProps) => {
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
    <>
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
    </>
  );
};

const updateCourseProgress = (project, id) => {
  const Scrowl = window['Scrowl'];
  console.log('inside pages:');

  let lessonsArray: { index: number; targetId: string; lesson: any }[] = [];
  let counter = 1;
  project.outlineConfig.forEach((module, mIdx) => {
    module.lessons.forEach((lesson, lIdx) => {
      const lessonObj = {
        index: counter,
        targetId: `module-${mIdx}--lesson-${lIdx}`,
        lesson: lesson,
      };
      counter++;
      lessonsArray.push(lessonObj);
    });
  });

  const currentLesson = lessonsArray.find((lesson) => {
    return lesson.targetId === id;
  });

  const currentLessonIndex = currentLesson?.index;
  const totalLessons = lessonsArray.length;

  let percentageCompleted;

  if (currentLessonIndex) {
    percentageCompleted = currentLessonIndex / totalLessons;
  }
  const runtimeLesson = {
    m: currentLesson?.lesson.lesson.moduleId,
    l: currentLesson?.lesson.lesson.id,
    s: currentLesson?.lesson.slides,
  };
  console.log(runtimeLesson);
  console.log('lesson');
  console.log(currentLesson?.lesson);
  const runtime = Scrowl.runtime;
  runtime?.updateLocation(currentLesson?.lesson, percentageCompleted);
};

const finishCourse = () => {
  const Scrowl = window['Scrowl'];
  const runtime = Scrowl.runtime;

  runtime?.finish();
};

export const create = (project, templateList: PlayerTemplateList) => {
  const Scrowl = window['Scrowl'];
  const controller = new Scrowl.core.scroll.Controller();
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
              <div className="owlui-lesson">
                <Page
                  id={id}
                  slides={page.slides}
                  controller={controller}
                  templates={templateList}
                />
                <Scrowl.core.Template
                  className="owlui-last"
                  id={`slide-end-${id}`}
                  controller={controller}
                  notScene={true}
                >
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
                      <Scrowl.ui.Button onClick={finishCourse}>
                        Finish Course
                      </Scrowl.ui.Button>
                    )}
                  </div>
                </Scrowl.core.Template>
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
