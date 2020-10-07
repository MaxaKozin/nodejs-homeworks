const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const createToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.ENCRYPT_KEY);
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  const parsedToken = token.replace("Bearer ", "");
  return await jwt.verify(parsedToken, process.env.ENCRYPT_KEY);
};

const createEmailVerificationToken = async () => {
  return uuidv4();
};

module.exports = {
  createToken,
  verifyToken,
  createEmailVerificationToken,
};
