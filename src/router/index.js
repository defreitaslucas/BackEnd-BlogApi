const express = require('express');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

const router = express.Router();

router.use('/login', loginController);
router.use('/user', userController);

module.exports = router;
