const OK_CODE = 200;
const CREATE_CODE = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const ERROR_CODE = 500;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const CONFLICT_ERROR = 409;
const REGEXP = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()€-]{1,67}(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/;
const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = {
  OK_CODE,
  CREATE_CODE,
  BAD_REQUEST,
  NOT_FOUND,
  ERROR_CODE,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR,
  REGEXP,
  NODE_ENV,
  JWT_SECRET,
};
