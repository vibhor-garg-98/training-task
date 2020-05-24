import UserRepository from '../../repositories/sort/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import { Request, Response } from 'express';

class SortStatsController {
  private userRepository = new UserRepository();
  static instance;

  static getInstance = (): SortStatsController => {
    if (!SortStatsController.instance) {
      return (SortStatsController.instance = new SortStatsController());
    }

    return SortStatsController.instance;
  };
  post = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id, sortDuration, sortAlgorithm } = data;
      const prevSort = await this.userRepository.get({ objectId: id });
      if (!prevSort) {
        const options = { objectId: id, sortDuration,  sortingAlgorithm: sortAlgorithm};
        const sortStats = await this.userRepository.create(options);
        res.send(sortStats);
      } else {
        const updateSort = await this.userRepository.update(
          { objectId: id },
          {  sortingAlgorithm: sortAlgorithm, sortDuration },
        );
        res.send(updateSort);
      }
    } catch (error) {
      throw error;
    }
  };

  prevVersions = async (req: Request, res: Response) => {
    const { skip, limit, ...query } = req.query;
    const options = { skip, limit };
    const data = await this.userRepository.getPreviousList(
      query,
      options
    );
    res.send(data);
  };

  get = async (req: Request, res: Response) => {
    const { objectId, skip, limit, ...query } = req.query;
    const options = { skip, limit };
    if (objectId) {
      const data = await this.userRepository.get({ objectId });
      res.send(data);
    } else {
      const list = await this.userRepository.list(query, options);
      res.send(list);
    }
  };
}

export default SortStatsController.getInstance();
