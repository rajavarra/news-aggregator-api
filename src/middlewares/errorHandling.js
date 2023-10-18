// const {
//   userSignInSchema,
//   userSignUpSchema,
//   preferencesSchema,
// } = require('../models/user');
const AppError = require('../utils/AppError');

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.httpStatusCode).send({ error: error.message });
  }
  return res.status(500).send({ error: 'Internal Server Error' });
};

const commonValidationHandler = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((d) => d.message).join(', ');
      const err = new AppError(errorMessage, 400);
      next(err);
    }
    next();
  };
};
// const userSignInValidation = (req, res, next) => {
//   const { email, password } = req.body;

//   const { error } = userSignInSchema.validate(
//     {
//       email,
//       password,
//     },
//     // eslint-disable-next-line comma-dangle
//     { abortEarly: false }
//   );
//   if (error) {
//     const errorMessage = error.details.map((d) => d.message).join(', ');
//     const err = new AppError(errorMessage, 400);
//     next(err);
//   }
//   next();
// };

// const preferencesValidation = (req, res, next) => {
//   const { preferences } = req.body;

//   const { error } = preferencesSchema.validate(
//     {
//       preferences,
//     },
//     // eslint-disable-next-line comma-dangle
//     { abortEarly: false }
//   );
//   if (error) {
//     const errorMessage = error.details.map((d) => d.message).join(', ');
//     const err = new AppError(errorMessage, 400);
//     next(err);
//   }
//   next();
// };

// const userSignUpValidation = (req, res, next) => {
//   const { firstname, lastname, email, password } = req.body;

//   const { error } = userSignUpSchema.validate(
//     {
//       firstname,
//       lastname,
//       email,
//       password,
//     },
//     // eslint-disable-next-line comma-dangle
//     { abortEarly: false }
//   );
//   if (error) {
//     const errorMessage = error.details.map((d) => d.message).join(', ');
//     const err = new AppError(errorMessage, 400);
//     next(err);
//   }
//   next();
// };

module.exports = {
  commonValidationHandler,
  // userSignUpValidation,
  // userSignInValidation,
  // preferencesValidation,
  errorHandler,
};
