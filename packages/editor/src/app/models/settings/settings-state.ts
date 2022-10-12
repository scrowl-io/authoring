import { createSlice } from '@reduxjs/toolkit';
import * as utils from '../../utils';
import { stateManager } from '../../services'

export enum ASPECT_RATIO {
  Fit = "FIT",
  Wide_16_9 = "16:9",
};

export const initialState = {
  firstLoad: true,
  theme: 'light',
  aspect: ASPECT_RATIO.Fit,
  reducedAnimations: false,
  animationDelay: 0,
};

export const config: stateManager.StateConfig = {
  name: 'settings',
  initialState,
  reducers: {
    setState: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    setFirstLoad: (state, action) => {
      state.firstLoad = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setAspect: (state, action) => {
      state.aspect = action.payload;
    },
    setAnimation: (state, action) => {
      if (utils.hasProp(action.payload, 'reducedAnimations')) {
        state.reducedAnimations  = action.payload.reducedAnimations;
      }
      
      if (utils.hasProp(action.payload, 'animationDelay')) {
        state.animationDelay = action.payload.animationDelay;
      }
    },
  }
};

export const slice = createSlice(config);

export const { setState, setTheme, setAspect, setAnimation, setFirstLoad } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};
