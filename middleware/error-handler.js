import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log("here", err.message); // err.message property from thrown Errors. err will be any errors from db, custom errors, etc.

  // __ Custom Errors __
  // Default generic error or use thrown CustomError 'messages' and status codes
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // 500
    msg: err.message || "Something went wrong, try again later",
  };

  // __ Database Errors __
  // Mongoose validation errors - missing fields, invalid email format
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST; // 400
    // defaultError.msg = err.message;

    defaultError.msg = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(", ");
  }

  // Mongoose validation error - duplicate email key
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST; // 400
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  // res.status(defaultError.statusCode).json({ msg: err }); // default generic err message
  res.status(defaultError.statusCode).json({ msg: defaultError.msg }); // for now sending full error to see on postman
};

export default errorHandlerMiddleware;

// Express errors, mongoose errors passed to here
