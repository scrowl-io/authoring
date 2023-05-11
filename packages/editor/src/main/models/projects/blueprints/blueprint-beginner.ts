import * as create from './create';
import { TemplateSchemas } from './templates';

export const make = () => {
  const project = create.project();

  project.modules = [];
  project.lessons = [];
  project.slides = [];

  project.modules.push({
    id: 0,
    name: 'Introduction',
    passingThreshold: 75,
  });
  project.lessons.push({
    moduleId: 0,
    id: 0,
    name: 'Introduction',
  });
  project.slides.push(create.slide<TemplateSchemas['lessonIntro']>('Introduction', 0, 0, 0, 'lessonIntro'));

  const getStarted = create.slide<TemplateSchemas['simpleText']>(`Let's Get Started`, 0, 0, 1, 'simpleText');
  const loveDogs = create.slide<TemplateSchemas['simpleText']>(`We Love Dogs`, 0, 0, 2, 'simpleText');
  const goodLuck = create.slide<TemplateSchemas['simpleText']>(`Good Luck`, 0, 0, 3, 'simpleText');

  getStarted.template.content.text.value = `# Let's Get It Started In Here\n\nWe're *so* excited to see what you build with Scrowl! We believe in universal design, and information being accessibile to everyone.\n\n---\n\n*\"Scrowl has changed the way I design and build new courses. Everyone loves them, my boss thinks I'm a genius, and she can't wait to give me a raise 💰.\"*\n>  🤓 *Janet A.*\n\n‍\n*\"I can't believe this software is free! Let me send you a sandwich as a thank you!\"*\n>  🥪 *Peter T.*`;
  getStarted.template.content.options.content.alignment.value = 'center';
  getStarted.template.content.bgImage.content.url.value = 'abstract-shapes.jpg';
  getStarted.template.content.bgImage.content.url.displayValue = 'abstract-shapes.jpg';

  loveDogs.template.content.text.value = `# 🦉➕ 🐶\n‍\n#### 👇\n‍\n## ♥️♥️♥️`;
  loveDogs.template.content.options.content.alignment.value = 'center';
  loveDogs.template.content.bgImage.content.url.value = 'clouds.jpg';
  loveDogs.template.content.bgImage.content.url.displayValue = 'clouds.jpg';

  goodLuck.template.content.text.value = `# Good Luck & See You Later`;
  goodLuck.template.content.options.content.alignment.value = 'center';

  project.slides.push(
    getStarted,
    loveDogs,
    goodLuck,
  );

  return project;
};

export default {
  make,
};