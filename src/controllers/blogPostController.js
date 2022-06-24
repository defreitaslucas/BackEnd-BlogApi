const express = require('express');

const { createBlogPost, getAllBlogPost } = require('../services/blogPostService');
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

blogPost.get('/', tokenAuthenticated, async (req, res) => {
  try {
    const getBlogPost = await getAllBlogPost();
    return res.status(200).json(getBlogPost);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

module.exports = blogPost;