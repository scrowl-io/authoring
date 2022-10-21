import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../../services'
import { updateObj } from '../../../utils';

export const initialState = {
  isOpenGlossaryEditor: false,
  isOpenAssetBrowser: false,
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
    }
  },
};

export const slice = createSlice(config);

export const { setData, resetData } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};