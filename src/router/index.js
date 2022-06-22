const express = require('express');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.use('/login', loginController);
router.use('/user', userController);
router.use('/categories', categoriesController);

module.exports = router;
