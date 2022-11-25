import {
  ProjectSlide,
  ProjectLesson,
  ProjectModule,
  PlayerRootConfig,
} from './root.types';

export const create = (
  slides: Array<ProjectSlide>,
  lessons: Array<ProjectLesson>,
  modules: Array<ProjectModule>,
  resources,
  glossary
) => {
  const rootConfig: Array<PlayerRootConfig> = [];

  while (modules.length > 0) {
    const module = modules.shift();

    if (!module) {
      break;
    }

    const config: PlayerRootConfig = {
      module: module,
      lessons: [],
      resources: resources,
      glossary: glossary,
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

    rootConfig.push(config);
  }

  return rootConfig;
};

export default {
  create,
};
