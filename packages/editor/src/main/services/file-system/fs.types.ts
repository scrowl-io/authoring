import {
  FileFilter,
  OpenDialogReturnValue,
  SaveDialogReturnValue,
} from 'electron';
import {
  ApiResultSuccess,
  ApiResultError,
  ApiResult,
  JsonResult,
} from '../requester';

export { Dirent } from 'fs-extra';

export interface FileFilters {
  [key: string]: FileFilter;
}

export type AllowedFiles = 'image' | 'video' | 'scrowl';

export interface DirectoryTempResultSuccess
  extends Omit<ApiResultSuccess, 'data'> {
  data: {
    pathname: string;
  };
}

export type DirectoryTempResult = DirectoryTempResultSuccess | ApiResultError;

export interface FileExistsResultSuccess
  extends Omit<ApiResultSuccess, 'data'> {
  data: {
    exists: boolean;
  };
}

export type FileExistsResult = FileExistsResultSuccess | ApiResultError;

export interface FileDataResultSuccess extends Omit<ApiResultSuccess, 'data'> {
  data: {
    filename: string;
    contents?: string | JsonResult;
  };
}

export type FileDataResult = FileDataResultSuccess | ApiResultError;

export interface FileFromDirData {
  projectName?: string;
  fileLocation: string;
  modifiedAt: Date;
  createdAt: Date;
}
export interface FileFromDirDataResultSuccess
  extends Omit<ApiResultSuccess, 'data'> {
  data: {
    files: FileFromDirData[];
  };
}

export type FileFromDirDataResult =
  | FileFromDirDataResultSuccess
  | ApiResultError;

export interface DialogSaveResultSuccess
  extends Omit<ApiResultSuccess, 'data'> {
  data: SaveDialogReturnValue;
}

export type DialogSaveResult = DialogSaveResultSuccess | ApiResultError;

export interface DialogOpenResultSuccess
  extends Omit<ApiResultSuccess, 'data'> {
  data: OpenDialogReturnValue;
}

export type DialogOpenResult = DialogOpenResultSuccess | ApiResultError;

export type FSResult = ApiResult;
