import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
import { updateObj, List } from '../../utils';

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
    removeModule: (state, action) => {
      state.data.modules.splice(action.payload.idx);
    },
    removeLesson: (state, action) => {
      state.data.lessons.splice(action.payload.idx);
    },
    removeSlide: (state, action) => {
      state.data.slides.splice(action.payload.idx);
    },
    addOutlineItem: (state, action) => {
      let outlineList;
      let lastIdx = -1;
      let id = 0;
      const { type, ...data } = action.payload;

      switch (type) {
        case 'module':
          outlineList = state.data.modules;
          break;
        case 'lesson':
          outlineList = state.data.lessons;
          break;
        case 'slide':
          outlineList = state.data.slides;
          break;
      }

      lastIdx = outlineList.length - 1;

      if (lastIdx !== -1) {
        id = outlineList[lastIdx].id + 1;
      }

      outlineList.push({
        ...data,
        id,
      });
    },
    setOutlineItem: (state, action) => {
      let outlineList;
      let listLn = -1;
      const { type, id, ...data } = action.payload;

      switch (type) {
        case 'module':
          outlineList = state.data.modules;
          break;
        case 'lesson':
          outlineList = state.data.lessons;
          break;
        case 'slide':
          outlineList = state.data.slides;
          break;
      }

      listLn = outlineList.length;

      for (let i = 0; i < listLn; i++) {
        if (id === outlineList[i].id) {
          updateObj(outlineList[i], data);
          break;
        }
      }
    },
    moveOutlineItem: (state, action) => {
      let outlineList;
      let outlineData;
      let movePosition = -1;
      let fromPosition = -1;
      const { type, ...moveFrom } = action.payload.moveFrom;
      const moveTo = action.payload.moveTo;

      switch (type) {
        case 'slide':
          outlineList = state.data.slides;
          movePosition = List.indexBy(outlineList, 'id', moveTo.id);
          fromPosition = List.indexBy(outlineList, 'id', moveFrom.id);
          outlineData = {
            ...outlineList.splice(fromPosition, 1)[0],
            moduleId: moveTo.moduleId,
            lessonId: moveTo.lessonId,
          };
          break;
      }

      outlineList.splice(movePosition, 0, outlineData);
    },
    removeOutlineItem: (state, action) => {
      const { type, ...data } = action.payload;

      switch (type) {
        case 'module':
          state.data.modules = List.filterBy(state.data.modules, 'id', data.id, 'NE');
          state.data.lessons = List.filterBy(state.data.lessons, 'moduleid', data.id, 'NE');
          state.data.slides = List.filterBy(state.data.slides, 'moduleId', data.id, 'NE');
          break;
        case 'lesson':
          state.data.lessons = List.filterBy(state.data.lessons, 'id', data.id, 'NE');
          state.data.slides = List.filterBy(state.data.slides, 'lessonId', data.id, 'NE');
          break;
        case 'slide':
          state.data.slides = List.filterBy(state.data.slides, 'id', data.id, 'NE');
          break;
      }
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
  addOutlineItem,
  setOutlineItem,
  moveOutlineItem,
  removeOutlineItem,
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
