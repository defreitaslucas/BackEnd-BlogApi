const Joi = require('joi');

const putBlogPostObjValid = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validatePutBlogPostMiddleware = (req, res, next) => {
  const { error } = putBlogPostObjValid.validate(req.body);
  if (error) {
    // const messages = error.details.map((e) => e.message);
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = validatePutBlogPostMiddleware;