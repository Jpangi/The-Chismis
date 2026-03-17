const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
const SALT_LENGTH = 12;

/*--------SIGNUP CONTROLLER--------*/
const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: "Email already in use" });
    const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    const token = createToken(user.id);
    console.log(token);
    res.json({ message: "User created and logged in", token, user });
  } catch (error) {
    return res.status(400).json({ message: "Error with signup", error });
  }
};

module.exports = { signUp };
