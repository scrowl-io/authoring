import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../../services'
import { updateObj, setObjField } from '../../../utils';

export const initialState = {
  moduleId: -1,
  lessonId: -1,
  id: -1,
  name: '',
  template: {
    meta: {
      label: '',
      filename: '',
      component: '',
      version: '',
    },
    content: {},
  },
  notes: '',
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
      updateObj(state, initialState);
    },
    setTemplate: (state, action) => {
      updateObj(state.template, action.payload);
    },
    setTemplateContent: (state, action) => {
      let pointer = typeof action.payload.field === 'string' ? action.payload.field : action.payload.field.join('.content.');
      const value = action.payload.value;

      pointer += '.value';
      setObjField(state.template.content, pointer, value);
    },
  },
};

export const slice = createSlice(config);

export const { setData, resetData, setTemplate, setTemplateContent } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};