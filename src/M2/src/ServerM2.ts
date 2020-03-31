import * as express from 'express';
import * as bodyParser from 'body-parser';
import errorHandler from '../../M1/src/libs/routes/errorHandler';
import notFoundRoute from '../../M1/src/libs/routes/notFoundRoute';
import mainRoute from './sortRoutes';
import DataBase from '../../M1/src/libs/Database';

class ServerM2 {
  private app1: express.Express;
  constructor(private config) {
    this.app1 = express();
  }

  bootstrap = (): ServerM2 => {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  };

  initBodyParser = (): void => {
    const { app1 } = this;
    app1.use(bodyParser.urlencoded({ extended: true }));
    app1.use(bodyParser.json());
  };
  run = (): void => {
    const {
        app1,
      config: { port1: port1, MONGO_URL: mongoDBUrl }
    } = this;
    DataBase.open(mongoDBUrl).then(() => {
        app1.listen(port1, error => {
        if (error) {
          throw error;
        }
        console.log('App1 is running succesfully at port number: ' + port1);
      });
    });
  };

  setupRoutes = (): ServerM2 => {
    const { app1 } = this;
    app1.use('/api', mainRoute);
    app1.use(notFoundRoute);
    app1.use(errorHandler);
    return this;
  };
}

export default ServerM2;
