import User from "../models/User";

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

const login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        if (password === user.password) {
          res.status(200).json({ message: "login successful", user });
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ error: "Login failed", message: error.message });
    });
};

module.exports = { register, login };
