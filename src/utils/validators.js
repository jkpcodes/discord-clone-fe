import Joi from 'joi';

export const USER_NAME_MIN_LENGTH = 3;
export const USER_NAME_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 30;

const passwordValidation = Joi.string()
  .min(PASSWORD_MIN_LENGTH)
  .max(PASSWORD_MAX_LENGTH)
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
  .required()
  .messages({
    'string.pattern.base':
      'Password must include uppercase, lowercase, and a number',
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password cannot exceed 30 characters',
    'string.empty': 'Password is required',
  });

const emailValidation = Joi.string()
  .trim()
  .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  .required()
  .messages({
    'string.pattern.base': 'Invalid email address',
    'string.empty': 'Email is required',
  });

/**
 * Validation schema for Register form
 * @type {Joi.ObjectSchema}
 */
export const registerSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(USER_NAME_MIN_LENGTH)
    .max(USER_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 30 characters',
      'string.empty': 'Username is required',
    }),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Confirm Password is required',
  }),
});

/**
 * Validation schema for login form
 * @type {Joi.ObjectSchema}
 */
export const loginSchema = Joi.object({
  email: emailValidation,
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }), // We don't apply any validation for password on login, we just need to check if it's present
});
