import { joi } from "../utils/index.js";

const validations = {
  "/api/users": {
    POST: joi
      .object()
      .keys({
        name: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required(),
        email: joi.string().optional(),
        mobileNumber: joi.number().min(10).optional(),
        gender: joi.string().valid("MALE", "FEMALE", "OTHER"),
        website: joi.string().uri().optional(),
        bio: joi.string().max(50).optional(),
      })
      .or("email", "mobileNumber"),
  },
  "/api/users/login": {
    POST: joi.object().keys({
      email: joi.string().required(),
      password: joi.string().required(),
    }),
  },
  "/api/follow": {
    POST: joi.object().keys({
      followeeID: joi.string().hex().length(24).required(),
    }),
    DELETE: joi.object().keys({
      followeeID: joi.string().hex().length(24).required(),
    }),
  },
  "/api/status/like": {
    POST: joi
      .object()
      .keys({
        statusID: joi.string().hex().length(24).required(),
        comment: joi.string().max(50).optional(),
        like: joi.bool().optional(),
      })
      .or("comment", "like"),
  },
};

export default validations;
