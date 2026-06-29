import ApiError from "../utils/ApiError.js";

export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return next(
        ApiError.badRequest(
          "Validation failed",
          result.error.issues
        )
      );
    }

    Object.assign(req[source], result.data);

    next();
  };
};