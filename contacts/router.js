const router = require("express").Router();

const {
  getController,
  addController,
  getByIdController,
  removeController,
  updateController,
} = require("./contacts.controller");

router.get("/", getController);

router.get("/:contactId", getByIdController);

router.post("/", addController);

router.delete("/:contactId", removeController);

router.patch("/", updateController);

module.exports = router;
