import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../services';

export const initialState = {
  data: {
    meta: {
      id: null,
      name: "",
      blueprint: "",
      version: 0,
      createdBy: "",
      folder: "",
      tags: [],
      scrowlVer: "",
      dateCreated: 0,
      lastSaved: 0,
    },
    scorm: {
      name: "",
      description: "",
      authors: "",
      organization: "",
      reportStatus: "Passed/Incomplete",
      lmsIdentifier: "",
      outputFormat: "SCORM 2004",
      optomizeMedia: "Recommended",
    },
    assets: [],
    modules: [],
    lessons: [],
    slides: [],
    glossary: [],
    resources: []
  },
};

export const config: stateManager.StateConfig = {
  name: 'projects',
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState
    },
    setData: (state, action) => {
      state.data = Object.assign(state.data, action.payload);
    },
    setMeta: (state, action) => {
      state.data.meta = Object.assign(state.data.meta, action.payload);
    },
    setScorm: (state, action) => {
      state.data.scorm = Object.assign(state.data.scorm, action.payload);
    },
    addModule: (state, action) => {
      
    },
    setModuleName: (state, action) => {
      
    },
    moveModule: (state, action) => {
      
    },
    removeModule: (state, action) => {
      
    },
    addLesson: (state, action) => {
      
    },
    setLessonName: (state, action) => {
      
    },
    moveLesson: (state, action) => {
      
    },
    removeLesson: (state, action) => {
      
    },
    addSlide: (state, action) => {
      
    },
    setSlideName: (state, action) => {
      
    },
    moveSlide: (state, action) => {
      
    },
    removeSlide: (state, action) => {
      
    },
    addGlossaryItem: (state, action) => {

    },
    setGlossaryItem: (state, action) => {
      
    },
    removeGlossaryItem: (state, action) => {
      
    },
    addResourceItem: (state, action) => {

    },
    setResourceItem: (state, action) => {
      
    },
    removeResourceItem: (state, action) => {
      
    },
  }
};

export const slice = createSlice(config);

export const {
  resetState,
  setData,
  setMeta,
  setScorm,
  addModule,
  setModuleName,
  moveModule,
  removeModule,
  addLesson,
  setLessonName,
  moveLesson,
  removeLesson,
  addSlide,
  setSlideName,
  moveSlide,
  removeSlide,
  addGlossaryItem,
  setGlossaryItem,
  removeGlossaryItem,
  addResourceItem,
  setResourceItem,
  removeResourceItem,
} = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};
