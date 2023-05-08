
import { PlayerTemplateList, ProjectModule, ProjectLesson, ProjectSlide } from '../../root';

export interface PageCommons {
  slides: Array<ProjectSlide>;
  templates: PlayerTemplateList;
  slideId?: string;
  lesson: ProjectLesson;
  passingThreshold: number;
};

export type PageProps = PageCommons & React.HTMLAttributes<HTMLDivElement>;

export interface PageDefinition {
  module: ProjectModule,
  lesson: ProjectLesson,
  url: string;
  Element: () => JSX.Element;
};