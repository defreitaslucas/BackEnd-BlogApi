const Joi = require('joi');

const blogPostObjValid = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
});

const validateBlogPostMiddleware = (req, res, next) => {
  const { error } = blogPostObjValid.validate(req.body);
  if (error) {
    // const messages = error.details.map((e) => e.message);
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = validateBlogPostMiddleware;