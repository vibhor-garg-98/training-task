import { config } from 'dotenv';
import IConfig from './IConfig';

config();
const configuration: IConfig = Object.freeze({
  port: process.env.PORT,
  port1: process.env.PORT1,
  port2: process.env.PORT2,
  env: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URL,
});

export default configuration;
