const Joi = require('joi');

const userSignUpSchema = Joi.object({
  fullname: Joi.string().min(3).max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      'any.required': 'email is required',
      'string.empty': 'email cannot be empty',
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .messages({
      'any.required': 'password is required',
      'string.empty': 'password cannot be empty',
    }),
});

const userSignInSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      'any.required': 'email is required',
      'string.empty': 'email cannot be empty',
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .messages({
      'any.required': 'password is required',
      'string.empty': 'password cannot be empty',
    }),
});

const preferencesSchema = Joi.object({
  preferences: Joi.array().required().messages({
    'any.required': 'preferences is required and should be an array',
  }),
});

const preferencesValidation = (req, res, next) => {
  const { preferences } = req.body;

  const { error } = preferencesSchema.validate({
    preferences,
  });
  if (error) {
    const errorMessage = error.details.map((d) => d.message).join(', ');
    res.status(400).send(errorMessage);
    next();
  }
};
const userSignUpValidation = (req, res, next) => {
  const { fullname, email, password } = req.body;

  const { error } = userSignUpSchema.validate({
    fullname,
    email,
    password,
  });
  if (error) {
    const errorMessage = error.details.map((d) => d.message).join(', ');
    res.status(400).send(errorMessage);
    next();
  }
  next();
};

const userSignInValidation = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = userSignInSchema.validate({
    email,
    password,
  });
  if (error) {
    const errorMessage = error.details.map((d) => d.message).join(', ');
    res.status(400).send(errorMessage);
    next();
  }
  next();
};

module.exports = {
  userSignUpValidation,
  userSignInValidation,
  preferencesValidation,
};
