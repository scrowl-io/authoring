import { Schema } from '../../db';

export const table: string = 'projects-folder';

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
      name: 'opened_at',
      type: 'datetime',
    }
  },
  {
    column: {
      name: 'updated_at',
      type: 'datetime',
    }
  },
  {
    column: {
      name: 'assets',
      type: 'json',
    }
  },
  {
    column: {
      name: 'versions',
      type: 'json',
    }
  },
  {
    column: {
      name: 'last_published_filename',
      type: 'string',
    }
  },
];

export default {
  table,
  schema,
};