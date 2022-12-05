import { useSelector, useDispatch } from 'react-redux';
import { } from './settings.types';
import { stateManager, menu } from '../../services';
import { API, state } from './';

const processor: stateManager.StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const useState = () => {
  return useSelector((data: stateManager.RootState) => data.settings);
};

export const setState = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setState(data));
};

export const useTheme = () => {
  return useSelector((data: stateManager.RootState) => data.settings.theme);
};

export const setTheme = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setTheme(data));
};

export const useAspect = () => {
  return useSelector((data: stateManager.RootState) => data.settings.aspect);
};

export const setAspect = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setAspect(data));
};

export const useAnimation = () => {
  return useSelector((data: stateManager.RootState) => {
    return {
      reducedAnimations: data.settings.reducedAnimations,
      animationDelay: data.settings.animationDelay,
    };
  });
};

export const setAnimation = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setAnimation(data));
};

export const useHasWelcomed = () => {
  return useSelector((data: stateManager.RootState) => data.settings.hasWelcomed);
};

export const usePreviewMode = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.settings.previewMode;
  });
};

export const setPreviewMode = (type: menu.PreviewTypes) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setPreviewMode(type));
};

export const init = () => {
  return new Promise((resolve) => {
    API.get().then(result => {
      if (result.error) {
        resolve(result);
        return;
      }
  
      setState(result.data.settings);
      resolve(result);
    });
  });
};

export const save = () => {
  const data = useSelector((data: stateManager.RootState) => data.settings);

  return new Promise((resolve) => {
    API.save(data).then(resolve);
  });
};

export default {
  useProcessor,
  useState,
  setState,
  useTheme,
  setTheme,
  useAspect,
  setAspect,
  useAnimation,
  setAnimation,
  useHasWelcomed,
  usePreviewMode,
  setPreviewMode,
  init,
  save,
};
