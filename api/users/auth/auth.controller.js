const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const {
  createToken,
  createEmailVerificationToken,
} = require("../../../services/token.service");
const {
  generate,
  updateUserAvatarUrl,
  moveAvatar,
} = require("../../../services/avatar.service");
const { sendVerificationEmail } = require("../../../services/email.service");

const registrationController = async (req, res, next) => {
  try {
    const { body } = req;
    const isUserAllreadyExist = Boolean(
      await User.findUserByQuery({ email: body.email })
    );
    if (isUserAllreadyExist) {
      return res.status(409).send("Email in use");
    }
    const verificationToken = await createEmailVerificationToken();
    await sendVerificationEmail(body.email, verificationToken);
    const password = await bcrypt.hash(body.password, +process.env.SALT);
    await User.createUser({ ...body, password, verificationToken });
    const response = await User.findUserByQuery({ email: body.email });
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
    const user = await User.findUserByQuery({ email });
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

const verificationTokenController = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.findUserByQuery({ verificationToken });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    await User.updateUser(user.id, { verificationToken: "" });
    res.status(200).send("Status 200: OK");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  verificationTokenController,
};
