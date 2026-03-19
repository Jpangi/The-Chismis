const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
const SALT_LENGTH = 12;

/* --------SIGNUP CONTROLLER-------- */
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (emailExists || usernameExists) return res.status(404).json({ message: 'Email or username already in use' });

    // hashes the password from the user
    const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // calls the createToken function and passes in user_id from user model
    const token = createToken(user.id);
    return res.json({
      message: 'User created and logged in',
      token,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Error with signup',
      error,
    });
  }
};

/* --------LOGIN CONTROLLER-------- */
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'username not found' });

    const matchedPassword = bcrypt.compareSync(password, user.password);
    if (!matchedPassword) return res.status(404).json({ message: 'Password is incorrect' });

    const token = createToken(user.id);
    return res.json({ token, user });
  } catch (error) {
    return res.status(401).json({ error });
  }
};
module.exports = { register, login };
