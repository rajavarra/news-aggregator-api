const Joi = require('joi');

const userSchema = Joi.object({
  fullname: Joi.string().alphanum().min(3).max(30),
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

module.exports = {
  userSchema,
};
