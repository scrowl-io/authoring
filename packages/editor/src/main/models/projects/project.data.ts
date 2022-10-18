import { ProjectData } from './projects.types';

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
      {
        moduleIdx: 0,
        lessonIdx: 0,
        name: 'Slide 1'
      }
    ],
  };

  return data;
};

export default {
  createProject,
};
