const asyncHandler = require("express-async-handler");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
module.exports = {
  protect: asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, userId) => {
        if (!err) {
          const user = await User.findById(userId).select("-password");
          req.user = user;
          next();
        } else {
          res.status(401);
          throw new Error("Unauthorized access, token expired");
        }
      });
    } else {
      res.status(401);
      throw new Error("Unauthorized access, token not found");
    }
  }),
};
