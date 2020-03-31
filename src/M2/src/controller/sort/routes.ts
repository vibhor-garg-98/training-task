import { Router } from 'express';
import SortedController from './controller';

const sortRoute = Router();
sortRoute.post('/', SortedController.post);

export default sortRoute;
