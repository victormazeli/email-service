import { validationResponseErrors } from "./expressValidator.utils";

export default class {
  static UnauthorizedError(res, error, code = 401) {
    return res.status(code).json({
      status: "error",
      type: "Unauthorized",
      error,
    });
  }

  static Success(res, data = {}, code = 200) {
    code = Object.keys(data).length ? code : 204;
    return res.status(code).json(data);
  }

  static InternalServerError(res, error) {
    return res.status(500).json({
      status: "error",
      type: "Internal Server Error",
      error,
    });
  }

  static ConflictError(res, error) {
    return res.status(409).json({
      status: "error",
      type: "Conflict",
      error,
    });
  }

  static NotFoundError(res, error) {
    return res.status(404).json({
      status: "error",
      type: "Not Found",
      error,
    });
  }

  static BadRequestError(res, error, code = 400) {
    return res.status(code).json({
      status: "error",
      type: "Bad Request",
      error,
    });
  }

  static InvalidRequestParamsError(
    res,
    errors,
    error = "Your request contains invalid parameters"
  ) {
    return res.status(400).json({
      status: "error",
      type: "Bad Request",
      errors,
    });
  }

  static RequestValidationError(
    res,
    errors,
    message = "Your request contains invalid parameters"
  ) {
    return res.status(400).json({
      error: "InvalidRequestParamsError",
      message,
      errors: Array.isArray(errors) ? validationResponseErrors(errors) : errors,
    });
  }
}
