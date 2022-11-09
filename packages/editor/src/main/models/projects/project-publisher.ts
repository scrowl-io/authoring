import packager from 'simple-scorm-packager';
import { ProjectData } from './projects.types';
import {
  TemplateInfo,
  TemplateCopyResult,
} from './project-publisher.types';
import { Templates } from '../';
import { rq, fs, tmpr } from '../../services';
import { dt } from '../../utils';

export const scorm = (project: ProjectData, pubDest: string) => {
  return new Promise<rq.ApiResult>((resolve) => {
    resolve({
      error: false,
      data: {
        project,
        dest: pubDest,
      },
    });
  });
};

export default {
  scorm,
};
