const { Router } = require("express");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");
const { validateUserData } = require("../../middlewares/validation.middleware");
const {
  registrationController,
  loginController,
  logoutController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.post("/registration", validateUserData, registrationController);

authRouter.post("/login", validateUserData, loginController);

authRouter.post("/logout", checkAuthTokenMiddleware, logoutController);

module.exports = authRouter;
