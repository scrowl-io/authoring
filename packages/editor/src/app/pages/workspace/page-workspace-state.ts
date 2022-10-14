import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../services'

export const initialState = {
  isOpenGlossaryEditor: false,
};

export const config: stateManager.StateConfig = {
  name: 'workspace',
  initialState,
  reducers: {
    setGlossaryEditor: (state, action) => {
      state.isOpenGlossaryEditor = action.payload;
    },
  },
};

export const slice = createSlice(config);

export const { setGlossaryEditor } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};