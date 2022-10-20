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
    setTemplate: (state, action) => {
      updateObj(state.template, action.payload);
    },
    setTemplateElements: (state, action) => {
      updateObj(state.template.elements, action.payload);
    },
  },
};

export const slice = createSlice(config);

export const { setData, resetData, setTemplate, setTemplateElements } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};