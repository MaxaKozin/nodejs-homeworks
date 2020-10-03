const { Router } = require("express");
const {
  checkAuthTokenMiddleware,
} = require("../../../middlewares/auth.middleware");
const {
  avatarLoaderMiddleware,
} = require("../../../middlewares/upload.middleware");
const {
  createUserController,
  updateUserController,
  currentUserController,
  uploadUserAvatarAndUpdate,
} = require("./user.controller");

const userRouter = Router();

userRouter.post("/", checkAuthTokenMiddleware, createUserController);

userRouter.patch("/:userId", checkAuthTokenMiddleware, updateUserController);

userRouter.get("/current", checkAuthTokenMiddleware, currentUserController);

userRouter.post(
  "/avatars",
  checkAuthTokenMiddleware,
  avatarLoaderMiddleware,
  uploadUserAvatarAndUpdate
);

module.exports = userRouter;
