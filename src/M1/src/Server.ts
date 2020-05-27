import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request } from 'express';
import Iconfig from '../../config/IConfig';
import errorHandler from './libs/routes/errorHandler';
import notFoundRoutes from './libs/routes/notFoundRoute';
import routes from './router';
import Database from './libs/Database';


let cors = require('cors');
interface User {
  name: string;
  id: string;
}

interface NewRequest extends Request {
  user: User;
}

class ServerM1 {
  private app: express.Express;

  constructor(private config: Iconfig) {
    this.app = express();

  }

  bootstrap = (): ServerM1 => {
    console.log('Inside Bootstrap');
    this.initBodyParser();
    this.setupRoutes();
    return this;
  };

  initBodyParser = (): void => {
    const { app } = this;
    console.log('Inside initBodyParser');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  };

  run = (): void => {
    const { app, config: { port, MONGO_URL: mongoDBUrl } } = this;
    Database.open(mongoDBUrl).then(() => {
      this.app.listen(this.config.port, (err) => {
        if (err) {
          console.log('error');
          throw err;
        }
        console.log('App is running successfully on port number: ' + port);
        // Database.disconnect();
      });
    });
  };

  setupRoutes = (): ServerM1 => {
    const { app } = this;
    app.use(cors());
    app.use('/api', routes);
    app.use(notFoundRoutes);
    app.use(errorHandler);

    return this;
  };
}

export default ServerM1;
