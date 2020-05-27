import IVersionModel from '../versionable/IVersionableDocument';
export interface IUserModel extends IVersionModel {
      id: string;
      objectId: string;
      sortDuration: number;
      sortingAlgorithm: string;
}
