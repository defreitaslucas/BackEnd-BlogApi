const Joi = require('joi');
const User = require('../database/models');

const userObjValid = Joi.object({
  displayName: Joi.string().min(8).max(255).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'com.br'] } })
  .external(async (value) => {
    const emailExists = await User.findOne({ email: value });
    if (emailExists) {
      return { message: 'User already registered' };
    }
  }).required(),
  password: Joi.string().min(6).required(),
});

const validateUserMiddleware = (req, res, next) => {
  const { error } = userObjValid.validate(req.body);
  if (error) {
    if (error.details[0].type === 'string.min') {
      const messages = error.details.map((e) => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    const messages = error.details.map((e) => e.message);
    return res.status(409).json({ message: messages[0] });
  }
  next();
};

module.exports = validateUserMiddleware;