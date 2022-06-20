const { User } = require('../database/models');

const { generateJWTToken } = require('../utils/jwt');

const authenticator = async (email, password) => {
  if (!email || !password) {
    return { status: 400, message: 'Some required fields are missing' };
  }
  const user = await User.findOne({ where: { email } });
  if (!user || password !== user.dataValues.password) {
    return { status: 400, message: 'Invalid fields' };
  }
  const token = generateJWTToken(user.dataValues);
  return token;
};

module.exports = {
  authenticator,
};