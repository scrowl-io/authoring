import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
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

export const useData = () => {
  return useSelector((data: stateManager.RootState) => data.workspace.data);
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
};
