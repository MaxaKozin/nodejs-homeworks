const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const { createToken } = require("../../../services/token.service");
const {
  generate,
  updateUserAvatarUrl,
  moveAvatar,
} = require("../../../services/avatar.service");

const registrationController = async (req, res, next) => {
  try {
    const { body } = req;
    const isUserAllreadyExist = Boolean(
      await User.findUserByEmail({ email: body.email })
    );
    if (isUserAllreadyExist) {
      return res.status(409).send("Email in use");
    }
    const password = await bcrypt.hash(body.password, +process.env.SALT);
    await User.createUser({ ...body, password });
    const response = await User.findUserByEmail({ email: body.email });
    await generate(response.id);
    const updatedUser = await updateUserAvatarUrl(response.id);
    await moveAvatar(response.id);
    res.status(201).send({
      user: {
        email: updatedUser.email,
        subscription: updatedUser.subscription,
        avatarURL: updatedUser.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findUserByEmail({ email });
    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordsEqual) {
      return res.status(401).send("Email or password is wrong");
    }
    const token = await createToken({ id: user._id });
    await User.updateUser(user._id, { token });
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.updateUser(_id, { token: "" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
