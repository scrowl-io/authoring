import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
import routes from './routes';
import { port } from './config';

const app = express();

app.set('json spaces', 2);
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

api.init(app);
routes.init(app);

app.listen(port, () => {
  console.log('db config');
  console.log('port:', process.env.DBPORT);
  console.log('host:', process.env.DBHOST);
  console.log('user:', process.env.DBUSER);
  console.log('pass:', process.env.DBPASS);
  console.info(`Scrowl Web Server running at http://localhost:${port}/app`);
});