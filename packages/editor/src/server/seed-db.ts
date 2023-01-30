import { db } from './db';
import {
  projectFolders,
  projects,
  assets
} from './api/entities';

export const generate = async () => {
  try {
    console.log('connecting to db');
    const connection = db.get();
    console.log('connected');

    console.log('adding uuid support');
    await connection.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    console.log('seeding project folders');
    await projectFolders.seed();
    console.log('seeding projects');
    await projects.seed();
    console.log('seeding assets');
    await assets.seed();
    console.log('finished');
    process.exit(0);
  } catch (e) {
    console.log('unexpected error occurred while seeding db');
    console.error(e);
    process.exit(1);
  }
};