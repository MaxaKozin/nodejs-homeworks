const { Router } = require("express");
const {
  checkAuthTokenMiddleware,
} = require("../../../middlewares/auth.middleware");
const {
  validateUserData,
} = require("../../../middlewares/validation.middleware");
const {
  registrationController,
  loginController,
  logoutController,
  verificationTokenController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.post("/registration", validateUserData, registrationController);

authRouter.post("/login", validateUserData, loginController);

authRouter.post("/logout", checkAuthTokenMiddleware, logoutController);

authRouter.get("/verify/:verificationToken", verificationTokenController);

module.exports = authRouter;
