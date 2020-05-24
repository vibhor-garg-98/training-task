import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import { Request, Response, NextFunction } from 'express';
import generateObject from './helper';

class UnsortedController {
  private userRepository = new UserRepository();
  static instance;

  static getInstance = (): UnsortedController => {
    if (!UnsortedController.instance) {
      return UnsortedController.instance = new UnsortedController();
    }

    return UnsortedController.instance;
  }

  isEmpty = (obj) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  post = async (req: Request, res: Response) => {
    try {
       const { keyCount , depth } = req.body;
       if (!(keyCount <= depth)) {
        const sizeof = require('object-sizeof');
        const performance = require('performance-now');
        const start = performance();
        const obj = generateObject(keyCount, depth);
        const end = performance();

        const options = {...req.body, obj, size: sizeof(obj), generationTime: (end - start)};
        const data = await this.userRepository.create(options);
        SystemResponse.success(res, data,  'Unsorted object Created Successfully');
       } else {
        SystemResponse.success(res, {data: 'depth must be less than keyCount' });
       }
    }
    catch (error) {
      throw error;
    }
  }

  put = async (req: Request, res: Response) => {
    const {data, dataToUpdate} = req.body;
    const data1 = await this.userRepository.update(data, dataToUpdate);
     SystemResponse.success(res, data1, 'update this data');
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { id, skip, limit, ...query } = req.query;
    let data;
    if (id) {
      data = await this.userRepository.get({ id });
    }
    else {
      const options = { skip, limit };
      data = await this.userRepository.list(query, options);
    }
    if (this.isEmpty(data)) {
      return next({
        error: 'Invalid Id',
        message: 'Invalid Id',
        timestamp: new Date(),
        status: 500
     });
    }
    SystemResponse.success(res, data, 'object listed successfully');
  }

}
export default UnsortedController.getInstance();
