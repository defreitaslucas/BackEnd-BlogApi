const Joi = require('joi');

const categorieObjValid = Joi.object({
  name: Joi.string().required(),
});

const validateCategoryMiddleware = (req, res, next) => {
  const { error } = categorieObjValid.validate(req.body);
  if (error) {
    const messages = error.details.map((e) => e.message);
    return res.status(400).json({ message: messages[0] });
  }
  next();
};

module.exports = validateCategoryMiddleware;