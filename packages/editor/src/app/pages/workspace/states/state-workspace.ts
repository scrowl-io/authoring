import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../../services'
import { updateObj } from '../../../utils';
import { Projects } from '../../../models';

export const initialState = {
  isOpenGlossaryEditor: false,
  isOpenAssetBrowser: false,
  isOpenTemplateBrowser: false,
  isOpenPromptProjectName: false,
  isOpenPublishProgress: false,
  contentFocus: null,
  newSlide: false,
  newLesson: false,
  newModule: false,
};

export const config: stateManager.StateConfig = {
  name: 'workspace',
  initialState,
  reducers: {
    setData: (state, action) => {
      updateObj(state, action.payload);
    },
    resetData: (state) => {
      updateObj(state, initialState);
    },
    setContentFocus: (state, action) => {
      state.contentFocus = action.payload;
    },
    resetContentFocus: (state) => {
      state.contentFocus = null;
    },
    openTemplateBrowser: (state) => {
      state.isOpenTemplateBrowser = true;
    },
    closeTemplateBrowser: (state) => {
      state.isOpenTemplateBrowser = false;
    },
    resetNewContent: (state) => {
      state.newSlide = false;
      state.newLesson = false;
      state.newModule = false;
    },
    openPromptProjectName: (state) => {
      state.isOpenPromptProjectName = true;
    },
    closePromptProjectName: (state) => {
      state.isOpenPromptProjectName = false;
    },
    openPublishProgress: (state) => {
      state.isOpenPublishProgress = true;
    },
    closePublishProgress: (state) => {
      state.isOpenPublishProgress = false;
    },
  },
  extraReducers: {
    [Projects.state.addOutlineItem.type]: (state, action) => {
      switch (action.payload.type) {
        case 'slide':
          state.newSlide = true;
          break;
        case 'lesson':
          state.newSlide = true;
          state.newLesson = true;
          break;
        case 'module':
          state.newSlide = true;
          state.newLesson = true;
          state.newModule = true;
          break;
      }
    },
  },
};

export const slice = createSlice(config);

export const {
  setData,
  resetData,
  setContentFocus,
  resetContentFocus,
  openTemplateBrowser,
  closeTemplateBrowser,
  resetNewContent,
  openPromptProjectName,
  closePromptProjectName,
  openPublishProgress,
  closePublishProgress
} = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};