class CustomAPIError extends Error {
  constructor(errMessage) {
    super(errMessage);
    // this.statusCode = StatusCodes.BAD_REQUEST; // 400
  }
}

export default CustomAPIError;
