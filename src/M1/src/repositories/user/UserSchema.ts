import * as mongoose from 'mongoose';
import VersionableSchema from '../versionable/VersionableSchema';

class UserSchema extends VersionableSchema {
  constructor(option) {
    const userSchema = {
      id: String,
      obj: mongoose.Schema.Types.Mixed,
      keyCount: Number,
      depth: Number,
      originalId: String,
      size: String,
      generationTime: Number,
    };
    super(userSchema, option);
  }
}
export default UserSchema;
