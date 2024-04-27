/* eslint-disable */
import express from 'express';
import { CONNECT_DB } from './config/mongodb';
import { env } from './config/environment';
import bodyParser from 'body-parser';
import cors from 'cors';
import { APIs } from './routes';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';

const START_SERVER = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use('/api', APIs);
  // -----------------
  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server is running at http://${env.APP_HOST}:${env.APP_PORT}/`);
  });
};
(async () => {
  try {
    await CONNECT_DB();
    console.log('Connect to MongoDB Atlas successfully');
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
