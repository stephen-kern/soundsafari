import User from '../models/User';

const register = (req, res) => {
  const { username, password, email } = req.body;

  User.create({ username, password, email })
    .then((user) => {
      res.status(200).json({ message: "Successfully registered", user });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ error: "Registration failed", message: error.message });
    });
};

const login = (req, res) => {};

module.exports = { register, login };
