class ApiError extends Error {
  public statusCode: number;
  success: boolean;
  constructor(
    statusCode: number,
    message = 'Something went wrong',
    // errors = [],
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    // this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
