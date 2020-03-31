import { Router } from 'express';
import UnsortedController from './Controller';
import validationHandler from '../../libs/routes/validationHandler';
import validation from './validation';

const UnsortedRouter = Router();

UnsortedRouter.route('/')
  .post(validationHandler(validation.create), UnsortedController.post)
  .get(UnsortedController.get)
  .put(UnsortedController.put);

export default UnsortedRouter;
