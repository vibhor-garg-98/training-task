import * as mongoose from 'mongoose';

class VersionableSchema extends mongoose.Schema {
  constructor(schema, option) {
    const baseSchema = {
      createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: Date,
    updatedAt: Date,
    };
    super({ ...schema, ...baseSchema }, option);
  }
}
export default VersionableSchema;
