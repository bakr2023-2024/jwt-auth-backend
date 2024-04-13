require("dotenv").config();
const express = require("express");
const { connectToDB } = require("./config/db");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errMiddleware");
const userRouter = require("./routers/usersRouter");
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("HELLO WLRD");
});
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;
connectToDB()
  .then((res) => {
    console.log(res);
    app.listen(port, () => {
      console.log("server running at: http://localhost:" + port);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
