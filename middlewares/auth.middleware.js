const { verifyToken } = require("../services/token.service");
const User = require("../api/users/user/user.model");

const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).send("No token provided");
    }
    const payload = await verifyToken(token);
    const { id } = payload;
    const user = await User.findUserById(id);
    if (!user) {
      return res.status(401).send("Not authorized");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};

module.exports = {
  checkAuthTokenMiddleware,
};
