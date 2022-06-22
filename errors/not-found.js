import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class NotFoundError extends CustomAPIError {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = StatusCodes.NOT_FOUND; // 404
  }
}

export default NotFoundError;
