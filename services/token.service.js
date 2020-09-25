const jwt = require("jsonwebtoken");

const createToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.ENCRYPT_KEY);
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  const parsedToken = token.replace("Bearer ", "");
  return await jwt.verify(parsedToken, process.env.ENCRYPT_KEY);
};

module.exports = {
  createToken,
  verifyToken,
};
