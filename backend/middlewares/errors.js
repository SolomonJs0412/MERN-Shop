const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    //Wrong mongoose object ID errors
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handling Mongoose validation error
    if (err.name === "validationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    //handling mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `This ${Object.keys(err.keyValue)} already used`;
      error = new ErrorHandler(message, 400);
    }

    //Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = "Json web token is invalid!! please try again";
      error = new ErrorHandler(message, 400);
    }

    //Handling expired JWT error
    if (err.name === "TokenExpiredError") {
      const message = "Json web token is expired!! please try again";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal server",
    });
  }
};
