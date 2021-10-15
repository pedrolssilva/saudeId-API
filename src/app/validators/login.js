const User = require("../models/User");
const { compare } = require("bcryptjs");

async function create(req, res, next) {
  try {
    const { email } = req.body;
    console.log(
      `[LoginValidator - create] email:`, email );
    const user = await User.findOne({email});
    console.log(
      `[LoginValidator - create] user:`, user );
    if (user) {
      return res.status(400).send({
        message: 'User already exists!'
      });
    }
    next();
  } catch (error) {
    console.error(
      `[LoginValidator - create] error:`,error,
      );
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.trim() });

  if (!user) {
    return res.status(404).json({
      message: 'User not found!'
    });
  }

  const passed = await compare(password, user.password);

  if (!passed) {
    return res.status(401).json({
      message: 'Password mismatch!'
    });
  }
  req.user = user;

  next();
}

async function logout(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({ email: email.trim() });

  if (!user) {
    return res.status(404).json({
      message: 'User not found!'
    });
  }
  req.user = user;
  next();
}

module.exports = {
  create,
  login,
  logout
};