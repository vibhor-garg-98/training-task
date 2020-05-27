import * as mongoose from 'mongoose';
import IVersionableDocument from '../versionable/IVersionableDocument';

export default interface IUserModel extends IVersionableDocument {
  id: string;
  obj: mongoose.Schema.Types.Mixed;
  keyCount: number;
  depth: number;
  originalId: string;
  size: string;
  generationTime: number;
}
