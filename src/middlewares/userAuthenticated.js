const Joi = require('joi');

const userObjValid = Joi.object({
  displayName: Joi.string().min(8).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().max(255),
});

const validateUserMiddleware = (req, res, next) => {
  const { error } = userObjValid.validate(req.body);
  if (error) {
    if (error.details[0].type === 'string.min') {
      const messages = error.details.map((e) => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    const messages = error.details.map((e) => e.message);
    return res.status(400).json({ message: messages[0] });
  }
  next();
};

module.exports = validateUserMiddleware;