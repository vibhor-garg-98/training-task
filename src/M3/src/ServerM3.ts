import * as express from 'express';
import * as bodyParser from 'body-parser';
import errorHandler from '../../M1/src/libs/routes/errorHandler';
import notFoundRoute from '../../M1/src/libs/routes/notFoundRoute';
import mainRoute from './router';
import DataBase from '../../M1/src/libs/Database';

let cors = require('cors');
class ServerM3 {
  private app2: express.Express;
  constructor(private config) {
    this.app2 = express();
  }

  bootstrap = (): ServerM3 => {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  };

  initBodyParser = (): void => {
    const { app2 } = this;
    app2.use(bodyParser.urlencoded({ extended: true }));
    app2.use(bodyParser.json());
  };
  run = (): void => {
    const {
        app2,
      config: { port2: port2, MONGO_URL: mongoDBUrl }
    } = this;
    // DataBase.open(mongoDBUrl).then(() => {
        app2.listen(port2, error => {
        if (error) {
          throw error;
        }
        console.log('App2 is running succesfully at port number: ' + port2);
      });
    // });
  };

  setupRoutes = (): ServerM3 => {
    const { app2 } = this;
    app2.use(cors());
    app2.use('/api', mainRoute);
    app2.use(notFoundRoute);
    app2.use(errorHandler);
    return this;
  };
}

export default ServerM3;
