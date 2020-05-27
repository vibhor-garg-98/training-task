import * as mongoose from 'mongoose';
export default interface IUserCreate {
      id: string;
      objectId: string;
      sortDuration: number;
      sortingAlgorithm: string;
}
