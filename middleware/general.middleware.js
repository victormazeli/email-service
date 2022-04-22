import Response from "../utils/response.utils";

export default class {
  static controllerWrapper(func, errMessage = "Internal Server Error") {
    return async (req, res) => {
      try {
        const result = (await func(req, res)) || {};
        let { $statusCode, ...data } = result;
        data = Object.keys(data).length
          ? Array.isArray(result)
            ? result
            : data
          : result;

        Response.Success(res, data, $statusCode);
      } catch (err) {
        console.log("error: ", err);
        const msg = env("NODE_ENV") == "production" ? errMessage : err.stack;
        Response.InternalServerError(res, msg);
      }
    };
  }
}
