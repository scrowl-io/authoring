import { Schema } from '../../db';
import { table as folderTable } from '../project-folders';

export const table: string = 'projects';

export const schema: Schema = [
  {
    column: {
      name: 'id',
      type: 'uuid',
    }
  },
  {
    column: {
      name: 'created_at',
      type: 'datetime',
    }
  },
  {
    column: {
      name: 'deleted_at',
      type: 'datetime',
    }
  },
  {
    column: {
      name: 'folder_id',
      type: 'foreign',
      table: folderTable,
    }
  },
  {
    column: {
      name: 'meta',
      type: 'json',
    }
  },
  {
    column: {
      name: 'scorm',
      type: 'json',
    }
  },
  {
    column: {
      name: 'modules',
      type: 'json',
    }
  },
  {
    column: {
      name: 'lessons',
      type: 'json',
    }
  },
  {
    column: {
      name: 'slides',
      type: 'json',
    }
  },
  {
    column: {
      name: 'glossary',
      type: 'json',
    }
  },
  {
    column: {
      name: 'resources',
      type: 'json',
    }
  },
];

export default {
  table,
  schema,
};