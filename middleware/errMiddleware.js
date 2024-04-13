require("dotenv").config();
module.exports = {
  notFound: (req, res, next) => {
    const err = new Error("not found: " + req.originalUrl);
    res.status(404);
    next(err);
  },
  errorHandler: (err, req, res, next) => {
    const msg = err.msg;
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: msg,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  },
};
