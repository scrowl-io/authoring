import { ProjectData, ProjectAsset } from '../../../main/models/projects/projects.types';

export type {
  ProjectsEndpoints,
  ProjectData,
  ProjectMeta,
  ProjectScorm,
  ProjectAsset,
  ProjectResource,
  ProjectGlossaryItem,
  ProjectModule,
  ProjectLesson,
  ProjectSlide,
  ProjectsReqUpload,
  ProjectsReqSave,
  ProjectsReqPreviewAsset,
  ProjectFile,
  ProjectsReqPreviewProject
} from '../../../main/models/projects/projects.types';

export type { AssetType } from '../../../main/services/file-system/fs.types';

export type { WindowEndpoints } from '../../../main/window/window.types';

export type UnsavedReq = {
  status: {
    isDirty: boolean,
    isUncommitted: boolean,
    isLoaded: boolean,
    isNew: boolean,
  };
  project: {
    data: ProjectData;
    assets: Array<ProjectAsset>;
  };
};
