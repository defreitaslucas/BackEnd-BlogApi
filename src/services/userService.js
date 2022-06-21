const { User } = require('../database/models');

const { generateJWTToken } = require('../utils/jwt');

const createUser = async ({ displayName, email, password, image }) => {
  if (!email || !password) {
    return { status: 400, message: 'Some required fields are missing' };
  }
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return { status: 409, message: 'User already registered' };
  }
  const userCreate = User.create({
    displayName,
    email,
    password,
    image,
  });
  return generateJWTToken(userCreate);
};

const getUserAll = async () => {
  const usersAll = await User
  .findAll({ attributes: ['id', 'displayName', 'email', 'id', 'image'] });
  return usersAll;
};

module.exports = {
  createUser,
  getUserAll,
};