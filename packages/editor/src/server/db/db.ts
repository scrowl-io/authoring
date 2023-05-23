import * as dotenv from 'dotenv';
dotenv.config();

import { knex } from 'knex';
import { Config } from './db.types';

export const config: Config = {
  name: process.env.DBNAME || '',
  port: process.env.DBPORT || '',
  host: process.env.DBHOST || '',
  user: process.env.DBUSER || '',
  pass: process.env.DBPASS || '',
  schema: process.env.DBSCHEMA || '',
};

export const get = () => {
  return knex({
    client: 'postgress',
    connection: {
      host: config.host,
      user: config.user,
      password: config.pass,
      database: config.name,
    },
  });
};

export default {
  config,
  get,
};