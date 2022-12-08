import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

import MongoDB from './global/db/mongo';

class App {
  private app;
  private port;
  private db;

  constructor() {
    this.app = express();
    this.port = process.env.SERVER_PORT!;
    this.db = new MongoDB();

    this.initMiddlewares();
  }

  private initMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
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
