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

export const useWorkspace = (prop?: string) => {
  return useSelector((data: stateManager.RootState) => {
    if (!prop) {
      return data.workspace;
    }

    if (hasProp(data.workspace, prop)) {
      return data.workspace[prop];
    } else {
      console.warn('workspace data does not have prop', prop, data.workspace);
      return;
    }
  });
};

export const setWorkspace = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.workspace.setData(data));
};

export const resetWorkspace = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.resetData as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useActiveSlide = (prop?: string) => {
  return useSelector((data: stateManager.RootState) => {
    if (!prop) {
      return data.activeSlide;
    }

    if (hasProp(data.activeSlide, prop)) {
      return data.activeSlide[prop];
    } else {
      console.warn('active slide does not have prop', prop, data.activeSlide);
      return;
    }
  });
};

export const setActiveSlide = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.activeSlide.setData(data));
};

export const resetActiveSlide = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.activeSlide.resetData as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useActiveTemplate = (prop?: string) => {
  return useSelector((data: stateManager.RootState) => {
    if (!prop) {
      return data.activeTemplate;
    }

    if (hasProp(data.activeTemplate, prop)) {
      return data.activeTemplate[prop];
    } else {
      console.warn('active template does not have prop', prop, data.activeTemplate);
      return;
    }
  });
};

export const setActiveTemplate = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.activeTemplate.setData(data));
};

export const resetActiveTemplate = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.activeTemplate.resetData as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export default {
  useProcessor,
  useWorkspace,
  setWorkspace,
  resetWorkspace,
  useActiveSlide,
  setActiveSlide,
  resetActiveSlide,
  useActiveTemplate,
  setActiveTemplate,
  resetActiveTemplate,
};
