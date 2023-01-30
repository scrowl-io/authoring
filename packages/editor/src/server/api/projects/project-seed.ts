import { db, utils } from '../../db';
import { table, schema } from './project-schema';

export const seed = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const connection = db.get();

      await utils.table.drop(connection, table);
      await utils.table.create(connection, table, schema, db.config);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  seed,
};