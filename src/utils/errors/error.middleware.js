export const errorMiddleware = (error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
    cause: error.cause,
  });
};
