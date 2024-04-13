const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  generateToken: (res, userId) => {
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
  },
};
