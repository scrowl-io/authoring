import { TemplateRecord } from '../templates';

interface PathingFiles {
  template: {
    source: string;
    dest: string;
  };
}

export type PathingFileKey = keyof PathingFiles;

interface PathingDirs {
  source: string;
  out: string;
}

export type PathingDirKey = keyof PathingDirs;

export interface PathingProps {
  files: PathingFiles;
  dirs: PathingDirs;
}

export type TemplateData = {
  [key: string]: string | number | TemplateData | Array<TemplateData>;
};

export interface TemplateInfo extends TemplateRecord {
  pathname: string;
}

export type TemplateCopyResult = {
  templates: Array<TemplateInfo>;
  to: string;
};
