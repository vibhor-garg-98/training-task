import { Router } from 'express';
import sortStatController from './Controller';

const routeHandler = Router();
routeHandler.post('/' , sortStatController.post);
routeHandler.get('/', sortStatController.get);
routeHandler.get('/sortingTime', sortStatController.prevVersions);

export default routeHandler;
