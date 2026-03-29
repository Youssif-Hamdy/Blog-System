const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { signToken } = require("../middleware/auth");

exports.register = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError("Email already registered", 400);
  }
  const user = await User.create({ username, email, password, role: "user" });
  const token = signToken(user._id);
  res.status(201).json({ status: "success", token, user });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }
  const token = signToken(user._id);
  user.password = undefined;
  res.json({ status: "success", token, user });
});
