import { ProjectData } from './projects.types';
import { TemplateSchema } from '../templates/templates.types';
import { BlockTextSchema } from '@scrowl/template-block-text/schema';

const TEMPLATES = {
  blockText: JSON.stringify(BlockTextSchema),
};

const createSlide = (name: string, mId: number, lId: number, id: number, type: keyof typeof TEMPLATES) => {
  const template: TemplateSchema = JSON.parse(TEMPLATES[type]);

  return {
    name,
    moduleId: mId,
    lessonId: lId,
    id: id,
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
        id: 0,
        name: 'Module 1'
      }
    ],
    lessons: [
      {
        moduleId: 0,
        id: 0,
        name: 'Lesson 1'
      }
    ],
    slides: [
      createSlide('Slide 1', 0, 0, 0, 'blockText'),
    ],
    glossary: [],
    resources: [],
    assets: [],
  };

  return data;
};

export default {
  createProject,
};
