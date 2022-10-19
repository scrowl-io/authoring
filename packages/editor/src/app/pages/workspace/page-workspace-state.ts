import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../services'

export const initialState = {
  isOpenGlossaryEditor: false,
  activeSlide: {
    moduleIdx: -1,
    lessonIdx: -1,
    slideIdx: -1,
  },
  data: {
    meta: {
      moduleIdx: -1,
      lessonIdx: -1,
      name: '',
    },
    template: {
      meta: {
        name: '',
        filename: '',
        component: '',
      },
      elements: {},
    }
  }
};

export const config: stateManager.StateConfig = {
  name: 'workspace',
  initialState,
  reducers: {
    setGlossaryEditor: (state, action) => {
      state.isOpenGlossaryEditor = action.payload;
    },
    setActiveSlide: (state, action) => {
      const position = {
        moduleIdx: action.payload.slide.meta.moduleIdx,
        lessonIdx: action.payload.slide.meta.lessonIdx,
        slideIdx: action.payload.slideIdx,
      };

      state.activeSlide = position;
      state.data = action.payload.slide;
    },
    resetActiveSlide: (state) => {
      state.activeSlide = initialState.activeSlide;
      state.data = initialState.data;
    },
    setData: (state, action) => {
      state.data = Object.assign(state.data, action.payload);
    },
    resetData: (state) => {
      state.data = initialState.data;
    },
  },
};

export const slice = createSlice(config);

export const { setGlossaryEditor, setActiveSlide, resetActiveSlide, setData, resetData } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};