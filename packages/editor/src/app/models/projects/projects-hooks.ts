import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
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
  return useSelector((data: stateManager.RootState) => data.projects);
};

export const setState = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setState(data));
};

export const useMeta = () => {
  return useSelector((data: stateManager.RootState) => data.projects.meta);
};

export const setMeta = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setMeta(data));
};

export const useScorm = () => {
  return useSelector((data: stateManager.RootState) => data.projects.scorm);
};

export const setScorm = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setMeta(data));
};

export const useModules = () => {
  return useSelector((data: stateManager.RootState) => data.projects.modules);
};

export const addModule = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.addModule(data));
};

export const setModuleName = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setModuleName(data));
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

export const useLessons = () => {
  return useSelector((data: stateManager.RootState) => data.projects.lessons);
};

export const addLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.addLesson(data));
};

export const setLessonName = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setLessonName(data));
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

export const useSlides = () => {
  return useSelector((data: stateManager.RootState) => data.projects.slides);
};

export const addSlide = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.addSlide(data));
};

export const setSlideName = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setSlideName(data));
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
  return useSelector((data: stateManager.RootState) => data.projects.glossary);
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

export const useResouces = () => {
  return useSelector((data: stateManager.RootState) => data.projects.resources);
}

export const addResourceyItem = (data) => {
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

export const create = () => {

  return new Promise((resolve) => {
    API.create().then(resolve);
  });
};

export const importAsset = () => {

  return new Promise((resolve) => {
    API.importAsset().then(resolve);
  });
};

export const save = () => {
  const data = useSelector((data: stateManager.RootState) => data.projects);

  return new Promise((resolve) => {
    API.save(data).then(resolve);
  });
};

export const publish = () => {

  return new Promise((resolve) => {
    API.publish().then(resolve);
  });
};

export const list = () => {

  return new Promise((resolve) => {
    API.list().then(resolve);
  });
};

export const open = () => {

  return new Promise((resolve) => {
    API.open().then(resolve);
  });
};

export default {
  useProcessor,
  resetState,
  useState,
  setState,
  useMeta,
  setMeta,
  useScorm,
  setScorm,
  useModules,
  addModule,
  setModuleName,
  moveModule,
  removeModule,
  useLessons,
  addLesson,
  setLessonName,
  moveLesson,
  removeLesson,
  useSlides,
  addSlide,
  setSlideName,
  moveSlide,
  removeSlide,
  useGlossary,
  addGlossaryItem,
  setGlossaryItem,
  removeGlossaryItem,
  useResouces,
  addResourceyItem,
  setResourceItem,
  removeResourceItem,
  create,
  importAsset,
  save,
  publish,
  list,
  open,
};
