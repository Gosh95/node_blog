import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

class App {
  private app;
  private port;

  constructor() {
    this.app = express();
    this.port = process.env.SERVER_PORT!;

    this.initMiddlewares();
  }

  private initMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  run() {
    this.app.listen(this.port, () => {
      console.log(`Server connected to ${this.port}.`);
    });
  }
}

const app = new App();
app.run();
