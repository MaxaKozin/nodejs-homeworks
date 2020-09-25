const User = require("./user.model");
const bcrypt = require("bcrypt");

const createUserController = async (req, res, next) => {
  try {
    const { body: userData } = req;
    const password = await bcrypt.hash(body.password, +process.env.SALT);
    await User.createUser(...userData, password);
    const response = await User.findUserByEmail(userData.email);
    res.status(201).send({
      user: {
        email: response.email,
        subscription: response.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { body: newData } = req;
    const updated = await User.updateUser(userId, newData);
    res.status(201).json(updated);
  } catch (err) {
    next(err);
  }
};

const currentUserController = async (req, res, next) => {
  try {
    const { user } = req;
    res.status(200).send({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUserController,
  updateUserController,
  currentUserController,
};
