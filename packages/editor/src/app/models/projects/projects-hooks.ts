import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { stateManager, rq } from '../../services';
import { API, state } from './';

const processor: stateManager.StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const resetState = () => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  const fn = state.resetState as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useState = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data);
};

export const setData = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setData(data));
};

export const useMeta = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.meta);
};

export const setMeta = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setMeta(data));
};

export const useScorm = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.scorm);
};

export const setScorm = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setMeta(data));
};

export const useModules = (moduleIdx?: number,) => {
  return useSelector((data: stateManager.RootState) => {
    const hasModuleIdx = moduleIdx !== undefined && moduleIdx !== null && moduleIdx !== -1;

    if (!hasModuleIdx) {
      return data.projects.data.modules;
    }
    
    return data.projects.data.modules.filter((module, idx) => {
      return idx === moduleIdx;
    })[0];
  });
};

export const addModule = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addModule(data));
};

export const setModule = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setModule(data));
};

export const removeModule = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeModule(data));
};

export const useLessons = (moduleIdx?: number, lessonIdx?: number) => {
  return useSelector((data: stateManager.RootState) => {
    const hasModuleIdx = moduleIdx !== undefined && moduleIdx !== null && moduleIdx !== -1;
    const hasLessonIdx = lessonIdx !== undefined && lessonIdx !== null && lessonIdx !== -1;

    if (!hasModuleIdx) {
      return data.projects.data.lessons;
    }

    if (!hasLessonIdx) {
      return data.projects.data.lessons.filter((lesson) => {
        return lesson.moduleIdx === moduleIdx;
      })
    }

    return data.projects.data.lessons.filter((lesson, idx) => {
      return lesson.moduleIdx === moduleIdx && idx === lessonIdx;
    })[0];
  });
};

export const addLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addLesson(data));
};

export const setLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setLesson(data));
};

export const removeLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeLesson(data));
};

export const useSlides = (moduleIdx?: number, lessonIdx?: number) => {
  return useSelector((data: stateManager.RootState) => {
    if (!moduleIdx || !lessonIdx) {
      return data.projects.data.slides;
    }
    
    return data.projects.data.slides.filter((slide) => {
      return slide.moduleIdx === moduleIdx && slide.lessonIdx === lessonIdx;
    })
  });
};

export const addSlide = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addSlide(data));
};

export const setSlide = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setSlide(data));
};

export const removeSlide = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeSlide(data));
};

export const moveOutlineItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.moveOutlineItem(data));
};

export const useGlossary = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.glossary);
}

export const addGlossaryItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addGlossaryItem(data));
};

export const setGlossaryItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setGlossaryItem(data));
};

export const removeGlossaryItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeGlossaryItem(data));
};

export const useResources = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.resources);
}

export const addResourceItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addResourceItem(data));
};

export const setResourceItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setResourceItem(data));
};

export const removeResourceItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeResourceItem(data));
};

export const useAssets = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.assets);
}

export const addAsset = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addAssetItem(data));
};

export const setAsset = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setAssetItem(data));
};

export const removeAsset = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeAssetItem(data));
};

export const create = (): Promise<rq.ApiResult> => {
  return new Promise((resolve) => {
    API.create().then((result) => {
      if (!result.error) {
        setData(result.data.project);
      }

      resolve(result);
    });
  });
};

export const importAsset = (): Promise<rq.ApiResult> => {

  return new Promise((resolve) => {
    API.importAsset().then(resolve);
  });
};

export const save = (): Promise<rq.ApiResult> => {
  const data = useSelector((data: stateManager.RootState) => data.projects.data.data);

  return new Promise((resolve) => {
    API.save(data).then(resolve);
  });
};

export const publish = (): Promise<rq.ApiResult> => {

  return new Promise((resolve) => {
    API.publish().then(resolve);
  });
};

export const list = (): Promise<rq.ApiResult> => {

  return new Promise((resolve) => {
    API.list().then(resolve);
  });
};

export const open = (): Promise<rq.ApiResult> => {

  return new Promise((resolve) => {
    API.open().then(resolve);
  });
};

export default {
  useProcessor,
  resetState,
  useState,
  setData,
  useMeta,
  setMeta,
  useScorm,
  setScorm,
  useModules,
  addModule,
  setModule,
  removeModule,
  useLessons,
  addLesson,
  setLesson,
  removeLesson,
  useSlides,
  addSlide,
  setSlide,
  removeSlide,
  moveOutlineItem,
  useGlossary,
  addGlossaryItem,
  setGlossaryItem,
  removeGlossaryItem,
  useResources,
  addResourceItem,
  setResourceItem,
  removeResourceItem,
  useAssets,
  addAsset,
  setAsset,
  removeAsset,
  create,
  importAsset,
  save,
  publish,
  list,
  open,
};
