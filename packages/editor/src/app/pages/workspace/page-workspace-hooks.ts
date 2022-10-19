import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
import { hasProp } from '../../utils';
import { state } from './';

const processor: stateManager.StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const useGlossaryEditor = () => {
  return useSelector((data: stateManager.RootState) => data.workspace.isOpenGlossaryEditor);
};

export const setGlossaryEditor = (isOpen: boolean) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.setGlossaryEditor(isOpen));
};

export const useActiveSlide = () => {
  return useSelector((data: stateManager.RootState) => data.workspace.activeSlide);
};

export const setActiveSlide = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.setActiveSlide(data));
};

export const resetActiveSlide = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.resetActiveSlide as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useData = (prop?: string) => {
  return useSelector((data: stateManager.RootState) => {
    if (!prop) {
      return data.workspace.data;
    }

    if (hasProp(data.workspace.data, prop)) {
      return data.workspace.data[prop];
    } else {
      console.warn('workspace data does not have prop', prop, data.workspace.data);
      return;
    }
  });
};

export const setData = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.setData(data));
};

export const resetData = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.resetData as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useTemplate = (prop?: string) => {
  return useSelector((data: stateManager.RootState) => {
    const template = data.workspace.data.template;

    if (!prop) {
      return template;
    }

    if (hasProp(template, prop)) {
      return template[prop];
    } else {
      console.warn('slide template does not have prop', prop, template);
      return;
    }
  });
}

export const useTemplateElements = (prop?: string) => {
  return useSelector((data: stateManager.RootState) => {
    const elements = data.workspace.data.template.elements;

    if (!prop) {
      return elements;
    }

    if (hasProp(elements, prop)) {
      return elements[prop];
    } else {
      console.warn('slide template elements does not have prop', prop, elements);
      return;
    }
  });
}

export default {
  useProcessor,
  useGlossaryEditor,
  setGlossaryEditor,
  useActiveSlide,
  setActiveSlide,
  resetActiveSlide,
  useData,
  setData,
  resetData,
  useTemplate,
  useTemplateElements,
};
