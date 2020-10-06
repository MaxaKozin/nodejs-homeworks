require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const authRouter = require("./api/users/auth/auth.router");
const userRouter = require("./api/users/user/user.router");
const router = require("./api/contacts/router");

const DB_URI =
  process.env.DB_URI ||
  "mongodb+srv://admin:qwerty123@cluster0.ppmz7.mongodb.net/contacts-db?retryWrites=true";

mongoose.set("useCreateIndex", true);

const serverInit = async () => {
  await mongoose
    .connect(DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database connection successful"))
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.static(path.resolve(__dirname, "public")));

  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cors());

  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/contacts", router);

  app.use((err, req, res, next) => {
    delete err.stack;
    next(err);
  });

  app.listen(PORT, () => {
    console.log("Server is working on port: ", PORT);
  });
};

serverInit();
