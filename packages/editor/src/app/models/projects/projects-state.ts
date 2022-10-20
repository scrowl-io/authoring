import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
import { updateObj } from '../../utils';

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
      state.data = action.payload;
    },
    setMeta: (state, action) => {
      updateObj(state.data.meta, action.payload);
    },
    setScorm: (state, action) => {
      updateObj(state.data.scorm, action.payload);
    },
    addModule: (state, action) => {
      state.data.modules.push(action.payload);
    },
    setModule: (state, action) => {
      const modules = state.data.modules;
      const { moduleIdx, ...data } = action.payload;

      if (moduleIdx === null || moduleIdx === undefined || !modules[moduleIdx]) {
        return;
      }

      updateObj(modules[moduleIdx], data);
    },
    moveModule: (state, action) => {
      
    },
    removeModule: (state, action) => {
      state.data.modules.splice(action.payload.idx);
    },
    addLesson: (state, action) => {
      state.data.lessons.push(action.payload);
    },
    setLesson: (state, action) => {
      const lessons = state.data.lessons;
      const { lessonIdx, ...data } = action.payload;

      if (lessonIdx === null || lessonIdx === undefined || !lessons[lessonIdx]) {
        return;
      }

      updateObj(lessons[lessonIdx], data);
    },
    moveLesson: (state, action) => {
      
    },
    removeLesson: (state, action) => {
      state.data.lessons.splice(action.payload.idx);
    },
    addSlide: (state, action) => {
      state.data.slides.push(action.payload);
    },
    setSlide: (state, action) => {
      const slides = state.data.slides;
      const { slideIdx, ...data } = action.payload;

      if (slideIdx === null || slideIdx === undefined || !slides[slideIdx]) {
        return;
      }

      updateObj(slides[slideIdx], data);
    },
    moveSlide: (state, action) => {
      
    },
    removeSlide: (state, action) => {
      state.data.slides.splice(action.payload.idx);
    },
    addGlossaryItem: (state, action) => {
      state.data.glossary.push(action.payload);
    },
    setGlossaryItem: (state, action) => {
      
    },
    removeGlossaryItem: (state, action) => {
      state.data.glossary.splice(action.payload.idx);
    },
    addResourceItem: (state, action) => {
      state.data.resources.push(action.payload);
    },
    setResourceItem: (state, action) => {
      
    },
    removeResourceItem: (state, action) => {
      state.data.resources.splice(action.payload.idx);
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
  setModule,
  moveModule,
  removeModule,
  addLesson,
  setLesson,
  moveLesson,
  removeLesson,
  addSlide,
  setSlide,
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
