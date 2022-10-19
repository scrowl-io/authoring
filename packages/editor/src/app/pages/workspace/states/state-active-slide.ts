import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../../services'
import { updateObj } from '../../../utils';

export const initialState = {
  moduleIdx: -1,
  lessonIdx: -1,
  slideIdx: -1,
  name: '',
  template: {
    meta: {
      name: '',
      filename: '',
      component: '',
    },
    elements: {},
  }
};

export const config: stateManager.StateConfig = {
  name: 'activeSlide',
  initialState,
  reducers: {
    setData: (state, action) => {
      const { slide, ...props } = action.payload;

      if (slide) {
        updateObj(state, slide);
      }

      updateObj(state, props);
    },
    resetData: (state) => {
      state = initialState;
    },
    setSlideName: (state, action) => {
      state.name = action.payload;
    },
  },
};

export const slice = createSlice(config);

export const { setData, resetData, setSlideName } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};