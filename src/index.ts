import configuration from './config/configuration';
import ServerM1 from './M1/src/Server';
import ServerM2 from './M2/src/ServerM2';
import ServerM3 from './M3/src/ServerM3';

const server1 = new ServerM1(configuration);
server1.bootstrap();
server1.run();

const server2 = new ServerM2(configuration);
server2.bootstrap();
server2.run();

const server3 = new ServerM3(configuration);
server3.bootstrap();
server3.run();
