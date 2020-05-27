import * as mongoose from 'mongoose';

export const validation = {
  create: {
    keyCount: {
      required: true,
      number: true,
      in: ['body'],
      errorMessage: {
        Error: {
          error: 'KeyCount is required',
          message: 'KeyCount is required',
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: 'KeyCount should be of type positive Number',
          message: 'KeyCount should be of type positive Number',
          timestamp: new Date(),
          status: 500
        }
      }
    },
    depth: {
      required: true,
      number: true,
      in: ['body'],
      errorMessage: {
        Error: {
          error: 'depth is required',
          message: 'depth is required',
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: 'depth should be of type positive Number',
          message: 'depth should be of type positive Number',
          timestamp: new Date(),
          status: 500
        }
      }
    }
  },
  update: {
    id: {
      required: true,
      string: true,
      in: ['body'],
      custom: id => {
        const _id = id;
        const check = mongoose.isValidObjectId(_id);
        if (!check) {
          throw {
            error: 'Not a MongoDB ID',
            message: 'Not a MongoDB ID',
            timestamp: new Date(),
            status: 500
          };
        }
      }
    }
  },
  get: {
   skip: {
      required: false,
      default: 0,
      number: true,
      in: ['query'],
      errorMessage: {
        typeError: {
          error: 'Skip should be of type number',
          message: 'Skip should be of type number',
          timestamp: new Date(),
          status: 500
        }
      }
    },
    limit: {
      required: false,
      default: 10,
      number: true,
      in: ['query'],
      errorMessage: {
        typeError: {
          error: 'Limit should be of type number',
          message: 'Limit should be of type number',
          timestamp: new Date(),
          status: 500
        }
      }
    },
  },
};
export default validation;
