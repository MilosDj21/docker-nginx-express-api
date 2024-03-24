const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    let respCode = 200;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      respCode = 400;
      throw new Error("Invalid user id");
    }
    const user = await User.findById(id);
    if (!user) {
      respCode = 404;
      throw new Error("User not found");
    }
    res.status(respCode).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(respCode).json({ message: error.message });
  }
};

module.exports.findAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.createOne = async (req, res) => {
  const { email, password } = req.body;
  let respCode = 200;
  try {
    if (!email || !password) {
      respCode = 400;
      throw new Error("All fields are required");
    }

    if (!email.includes("@") || !email.includes(".")) {
      respCode = 400;
      throw new Error("Invalid email");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      respCode = 400;
      throw new Error("Email already in use");
    }

    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashPass });
    if (!newUser) {
      respCode = 500;
      throw new Error("User not created");
    }

    res.status(respCode).json({ data: newUser });
  } catch (error) {
    console.log(error);
    res.status(respCode).json({ message: error.message });
  }
};

module.exports.updateOne = async (req, res) => {};

module.exports.deleteOne = async (req, res) => {};
