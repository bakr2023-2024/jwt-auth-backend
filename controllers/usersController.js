require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json(user);
  } else throw new Error("invalid email or password");
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("user already exists with this email");
  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.json(user);
  } else throw new Error("Invalid credential(s)");
});
const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out successfully" });
};
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) return res.json(req.user);
  else throw new Error("User not found");
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    if (password) user.password = password;
    const newUser = await user.save();
    req.user = newUser;
    res.json(newUser);
  } else throw new Error("User not found");
});
module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
