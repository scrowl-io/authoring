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
    console.warn('settings processor not ready');
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
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setData(data));
};

export const useMeta = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.meta);
};

export const setMeta = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setMeta(data));
};

export const useScorm = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.scorm);
};

export const setScorm = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setMeta(data));
};

export const useModules = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.modules);
};

export const addModule = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.addModule(data));
};

export const setModule = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setModule(data));
};

export const moveModule = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.moveModule(data));
};

export const removeModule = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.removeModule(data));
};

export const useLessons = (moduleIdx?: number) => {
  return useSelector((data: stateManager.RootState) => {
    if (!moduleIdx) {
      return data.projects.data.lessons;
    }
    
    return data.projects.data.lessons.filter((lesson) => {
      return lesson.moduleIdx === moduleIdx;
    })
  });
};

export const addLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.addLesson(data));
};

export const setLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setLesson(data));
};

export const moveLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.moveLesson(data));
};

export const removeLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
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
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.addSlide(data));
};

export const setSlide = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setSlide(data));
};

export const moveSlide = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.moveSlide(data));
};

export const removeSlide = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.removeSlide(data));
};

export const useGlossary = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.glossary);
}

export const addGlossaryItem = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.addGlossaryItem(data));
};

export const setGlossaryItem = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setGlossaryItem(data));
};

export const removeGlossaryItem = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.removeGlossaryItem(data));
};

export const useResources = () => {
  return useSelector((data: stateManager.RootState) => data.projects.data.resources);
}

export const addResourceItem = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.addResourceItem(data));
};

export const setResourceItem = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setResourceItem(data));
};

export const removeResourceItem = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.removeResourceItem(data));
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
  moveModule,
  removeModule,
  useLessons,
  addLesson,
  setLesson,
  moveLesson,
  removeLesson,
  useSlides,
  addSlide,
  setSlide,
  moveSlide,
  removeSlide,
  useGlossary,
  addGlossaryItem,
  setGlossaryItem,
  removeGlossaryItem,
  useResources,
  addResourceItem,
  setResourceItem,
  removeResourceItem,
  create,
  importAsset,
  save,
  publish,
  list,
  open,
};
