class SystemResponse {
  static success = (res: any, data: any, message: any = 'Success'): any => {
    return res.status(200).send({
      status: 'ok',
      message,
      data
    });
  };
}
export default SystemResponse;
