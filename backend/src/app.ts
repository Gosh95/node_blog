import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import MongoDB from './global/db/mongo';
import { Routers } from './types/layers';
import UserRouter from './routers/user';
import AuthRouter from './routers/auth';
import PostRouter from './routers/post';

class App {
  private app;
  private port;
  private db;

  constructor() {
    this.app = express();
    this.port = process.env.SERVER_PORT!;
    this.db = new MongoDB();

    this.initMiddlewares();
    this.initRouters([new UserRouter(), new AuthRouter(), new PostRouter()]);
  }

  private initMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initRouters(routers: Routers[]) {
    routers.forEach((router) => this.app.use(router.path, router.router));
  }

  async run() {
    await this.db.connect();
    this.app.listen(this.port, () => {
      console.log(`Server connected to ${this.port}.`);
    });
  }
}

const app = new App();
app.run();
