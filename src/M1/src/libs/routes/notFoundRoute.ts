export default (req: any, res: any, next: any) => {
  next({
    error: 'NOt found',
    code: '404'
  });
};
