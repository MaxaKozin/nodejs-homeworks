const { Router } = require("express");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");
const {
  createUserController,
  updateUserController,
  currentUserController,
} = require("./user.controller");

const userRouter = Router();

userRouter.post("/", checkAuthTokenMiddleware, createUserController);

userRouter.patch("/:userId", checkAuthTokenMiddleware, updateUserController);

userRouter.get("/current", checkAuthTokenMiddleware, currentUserController);

module.exports = userRouter;
