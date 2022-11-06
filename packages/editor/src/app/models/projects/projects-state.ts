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
    removeSlide: (state, action) => {
      state.data.slides.splice(action.payload.idx);
    },
    moveOutlineItem: (state, action) => {
      let outlineList;
      let outlineData;
      let movePosition = -1;
      const { type, ...moveFrom } = action.payload.moveFrom;
      const moveTo = action.payload.moveTo;

      switch (type) {
        case 'slide':
          outlineList = state.data.slides;
          movePosition = moveTo.slideIdx;
          outlineData = {
            ...outlineList.splice(moveFrom.slideIdx, 1)[0],
            moduleIdx: moveTo.moduleIdx,
            lessonIdx: moveTo.lessonIdx,
          };
          break;
      }

      outlineList.splice(movePosition, 0, outlineData);
    },
    addGlossaryItem: (state, action) => {
      const lastIdx = state.data.glossary.length;

      if (lastIdx === 0) {
        action.payload.id = 0;
      } else {
        action.payload.id = state.data.glossary[(lastIdx - 1)].id + 1;
      }

      state.data.glossary.push(action.payload);
    },
    setGlossaryItem: (state, action) => {
      let lookup;
      const ln = state.data.glossary.length;

      for (let i = 0; i < ln; i++) {
        lookup = state.data.glossary[i];

        if (lookup.id === action.payload.id) {
          state.data.glossary[i] = action.payload;
          break;
        }
      }
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
    addAssetItem: (state, action) => {
      state.data.assets.push(action.payload);
    },
    setAssetItem: (state, action) => {
      
    },
    removeAssetItem: (state, action) => {
      state.data.assets.splice(action.payload.idx);
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
  removeModule,
  addLesson,
  setLesson,
  removeLesson,
  addSlide,
  setSlide,
  removeSlide,
  moveOutlineItem,
  addGlossaryItem,
  setGlossaryItem,
  removeGlossaryItem,
  addResourceItem,
  setResourceItem,
  removeResourceItem,
  addAssetItem,
  setAssetItem,
  removeAssetItem,
} = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};
