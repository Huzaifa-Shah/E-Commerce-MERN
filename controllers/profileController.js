const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.updateProfile = async (req, res) => {
  const { name, email, id } = req.body;
  if (name === "") {
    return res.status(400).json({ errors: [{ msg: "Name is required" }] });
  }
  if (email === "") {
    return res.status(400).json({ errors: [{ msg: "Email is required" }] });
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { name: name, email: email },
      { new: true }
    );
    return res.status(200).json({ msg: "Profile updated succesfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports.updatePasswordValidations = [
  body("currentPassword")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Current password is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("New Password must be 6 characters long"),
];

module.exports.updatePassword = async (req, res) => {
  const { currentPassword, password, id } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const user = await User.findOne({ _id: id });
    if (user) {
      const matched = await bcrypt.compare(currentPassword, user.password);
      if (!matched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Current password is wrong" }] });
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          const updatedPassword = await User.findOneAndUpdate(
            { _id: id },
            { password: hash },
            { new: true }
          );
          return res.status(200).json({ msg: "Password updated succesfully" });
        } catch (error) {
          return res.status(500).json({ errors });
        }
      }
    } else {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }
  }
};
