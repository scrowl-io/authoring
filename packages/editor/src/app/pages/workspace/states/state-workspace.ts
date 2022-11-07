import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../../services'
import { updateObj } from '../../../utils';
import { Projects } from '../../../models';

export const initialState = {
  isOpenGlossaryEditor: false,
  isOpenAssetBrowser: false,
  isOpenTemplateBrowser: false,
  contentFocus: null,
  newSlide: false,
};

export const config: stateManager.StateConfig = {
  name: 'workspace',
  initialState,
  reducers: {
    setData: (state, action) => {
      updateObj(state, action.payload);
    },
    resetData: (state) => {
      state = initialState;
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
    resetNewSlide: (state) => {
      state.newSlide = false;
    },
  },
  extraReducers: {
    [Projects.state.addOutlineItem.type]: (state) => {
      state.newSlide = true;
    },
  },
};

export const slice = createSlice(config);

export const { setData, resetData, setContentFocus, resetContentFocus, openTemplateBrowser, closeTemplateBrowser, resetNewSlide } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};