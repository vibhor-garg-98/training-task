import UserRepository from '../../../../M1/src/repositories/user/UserRepository';
import { Request, Response } from 'express';
import axios from 'axios';

class SortMediatorController {
  private userRepository = new UserRepository();
  static instance;

  static getInstance = (): SortMediatorController => {
    if (!SortMediatorController.instance) {
      return (SortMediatorController.instance = new SortMediatorController());
    }

    return SortMediatorController.instance;
  };

  put = async (req: Request, res: Response) => {
    const { id } = req.body;
    const response = await axios.get('http://localhost:9000/api/unsortCreate', {
      params: {
        id
      }
    });

    const sortObject: any = await axios({
      method: 'post',
      url: 'http://localhost:9001/api/sorting/',
      data: {
        data: response.data.data
      }
    });
    const { data } = sortObject.data;
    const { newObj, sortTime } = data;
    const updateData = await axios({
      method: 'put',
      url: 'http://localhost:9000/api/unsortCreate/',
      data: {
        data: { id },
        dataToUpdate: { obj: newObj }
      }
    });
    const createSortStats = await axios({
      method: 'post',
      url: 'http://localhost:9000/api/sortStats/',
      data: {
        data: { id, sortDuration: sortTime }
      }
    });

    res.send(createSortStats.data);
  };

  get = async (req: Request, res: Response) => {
    const { objectId } = req.query;
    const response = await axios.get('http://localhost:9000/api/sortStats', {
      params: {
        objectId
      }
    });

    res.send(response.data);
  };

  prevVersion = async (req: Request, res: Response) => {
    const { objectId } = req.query;
    const response = await axios.get(
      'http://localhost:9000/api/sortStats/sortingTime',
      {
        params: {
          objectId
        }
      }
    );

    res.send(response.data);
  };
}
export default SortMediatorController.getInstance();
