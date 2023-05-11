import * as create from './create';
import { TemplateSchemas } from './templates';

export const make = () => {
  const project = create.project();

  project.type = 'assessment';
  project.meta.name = 'Untitled Assessment';

  project.modules?.push({
    id: 0,
    name: 'Assessment',
    passingThreshold: 75,
  });
  project.lessons?.push({
    moduleId: 0,
    id: 0,
    name: 'Assessment',
  });
  project.slides?.push(
    create.slide<TemplateSchemas['lessonIntro']>(
      'Introduction',
      0,
      0,
      0,
      'lessonIntro'
    )
  );
  project.slides?.push(
    create.slide<TemplateSchemas['quiz']>('First Question', 0, 0, 1, 'quiz')
  );
  project.slides?.push(
    create.slide<TemplateSchemas['lessonOutro']>(
      'Results',
      0,
      0,
      2,
      'lessonOutro'
    )
  );

  return project;
};

export default {
  make,
};
