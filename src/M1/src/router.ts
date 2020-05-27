import { Router } from 'express';
import unsortedRouter from './controller/unsorted/routes';
import sortStatsRouter from './controller/sortStats/routes';

const mainRouter = Router();
mainRouter.use('/unsortCreate', unsortedRouter);
mainRouter.use('/sortStats', sortStatsRouter);


export default mainRouter;
