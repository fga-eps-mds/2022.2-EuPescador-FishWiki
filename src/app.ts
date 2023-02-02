import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/router';

require('dotenv').config();

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json());
app.use(cors());

app.use(router);

export default app;
