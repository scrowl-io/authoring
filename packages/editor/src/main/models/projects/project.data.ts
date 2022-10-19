import { ProjectData } from './projects.types';
import { TemplateManifest } from '../templates/templates.types';

const TEMPLATES = {
  blockText: {
    meta: {
      name: 'Block Text',
      filename: 'template-block-text',
      component: 'BlockText',
    },
    elements: {},
  },
  introduction: {
    meta: {
      name: 'Introduction',
      filename: 'template-introduction',
      component: 'Introduction',
    },
    elements: {},
  },
  lottie: {
    meta: {
      name: 'Lottie',
      filename: 'template-lottie',
      component: 'Lottie',
    },
    elements: {},
  },
  simpleText: {
    meta: {
      name: 'Simple Text',
      filename: 'template-simple-text',
      component: 'Simple Text',
    },
    elements: {},
  },
};

const createSlide = (name: string, mIdx: number, lIdx: number, type: keyof typeof TEMPLATES) => {
  const template: TemplateManifest = TEMPLATES[type];

  return {
    meta: {
      name,
      moduleIdx: mIdx,
      lessonIdx: lIdx,
    },
    template,
  };
}

export const createProject = () => {
  const data: ProjectData = {
    meta: {
      id: "",
      name: "",
      blueprint: "",
      version: 0,
      createdBy: "",
      folder: "",
      tags: [],
      scrowlVer: "",
      dateCreated: "",
      lastSaved: "",
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
    modules: [
      {
        name: 'Module 1'
      }
    ],
    lessons: [
      {
        moduleIdx: 0,
        name: 'Lesson 1'
      }
    ],
    slides: [
      createSlide('Slide 1', 0, 0, 'introduction'),
      createSlide('Slide 2', 0, 0, 'blockText'),
      createSlide('Slide 3', 0, 0, 'blockText'),
    ],
  };

  return data;
};

export default {
  createProject,
};
