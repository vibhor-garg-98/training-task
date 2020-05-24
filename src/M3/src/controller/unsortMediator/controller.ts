import { Request, Response } from 'express';
import axios from 'axios';
import UserRepository from '../../../../M1/src/repositories/user/UserRepository';
import SystemResponse from '../../../../M1/src/libs/SystemResponse';

class MediatorController {
  private userRepository = new UserRepository();
  static instance;

  static getInstance = (): MediatorController => {
    if (!MediatorController.instance) {
      return (MediatorController.instance = new MediatorController());
    }

    return MediatorController.instance;
  };

  create = async (req: Request, res: Response) => {
    try {
      const { keyCount, depth } = req.body;
      const response = await axios({
        method: 'post',
        url: 'http://localhost:9000/api/unsortCreate/',
        data: {
          keyCount,
          depth
        }
      });
      const { data } = response.data;
      SystemResponse.success(res, data);
    } catch (error) {
      throw error;
    }
  };

  list = async (req: Request, res: Response) => {
    const response = await axios.get('http://localhost:9000/api/unsortCreate');

    const { data } = response.data;
    res.send(data);
  };
}
export default MediatorController.getInstance();
