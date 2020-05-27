const validation = {
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
      },
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
  list: {
    id: {
      required: true,
      string: true,
      in: ['body'],
      errorMessage: {
        Error: {
          error: 'Id is required',
          message: 'Id is required',
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: 'ID should be of string type',
          message: 'ID should be of string type',
          timestamp: new Date(),
          status: 500
        }
      }
    },
  }
};

export default validation;
