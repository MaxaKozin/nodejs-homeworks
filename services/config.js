const path = require("path");

const generatedAvatarPath = (id) => `tmp/${id}.png`;
const defaultAvatarPath = (id) => `public/images/${id}.png`;
const generatorPartsPath = () => path.join(__dirname, "../img");

module.exports = {
  generatedAvatarPath,
  defaultAvatarPath,
  generatorPartsPath,
};
