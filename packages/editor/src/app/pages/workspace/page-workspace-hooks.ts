import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
import { hasProp } from '../../utils';
import { state } from './';

export const useHooks = () => {
  const dispatch = useDispatch();

  return {
    useWorkspace: (prop?: string) => {
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
    },
    setWorkspace: (data) => {
      dispatch(state.workspace.setData(data));
    },
    resetWorkspace: () => {
      const fn = state.workspace.resetData as ActionCreatorWithoutPayload;
    
      dispatch(fn());
    },
    useActiveSlide: (prop?: string) => {
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
    },
    setActiveSlide: (data) => {
      dispatch(state.activeSlide.setData(data));
    },
    resetActiveSlide: () => {
      const fn = state.activeSlide.resetData as ActionCreatorWithoutPayload;
    
      dispatch(fn());
    },
    useActiveTemplate: (prop?: string) => {
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
    },
    setActiveTemplate: (data) => {
      dispatch(state.activeTemplate.setData(data));
    },
    resetActiveTemplate: () => {
      const fn = state.activeTemplate.resetData as ActionCreatorWithoutPayload;
    
      dispatch(fn());
    },
  };
};

export default {
  useHooks,
};
