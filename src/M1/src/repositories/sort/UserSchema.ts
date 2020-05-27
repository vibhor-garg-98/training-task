import * as mongoose from 'mongoose';
import VersionSchema from './../versionable/VersionableSchema';

export default class UserSchema extends VersionSchema {
    constructor(options) {
        const userSchema = {
            id: String,
            objectId: String,
            sortDuration: Number,
            sortingAlgorithm: String,
        };
        super(userSchema, options);

    }
}


