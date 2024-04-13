const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = { User: model("users", userSchema) };
