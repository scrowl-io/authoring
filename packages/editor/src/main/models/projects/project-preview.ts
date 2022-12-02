import { createScormSource, createScormEntry } from './project-publisher';
import { ProjectData, ProjectFile } from './projects.types';
import { rq, fs, log, mu } from '../../services';
import { lt, obj } from '../../utils';

export const createPreviewSource = (project: ProjectData, meta: ProjectFile, source: string, dest: string) => {
  return new Promise<rq.ApiResult>((resolve) => {
    createScormSource(project, meta, source, dest).then((sourceRes) => {
      if (sourceRes.error) {
        log.error(sourceRes);
        resolve(sourceRes);
        return;
      }
      
      const templates = sourceRes.data.templates;

      createScormEntry(project, source, dest, templates).then((entryRes) => {
        if (entryRes.error) {
          log.error(entryRes);
          resolve(entryRes);
          return;
        }
        console.log(entryRes);
        resolve(entryRes);
      })
    });
  });
};

export const preview = (project: ProjectData, meta: ProjectFile, source: string, type: mu.PreviewTypes, id?: number) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const previewDest = fs.APP_PATHS.preview;
    let previewData: ProjectData | undefined = undefined;
    let entityId = id !== undefined && Number.isInteger(id) ? id : -1;
    const previewError = {
      error: true,
      message: '',
      data: {
        project,
        meta,
        source,
        type,
        id,
      }
    };

    switch (type) {
      case 'slide':
        if (!project.slides || !project.slides.length) {
          previewError.message = 'Unable to create preview: project has no slides';
          log.error(previewError);
          resolve(previewError);
          return;
        }

        if (entityId === -1) {
          previewError.message = 'Unable to create preview: slide id required';
          log.error(previewError);
          resolve(previewError);
          return;
        }

        const slides = project.slides as unknown as Array<obj.JSON_DATA>;
        const slideIdx = lt.indexOf(slides, 'id', entityId);

        if (slideIdx === -1) {
          previewError.message = 'Unable to create preview: slide not found';
          log.error(previewError);
          resolve(previewError);
          return;
        }

        const slide = project.slides[slideIdx];

        previewData = {
          ...project,
          modules: project.modules?.filter((m) => {
            return m.id === slide.moduleId;
          }),
          lessons: project.lessons?.filter((l) => {
            return l.moduleId === slide.moduleId && l.id === slide.lessonId;
          }),
          slides: [slide],
        };
        break;
      case 'lesson':
        if (!project.lessons || !project.lessons.length) {
          previewError.message = 'Unable to create preview: project has no lessons';
          log.error(previewError);
          resolve(previewError);
          return;
        }

        if (entityId === -1) {
          previewError.message = 'Unable to create preview: lesson id required';
          log.error(previewError);
          resolve(previewError);
          return;
        }

        const lessons = project.lessons as unknown as Array<obj.JSON_DATA>;
        const lessonIdx = lt.indexOf(lessons, 'id', entityId);

        if (lessonIdx === -1) {
          previewError.message = 'Unable to create preview: lesson not found';
          log.error(previewError);
          resolve(previewError);
          return;
        }

        const lesson = project.lessons[lessonIdx];

        previewData = {
          ...project,
          modules: project.modules?.filter((m) => {
            return m.id === lesson.moduleId;
          }),
          lessons: [lesson],
          slides: project.slides?.filter((s) => {
            return s.moduleId === lesson.moduleId && s.lessonId === lesson.id;
          }),
        };
        break;
      case 'module':
        if (!project.modules || !project.modules.length) {
          previewError.message = 'Unable to create preview: project has no modules';
          log.error(previewError);
          resolve(previewError);
          return;
        }

        if (entityId === -1) {
          previewError.message = 'Unable to create preview: module id required';
          log.error(previewError);
          resolve(previewError);
          return;
        }

        const modules = project.modules as unknown as Array<obj.JSON_DATA>;
        const moduleIdx = lt.indexOf(modules, 'id', entityId);

        if (moduleIdx === -1) {
          previewError.message = 'Unable to create preview: module not found';
          log.error(previewError);
          resolve(previewError);
          return;
        }

        const module = project.modules[moduleIdx];

        previewData = {
          ...project,
          modules: [module],
          lessons: project.lessons?.filter((l) => {
            return l.moduleId === module.id;
          }),
          slides: project.slides?.filter((s) => {
            return s.moduleId === module.id;
          }),
        };
        break;
      case 'project':
        previewData = project;
        break;
    }

    if (!previewData) {
      previewError.message = 'Unable to preview: project data not set';
      log.error(previewError);
      resolve(previewError);
      return;
    }

    createPreviewSource(previewData, meta, source, previewDest).then(resolve);
  });
};

export default {
  createPreviewSource,
  preview,
};
