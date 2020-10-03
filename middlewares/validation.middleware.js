const Validator = require("../api/users/validation/validation.model");

const validateUserData = async (req, res, next) => {
  try {
    const { body: userData } = req;
    const { error } = await Validator.validate(userData);
    if (!error) {
      next();
    }
  } catch (error) {
    const message = error.details.reduce((msg, nextErr) => {
      if (msg) {
        return msg + ", " + nextErr.message;
      }
      return nextErr.message;
    }, "");
    res.status(400).send(message);
  }
};

module.exports = {
  validateUserData,
};
