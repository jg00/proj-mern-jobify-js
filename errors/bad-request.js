import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class BadRequestError extends CustomAPIError {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = StatusCodes.BAD_REQUEST; // 400
  }
}

export default BadRequestError;
