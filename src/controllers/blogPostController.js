const express = require('express');

const {
  createBlogPost,
  getAllBlogPost,
  getById,
  updateBlogPost,
  verifyUserPost,
  deletePostById } = require('../services/blogPostService');
const tokenAuthenticated = require('../middlewares/tokenAuth');
const validateBlogPostMiddleware = require('../middlewares/blogPostAuthenticated');
const validatePutBlogPostMiddleware = require('../middlewares/putPostBlogBodyAuth');

const blogPost = express();

blogPost.post('/', tokenAuthenticated, validateBlogPostMiddleware, async (req, res) => {
  try {
    const addBlogPost = await createBlogPost(req.body, req.user.id);
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

blogPost.get('/:id', tokenAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const getBlogPostById = await getById(id);
    return res.status(200).json(getBlogPostById);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

blogPost.put('/:id', tokenAuthenticated, validatePutBlogPostMiddleware, async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;
    const verifyUser = await verifyUserPost(postId, userId);
    if (verifyUser.message) {
      return res.status(verifyUser.code).json({ message: verifyUser.message });
    }
    const updatePost = await updateBlogPost(title, content, postId);
    return res.status(200).json(updatePost);
});

blogPost.delete('/:id', tokenAuthenticated, async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
  
    const deletePost = await deletePostById(postId, userId);
    if (deletePost.message === 'Post does not exist') {
      return res.status(404).json({ message: deletePost.message });
    } 
    if (deletePost.message === 'Unauthorized user') {
      return res.status(401).json({ message: deletePost.message });
    }
    return res.status(204).end();
});
module.exports = blogPost;