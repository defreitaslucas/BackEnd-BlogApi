const express = require('express');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const categoriesController = require('../controllers/categoriesController');
const blogPostController = require('../controllers/blogPostController');

const router = express.Router();

router.use('/login', loginController);
router.use('/user', userController);
router.use('/categories', categoriesController);
router.use('/post', blogPostController);

module.exports = router;
