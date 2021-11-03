function errorHandler(err, req, res, next) {
  console.log("in error handler");
  // check for headers ? do it in middleware
  if (!err.status) {
    console.log(err);
    return res.status(500).json(err.message);
  }
  console.log(err);
  return res.status(err.status).json(err.message);
}

module.exports = errorHandler;
