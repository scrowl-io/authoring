import { Schema } from '../../db';
import { table as projectTable } from '../projects';

export const table: string = 'assets';

export const schema: Schema = [
  {
    column: {
      name: 'id',
      type: 'uuid',
    }
  },
  {
    column: {
      name: 'project_id',
      type: 'foreign',
      table: projectTable,
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
      name: 'title',
      type: 'string',
    }
  },
  {
    column: {
      name: 'filename',
      type: 'string',
    }
  },
  {
    column: {
      name: 'ext',
      type: 'string',
    }
  },
  {
    column: {
      name: 'type',
      type: 'string',
    }
  },
  {
    column: {
      name: 'size',
      type: 'integer',
    }
  },
  {
    column: {
      name: 'isDeleted',
      type: 'boolean',
    }
  },
  {
    column: {
      name: 'sourceExt',
      type: 'string',
    }
  },
  {
    column: {
      name: 'sourceFilename',
      type: 'string',
    }
  },
];

export default {
  table,
  schema,
};