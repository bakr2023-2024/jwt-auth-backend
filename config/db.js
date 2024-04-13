require("dotenv").config();
const mongoose = require("mongoose");
module.exports = {
  connectToDB: () =>
    new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(process.env.MONGO_URI);
        resolve("connected to db");
      } catch (err) {
        reject(err);
      }
    }),
};
