const { User } = require('../database/models');

const { generateJWTToken } = require('../utils/jwt');

const createUser = ({ displayName, email, password, image }) => {
  if (!email || !password) {
    return { status: 400, message: 'Some required fields are missing' };
  }
  const userCreate = User.create({
    displayName,
    email,
    password,
    image,
  });
  return generateJWTToken(userCreate);
};

module.exports = {
  createUser,
};