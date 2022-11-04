import { ProjectData } from './projects.types';
import { TemplateSchema } from '../templates/templates.types';
import { BlockTextSchema } from '@scrowl/template-block-text/schema';

const TEMPLATES = {
  blockText: JSON.stringify(BlockTextSchema),
};

const createSlide = (name: string, mIdx: number, lIdx: number, type: keyof typeof TEMPLATES) => {
  const template: TemplateSchema = JSON.parse(TEMPLATES[type]);

  return {
    name,
    moduleIdx: mIdx,
    lessonIdx: lIdx,
    template,
    notes: '',
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
      createSlide('Slide 1', 0, 0, 'blockText'),
      createSlide('Slide 2', 0, 0, 'blockText'),
      createSlide('Slide 3', 0, 0, 'blockText'),
    ],
    glossary: [
      { id: 0, word: 'Test', definition: 'Definition text' }
    ],
    resources: [],
    assets: [],
  };

  return data;
};

export default {
  createProject,
};
