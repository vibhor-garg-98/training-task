import { Router } from 'express';
import SortMediatorController from './controller';
import validationHandler from '../../../../M1/src/libs/routes/validationHandler';
import validation from '../../validation';

const routeHandler = Router();

routeHandler.put('/', validationHandler(validation.update) , SortMediatorController.put);
routeHandler.get('/', validationHandler(validation.get) , SortMediatorController.get);
routeHandler.get('/sortTime', validationHandler(validation.get) , SortMediatorController.prevVersion);

 export default routeHandler;
