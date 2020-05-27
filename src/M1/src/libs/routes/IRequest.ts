import { Request } from 'express';
import IUserModel from '../../repositories/user/IUserModel';

interface IRequest extends Request {
  user: IUserModel;
}
export default IRequest;
