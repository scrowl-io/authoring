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
      console.warn(
        'active template elements does not have prop',
        prop,
        data.activeSlide.template.content
      );
      return;
    }
  });
};

export const useActiveTemplateControls = (prop?: string) => {
  return useSelector((data: stateManager.RootState) => {
    if (!prop) {
      return data.activeSlide.template.controlOptions;
    }

    if (hasProp(data.activeSlide.template.controlOptions, prop)) {
      return data.activeSlide.template.controlOptions[prop];
    } else {
      console.log(
        'active template elements does not have prop',
        prop,
        data.activeSlide.template.controlOptions
      );
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

export const setActiveTemplateControls = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.activeSlide.setTemplateControls(data));
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

  const fn = state.workspace
    .closeTemplateBrowser as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useNewContent = () => {
  return useSelector((data: stateManager.RootState) => {
    return {
      newSlide: data.workspace.newSlide,
      newLesson: data.workspace.newLesson,
      newModule: data.workspace.newModule,
    };
  });
};

export const resetNewContent = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.resetNewContent as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const usePromptProjectName = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.isOpenPromptProjectName;
  });
};

export const openPromptProjectName = (postEvent?: unknown) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.workspace.openPromptProjectName({ postEvent }));
};

export const closePromptProjectName = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace
    .closePromptProjectName as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const usePromptProjectNamePostEvent = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.promptProjectNamePostEvent;
  });
};

export const resetPromptProjectNamePostEvent = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace
    .resetPromptProjectNamePostEvent as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const usePublishProgress = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.isOpenPublishProgress;
  });
};

export const openPublishProgress = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.openPublishProgress as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const closePublishProgress = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace
    .closePublishProgress as ActionCreatorWithoutPayload;
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
  useActiveTemplateControls,
  setActiveTemplateControls,
  useContentFocus,
  setContentFocus,
  resetContentFocus,
  useTemplateBrowser,
  openTemplateBrowser,
  closeTemplateBrowser,
  useNewContent,
  resetNewContent,
  usePromptProjectName,
  openPromptProjectName,
  closePromptProjectName,
  usePromptProjectNamePostEvent,
  resetPromptProjectNamePostEvent,
  usePublishProgress,
  openPublishProgress,
  closePublishProgress,
};
