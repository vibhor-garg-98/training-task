const validation = {
  create: {
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
