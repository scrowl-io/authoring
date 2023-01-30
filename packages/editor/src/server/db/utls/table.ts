import { Knex } from 'knex';
import { Schema, Config } from '../db.types';
import { list } from '../../utils';

export const drop = (
  db: Knex,
  table: string,
) => {
  console.log(`dropping table ${table}`);
  return db.schema.dropTableIfExists(table);
};

const uuid = (
  db: Knex,
  table: Knex.TableBuilder,
  col = 'id'
) => {
  switch (col) {
    case 'id':
      table.uuid(col)
        .primary()
        .notNullable()
        .unique()
        .defaultTo(db.raw('uuid_generate_v4()'));
      break;
    default:
      table.uuid(col)
        .notNullable()
        .unique()
        .defaultTo(db.raw('uuid_generate_v4()'));
      break;
  }
};

const foreignKey = (
  table: Knex.TableBuilder,
  opts: {
    col: string,
    table: string,
  }
) => {
  console.log(`creating foreign key ${opts.col} for ${opts.table}`);
  table.foreign(opts.col).references(`${opts.table}.id`);
};

export const create = (
  db: Knex,
  table: string,
  schema: Schema,
  config: Config
) => {
  return db
    .schema
    .withSchema(config.schema)
    .createTable(table, (data: Knex.TableBuilder) => {
      const colCnt = schema.length;
      let i: number = 0;
      let col = '';

      while (i < colCnt) {
        col = schema[i].column.name;

        switch (schema[i].column.type) {
          case 'uuid':
            uuid(db, data, col);
            break;
          case 'string':
            data.string(col);
            break;
          case 'integer':
            data.integer(col);
            break;
          case 'decimal':
            data.decimal(col);
            break;
          case 'foreign':
            data.uuid(col);
            foreignKey(data, {
              col,
              table: schema[i].column.table || '',
            });
            break;
          case 'datetime':
            data.datetime(col).defaultTo(db.fn.now());
            break;
          case 'json':
            data.json(col);
            break;
          case 'boolean':
            data.boolean(col);
            break;
        }

        i++;
      }
    });
};

export const insert = (
  db: Knex,
  table: string,
  data: Array<{}>
) => {
  const addEntry = (entry) => {
    console.log(`inserting entry into ${table} \n`, JSON.stringify(entry, null, 2));
    return db(table).returning('id').insert(entry);
  };

  return list.asyncForEach(data, addEntry);
};

export default {
  drop,
  create,
  insert,
};