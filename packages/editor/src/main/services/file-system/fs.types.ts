import {
  FileFilter,
} from 'electron';
import { rq } from '..';
import {
  ApiResultSuccess,
  ApiResultError,
  JsonResult,
} from '../requester';

export { Dirent } from 'fs-extra';

export type {
  MessageBoxOptions as SystemMessageDialogOptions,
  SaveDialogOptions as SystemSaveDialogOptions,
  OpenDialogOptions as SystemOpenDialogOptions
} from 'electron';

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

export interface FSApiMessage extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/system/message';
}

export interface FSApiSave extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/system/save';
}

export interface FSApiOpen extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/system/open';
}

export type FSApi = Partial<{
  message: FSApiMessage;
  save: FSApiSave;
  open: FSApiOpen;
}>;

export type FSEndpoints = {
  message: FSApiMessage['name'];
  save: FSApiSave['name'];
  open: FSApiOpen['name'];
};
