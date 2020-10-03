const router = require("express").Router();
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const {
  getController,
  addController,
  getByIdController,
  removeController,
  updateController,
} = require("./contacts.controller");

router.get("/", checkAuthTokenMiddleware, getController);

router.get("/:contactId", checkAuthTokenMiddleware, getByIdController);

router.post("/", checkAuthTokenMiddleware, addController);

router.delete("/:contactId", checkAuthTokenMiddleware, removeController);

router.patch("/", checkAuthTokenMiddleware, updateController);

module.exports = router;
