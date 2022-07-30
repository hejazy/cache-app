
import express, { Router } from 'express';
import {DatabaseService, LoggerService} from './lib/index.js'
import {RouterService}  from './app/router.js';
const app = express();


async function bootstrap() {
  const cors = process.env.ALLOWED_DOMAINS && { origin: process.env.ALLOWED_DOMAINS.split(',') };
  const port = process.env.PORT || 8080;
  const loggerService = new LoggerService();
  const databaseService = new DatabaseService(loggerService);
  await databaseService.connect()
  app.use(express.urlencoded({extended: true}));
  app.use(express.json())
  new RouterService(app)

  app.listen(port, () => {
    loggerService.log({message: `App started at http://localhost:${port}`});
  });
  
}
bootstrap();




