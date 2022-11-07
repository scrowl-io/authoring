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

export const useContentFocus = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.contentFocus;
  });
};

export const setContentFocus = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.workspace.setContentFocus(data));
};

export const resetContentFocus = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.resetContentFocus as ActionCreatorWithoutPayload;
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
      return data.activeSlide.template;
    }

    if (hasProp(data.activeSlide.template, prop)) {
      return data.activeSlide.template[prop];
    } else {
      console.warn('active template does not have prop', prop, data.activeSlide.template);
      return;
    }
  });
};

export const setActiveTemplate = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.activeSlide.setTemplate(data));
};

export const useActiveTemplateContent = (prop?: string) => {
  return useSelector((data: stateManager.RootState) => {
    if (!prop) {
      return data.activeSlide.template.content;
    }
    
    if (hasProp(data.activeSlide.template.content, prop)) {
      return data.activeSlide.template.content[prop];
    } else {
      console.warn('active template elements does not have prop', prop, data.activeSlide.template.content);
      return;
    }
  });
};

export const setActiveTemplateContent = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.activeSlide.setTemplateContent(data));
};

export const useTemplateBrowser = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.isOpenTemplateBrowser;
  });
};

export const openTemplateBrowser = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.openTemplateBrowser as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const closeTemplateBrowser = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.closeTemplateBrowser as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useNewSlide = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.newSlide;
  });
};

export const resetNewSlide = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.resetNewSlide as ActionCreatorWithoutPayload;
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
  useActiveTemplateContent,
  setActiveTemplateContent,
  useContentFocus,
  setContentFocus,
  resetContentFocus,
  useTemplateBrowser,
  openTemplateBrowser,
  closeTemplateBrowser,
  useNewSlide,
  resetNewSlide,
};
