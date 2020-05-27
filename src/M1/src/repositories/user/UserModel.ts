import * as mongoose from 'mongoose';
import UserSchema from './UserSchema';
import IUserModel from './IUserModel';

export const userSchema = new UserSchema({
  collection: 'unSorted'
});

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
  'unSorted',
  userSchema,
  'unSorted',
  true
);

