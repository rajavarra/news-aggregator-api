const Joi = require('joi');

const blackList = /[/\\&?#%'"><{}[\]|,+;:]/g;
/**
 * At lest 8 characters long, Contains 1 uppercase, 1 lowercase, 1 digit and 1 special char
 */
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const userSignInSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Invalid email address',
    }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
  }),
}).unknown(false);

const preferencesSchema = Joi.object({
  preferences: Joi.array()
    .items(Joi.string().trim().replace(blackList, '_'))
    .max(10)
    .required()
    .messages({
      'any.required': 'Preferences is required and should be an array',
      'array.max': 'Exceeded maximum preferences',
    }),
}).unknown(false);

const userSignUpSchema = Joi.object({
  firstname: Joi.string()
    .required()
    .min(3)
    .max(30)
    .trim()
    .replace(blackList, ' ')
    .messages({
      'any.required': 'firstname is required',
      'string.empty': 'firstname cannot be empty',
      'string.min': 'firstname must be at least 3 characters long',
      'string.max': 'firstname cannot be more than 30 characters long',
    }),
  lastname: Joi.string()
    .required()
    .min(3)
    .max(30)
    .trim()
    .replace(blackList, ' ')
    .messages({
      'any.required': 'lastname is required',
      'string.empty': 'lastname cannot be empty',
      'string.min': 'lastname must be at least 3 characters long',
      'string.max': 'lastname cannot be more than 30 characters long',
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Invalid email address',
    }),
  password: Joi.string().pattern(passwordPattern).required().messages({
    'any.required': 'Password is required',
    'string.pattern.base':
      'Password must be at least 8 characters long, must contains 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character',
    'string.empty': 'Password cannot be empty',
  }),
  ...preferencesSchema.describe().children,
}).unknown(false);

module.exports = {
  userSignUpSchema,
  userSignInSchema,
  preferencesSchema,
};
