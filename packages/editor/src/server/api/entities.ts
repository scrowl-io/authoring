import * as ProjectFolders from './project-folders';
import * as Projects from './projects';
import * as Assets from './assets';

export * from './projects/projects.types';

export const projectFolders = {
  schema: ProjectFolders.schema,
  seed: ProjectFolders.seed,
};

export const projects = {
  schema: Projects.schema,
  seed: Projects.seed,
};

export const assets = {
  schema: Assets.schema,
  seed: Assets.seed,
};

export default {
  projectFolders,
  projects,
  assets,
};