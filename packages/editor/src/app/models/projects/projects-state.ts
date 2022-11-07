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

const generateNewId = (list) => {
  const lastIdx = list.length - 1;

  return list.slice().sort((a, b) => {
      const valA = a.id;
      const valB = b.id;

      if (valA === valB) {
        return 0;
      }

      return valA < valB ? -1 : 1;
  })[lastIdx].id + 1;
}

const copyListItems = (list, field, fromId, toId) => {
  const copy: Array<{[key: string]: any}> = List.filterBy(list, field, fromId);

  if (!copy.length) {
    return;
  }

  let newId = -1;
  let newName = '';

  copy.forEach(({ name, ...item }) => {
    newId = generateNewId(list);
    newName = `${name} copy`;
    const itemCopy = {
      ...item,
      name: newName,
      id: newId,
    };

    itemCopy[field] = toId;
    list.push(itemCopy);
  });
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
      const createItem = (payload) => {
        let outlineList;
        let name;
        const { type, id, ...data } = payload;

        switch (type) {
          case 'module':
            name = 'Untitled Module';
            outlineList = state.data.modules;
            break;
          case 'lesson':
            name = 'Untitled Lesson';
            outlineList = state.data.lessons;
            break;
          case 'slide':
            name = 'Untitled Slide';
            outlineList = state.data.slides;
            break;
        }

        const newId = generateNewId(outlineList);
        const addPosition = id !== -1 ? (List.indexBy(outlineList, 'id', id) + 1) : outlineList.length;
        const newItem = {
          ...data,
          name,
          id: newId,
        };

        outlineList.splice(addPosition , 0, newItem);
        return newItem;
      }

      let newSlide;
      let newLesson;

      switch (action.payload.type) {
        case 'slide':
          newSlide = createItem(action.payload);
          break;
        case 'lesson':
          newLesson = createItem(action.payload);
          newSlide = createItem({
            type: 'slide',
            id: -1,
            lessonId: newLesson.id,
            moduleId: newLesson.moduleId,
          });
          break;
        case 'module':
          const newModule = createItem(action.payload);

          newLesson = createItem({
            type: 'lesson',
            id: -1,
            moduleId: newModule.id,
          });
          newSlide = createItem({
            type: 'slide',
            id: -1,
            lessonId: newLesson.id,
            moduleId: newLesson.moduleId,
          });
          break;
      }
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
        case 'lesson':
          outlineList = state.data.lessons;
          movePosition = List.indexBy(outlineList, 'id', moveTo.id);
          fromPosition = List.indexBy(outlineList, 'id', moveFrom.id);
          outlineData = {
            ...outlineList.splice(fromPosition, 1)[0],
            moduleId: moveTo.moduleId,
          };

          if (moveTo.moduleId !== moveFrom.moduleId) {
            state.data.slides.forEach((slide) => {
              if (slide.lessonId === moveFrom.id) {
                slide.moduleId = moveTo.moduleId;
              }
            });
          }
          break;
      }

      outlineList.splice(movePosition, 0, outlineData);
    },
    duplicateOutlineItem: (state, action) => {
      let outlineList;
      let outlineData;
      let dupPosition = -1;
      let newId = -1;
      const { type, id, ...data } = action.payload;
      const name = data.name + ' copy';

      switch (type) {
        case 'slide':
          outlineList = state.data.slides;
          break;
        case 'lesson':
          outlineList = state.data.lessons;
          break;
        case 'module':
          outlineList = state.data.modules
          break;
      }

      dupPosition = List.indexBy(outlineList, 'id', id) + 1;
      newId = generateNewId(outlineList);

      outlineData = {
        ...data,
        name,
        id: newId,
      };

      switch (type) {
        case 'lesson':
          copyListItems(state.data.slides, 'lessonId', id, newId);
          break;
        case 'module':
          const copyLessons = List.filterBy(state.data.lessons, 'moduleId', id);
          
          copyLessons.forEach((lesson: { [key: string]: any }) => {
            const lessonData = {
              ...lesson,
              moduleId: newId,
              name: `${lesson.name} copy`,
              id: generateNewId(state.data.lessons),
            };

            const copySlides = List.filterBy(state.data.slides, 'lessonId', lesson.id);
            
            copySlides.forEach((slide: { [key: string]: any }) => {
              const slideData = {
                ...slide,
                moduleId: newId,
                lessonId: lessonData.id,
                name: `${slide.name} copy`,
                id: generateNewId(state.data.slides),
              };

              state.data.slides.push(slideData);
            });

            state.data.lessons.push(lessonData);
          });
          break;
      }

      outlineList.splice(dupPosition, 0, outlineData)
    },
    removeOutlineItem: (state, action) => {
      const { type, ...data } = action.payload;

      switch (type) {
        case 'module':
          state.data.modules = List.filterBy(state.data.modules, 'id', data.id, 'NE');
          state.data.lessons = List.filterBy(state.data.lessons, 'moduleId', data.id, 'NE');
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
  duplicateOutlineItem,
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
