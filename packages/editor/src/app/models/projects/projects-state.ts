import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
import { updateObj, List } from '../../utils';

export const initialState = {
  isDirty: false, // true if the user has made any change
  isUncommitted: false, // true if the user has any unsaved change
  syncScormName: true,
  isOpenProjectBrowser: false,
  isLoaded: false,
  assets: [],
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
      optimizeMedia: "Recommended",
    },
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
  const copy: Array<{ [key: string]: any }> = List.filterBy(
    list,
    field,
    fromId
  );

  if (!copy.length) {
    return;
  }

  let newId = -1;
  let newName = '';

  copy.forEach(({ name, ...item }) => {
    newId = generateNewId(list);
    newName = name;
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
      updateObj(state, initialState);
    },
    resetIsUncommitted: (state) => {
      state.isUncommitted = false;
    },
    setData: (state, action) => {
      updateObj(state.data, action.payload);

      if (
        action.payload.meta &&
        action.payload.meta.name &&
        action.payload.scorm &&
        action.payload.scorm.name
      ) {
        state.syncScormName =
          action.payload.meta.name === action.payload.scorm.name;
      }

      const isEmptyMeta = state.data.meta.name.length <= 0;
      const isSame = state.data.meta.name === state.data.scorm.name;

      if (!isSame && !isEmptyMeta && state.syncScormName) {
        state.data.scorm.name = state.data.meta.name.slice();
      }

      state.isLoaded = true;
    },
    setMeta: (state, action) => {
      updateObj(state.data.meta, action.payload);

      const isEmptyMeta = state.data.meta.name.length <= 0;
      const isSame = state.data.meta.name === state.data.scorm.name;

      if (!isSame && !isEmptyMeta && state.syncScormName) {
        state.data.scorm.name = state.data.meta.name.slice();
      }

      state.isDirty = true;
      state.isUncommitted = true;
    },
    setScorm: (state, action) => {
      updateObj(state.data.scorm, action.payload);

      const isSame = state.data.meta.name === state.data.scorm.name;

      if (!isSame) {
        state.syncScormName = false;
      }

      state.isDirty = true;
      state.isUncommitted = true;
    },
    removeModule: (state, action) => {
      state.data.modules.splice(action.payload.idx);
      state.isDirty = true;
      state.isUncommitted = true;
    },
    removeLesson: (state, action) => {
      state.data.lessons.splice(action.payload.idx);
      state.isDirty = true;
      state.isUncommitted = true;
    },
    removeSlide: (state, action) => {
      state.data.slides.splice(action.payload.idx);
      state.isDirty = true;
      state.isUncommitted = true;
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
        const addPosition =
          id !== -1
            ? List.indexBy(outlineList, 'id', id) + 1
            : outlineList.length;
        const newItem = {
          ...data,
          name,
          id: newId,
        };
        outlineList.splice(addPosition, 0, newItem);
        return newItem;
      };

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

      state.isDirty = true;
      state.isUncommitted = true;
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
          outlineList[i] = {
            ...outlineList[i],
            ...data,
          };
          break;
        }
      }

      state.isDirty = true;
      state.isUncommitted = true;
    },
    moveOutlineItem: (state, action) => {
      let outlineList;
      let outlineData;
      let movePosition = -1;
      let fromPosition = -1;
      const { type, ...moveFrom } = action.payload.moveFrom;
      const moveTo = action.payload.moveTo;

      const moveSlides = (moduleId, pointer, val) => {
        state.data.slides.forEach((slide) => {
          if (slide[pointer] === val) {
            slide.moduleId = moduleId;
          }
        });
      };

      switch (type) {
        case 'slide':
          outlineList = state.data.slides;
          movePosition =
            moveTo.id === -1
              ? outlineList.length
              : List.indexBy(outlineList, 'id', moveTo.id);
          fromPosition = List.indexBy(outlineList, 'id', moveFrom.id);
          outlineData = {
            ...outlineList.splice(fromPosition, 1)[0],
            moduleId: moveTo.moduleId,
            lessonId: moveTo.lessonId,
          };
          break;
        case 'lesson':
          outlineList = state.data.lessons;
          movePosition =
            moveTo.id === -1
              ? outlineList.length
              : List.indexBy(outlineList, 'id', moveTo.id);
          fromPosition = List.indexBy(outlineList, 'id', moveFrom.id);
          outlineData = {
            ...outlineList.splice(fromPosition, 1)[0],
            moduleId: moveTo.moduleId,
          };

          if (moveTo.moduleId !== moveFrom.moduleId) {
            moveSlides(moveTo.moduleId, 'lessonId', moveFrom.id);
          }
          break;
        case 'module':
          outlineList = state.data.modules;
          movePosition =
            moveTo.id === -1
              ? outlineList.length
              : List.indexBy(outlineList, 'id', moveTo.id);
          fromPosition = List.indexBy(outlineList, 'id', moveFrom.id);
          outlineData = {
            ...outlineList.splice(fromPosition, 1)[0],
          };
          break;
      }

      if (outlineList) {
        outlineList.splice(movePosition, 0, outlineData);
      }

      state.isDirty = true;
      state.isUncommitted = true;
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
          outlineList = state.data.modules;
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
              name: lesson.name,
              id: generateNewId(state.data.lessons),
            };

            const copySlides = List.filterBy(
              state.data.slides,
              'lessonId',
              lesson.id
            );

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

      outlineList.splice(dupPosition, 0, outlineData);

      state.isDirty = true;
      state.isUncommitted = true;
    },
    removeOutlineItem: (state, action) => {
      const { type, ...data } = action.payload;

      switch (type) {
        case 'module':
          state.data.modules = List.filterBy(
            state.data.modules,
            'id',
            data.id,
            'NE'
          );
          state.data.lessons = List.filterBy(
            state.data.lessons,
            'moduleId',
            data.id,
            'NE'
          );
          state.data.slides = List.filterBy(
            state.data.slides,
            'moduleId',
            data.id,
            'NE'
          );
          break;
        case 'lesson':
          state.data.lessons = List.filterBy(
            state.data.lessons,
            'id',
            data.id,
            'NE'
          );
          state.data.slides = List.filterBy(
            state.data.slides,
            'lessonId',
            data.id,
            'NE'
          );
          break;
        case 'slide':
          state.data.slides = List.filterBy(
            state.data.slides,
            'id',
            data.id,
            'NE'
          );
          break;
      }

      state.isDirty = true;
      state.isUncommitted = true;
    },
    addGlossaryItem: (state, action) => {
      const lastIdx = state.data.glossary.length;

      if (lastIdx === 0) {
        action.payload.id = 0;
      } else {
        action.payload.id = state.data.glossary[lastIdx - 1].id + 1;
      }

      state.data.glossary.push(action.payload);

      state.isDirty = true;
      state.isUncommitted = true;
    },
    setGlossaryItem: (state, action) => {
      const glossaryItem = action.payload;
      const idx = List.indexBy(state.data.glossary, 'id', glossaryItem.id);

      if (idx === -1) {
        console.error(
          'unable to update: glossary item not found',
          action.payload
        );
        return;
      }

      state.data.glossary[idx] = glossaryItem;
      state.isDirty = true;
      state.isUncommitted = true;
    },
    removeGlossaryItem: (state, action) => {
      const glossaryItem = action.payload;
      const idx = List.indexBy(state.data.glossary, 'id', glossaryItem.id);

      if (idx === -1) {
        console.error(
          'unable to remove: glossary item not found',
          action.payload
        );
        return;
      }

      state.data.glossary.splice(idx, 1);
      state.isDirty = true;
      state.isUncommitted = true;
    },
    addResourceItem: (state, action) => {
      state.data.resources.push(action.payload);

      state.isDirty = true;
      state.isUncommitted = true;
    },
    setResourceItem: (state, action) => {
      const { isNew, ...resourceItem } = action.payload;
      const idx = List.indexBy(
        state.data.resources,
        'filename',
        resourceItem.filename
      );

      if (idx === -1) {
        console.error('unable to update: resource not found', action.payload);
        return;
      }

      state.data.resources[idx] = resourceItem;
    },
    removeResourceItem: (state, action) => {
      const resourceItem = action.payload;
      const idx = List.indexBy(
        state.data.resources,
        'filename',
        resourceItem.filename
      );

      if (idx === -1) {
        console.error('unable to remove: resource not found', action.payload);
        return;
      }

      state.data.resources.splice(idx, 1);
      state.isDirty = true;
      state.isUncommitted = true;
    },
    setAssets: (state, action) => {
      state.assets = action.payload || [];
    },
    addAssetItem: (state, action) => {
      state.assets.push(action.payload);

      state.isDirty = true;
      state.isUncommitted = true;
    },
    setAssetItem: (state, action) => {
      const { isNew, ...assetItem } = action.payload;
      const idx = List.indexBy(state.assets, 'filename', assetItem.filename);

      if (idx === -1) {
        console.error('unable to update: asset not found', action.payload);
        return;
      }

      state.assets[idx] = assetItem;
      state.isDirty = true;
      state.isUncommitted = true;
    },
    removeAssetItem: (state, action) => {
      const assetItem = action.payload;
      const idx = List.indexBy(state.assets, 'filename', assetItem.filename);

      if (idx === -1) {
        console.error('unable to remove: asset not found', action.payload);
        return;
      }

      state.assets[idx].isDeleted = true;
      state.isDirty = true;
      state.isUncommitted = true;
    },
    openProjectBrowser: (state) => {
      state.isOpenProjectBrowser = true;
    },
    closeProjectBrowser: (state) => {
      state.isOpenProjectBrowser = false;
    },
  },
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
  setAssets,
  addAssetItem,
  setAssetItem,
  removeAssetItem,
  resetIsUncommitted,
  openProjectBrowser,
  closeProjectBrowser
} = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};
