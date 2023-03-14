import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { PageDefinition } from './pages.types';
import { PlayerTemplateList } from '../../root/root.types';
import utils from '../../utils';
import * as _css from '../../root/_root.scss';
import { NavBar } from '../../components/navbar';
import { Page } from './page';

const css = utils.css.removeMapPrefix(_css);

const updateCourseProgress = (project, id) => {
  const Scrowl = window['Scrowl'];

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

  Scrowl.runtime?.updateProgress(percentageCompleted);
  if (window['API_1484_11']) {
    window['API_1484_11'].SetValue('cmi.progress_measure', percentageCompleted);
  }
};

const finishCourse = () => {
  const Scrowl = window['Scrowl'];

  if (Scrowl.runtime) {
    Scrowl.runtime.finish();
  }

  if (window['API_1484_11']) {
    window['API_1484_11'].SetValue('cmi.score.raw', 90);
    window['API_1484_11'].SetValue('cmi.score.min', 70);
    window['API_1484_11'].SetValue('cmi.score.max', 100);
    window['API_1484_11'].SetValue('cmi.score.scaled', 90 / 100);
    window['API_1484_11'].SetValue('cmi.success_status', 'passed');
    window['API_1484_11'].SetValue('cmi.completion_status', 'completed');
    window['API_1484_11'].SetValue('cmi.progress_measure', 1);
  }
};

export const create = (
  project,
  templateList: PlayerTemplateList,
  slideId: string
) => {
  const Scrowl = window['Scrowl'];
  const controller = new Scrowl.core.scroll.Controller();
  const data: Array<PageDefinition> = [];

  project.outlineConfig.forEach((module, mIdx) => {
    module.lessons.forEach((page, lIdx) => {
      const id = `module-${mIdx}--lesson-${page.lesson.id}`;
      const url = `/${id}`;

      let nextLessonUrl;
      let nextLessonId;
      let nextLessonText;

      if (
        lIdx < module.lessons.length - 1 ||
        mIdx < project.outlineConfig.length - 1
      ) {
        nextLessonId = `module-${mIdx}--lesson-${page.lesson.id + 1}`;
        nextLessonUrl = `/${nextLessonId}`;
        nextLessonText = `Continue to the next lesson`;
      }

      if (
        lIdx === module.lessons.length - 1 &&
        mIdx <= project.outlineConfig.length - 1
      ) {
        nextLessonId = `module-${mIdx + 1}--lesson-${page.lesson.id + 1}`;
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
              <NavBar slides={page.slides} pageId={id} project={project} />
              <div className="owlui-lesson">
                <Suspense fallback={<div>Loading...</div>}>
                  <Page
                    id={id}
                    slides={page.slides}
                    templates={templateList}
                    slideId={slideId}
                  />
                </Suspense>

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
