import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
import { port } from './config';

const app = express();

app.set('json spaces', 2);
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

api.init(app);

app.listen(port, () => {
  console.info(`Scrowl Web Server running at http://localhost:${port}`);
});