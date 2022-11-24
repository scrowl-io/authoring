import * as create from './create';

export const make = () => {
  const project = create.project();

  project.modules?.push({
    id: 0,
    name: 'Introduction',
  });
  project.lessons?.push({
    moduleId: 0,
    id: 0,
    name: 'Introduction',
  });
  project.slides?.push(create.slide('Introduction', 0, 0, 0, 'lessonIntro'));

  return project;
};

export default {
  make,
};
