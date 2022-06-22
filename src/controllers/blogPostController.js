const express = require('express');

const { createBlogPost } = require('../services/blogPostService');
const tokenAuthenticated = require('../middlewares/tokenAuth');
const validateBlogPostMiddleware = require('../middlewares/blogPostAuthenticated');

const blogPost = express();

blogPost.post('/', tokenAuthenticated, validateBlogPostMiddleware, async (req, res) => {
  try {
    const addBlogPost = await createBlogPost(req.body, res.locals.user.id);
    if (addBlogPost.message) {
      return res.status(addBlogPost.code).json({ message: addBlogPost.message });
    }
    return res.status(201).json(addBlogPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = blogPost;