const AvatarGenerator = require("avatar-generator");
const path = require("path");
const fs = require("fs-extra");
const User = require("../api/users/user/user.model");
const {
  generatorPartsPath,
  generatedAvatarPath,
  defaultAvatarPath,
} = require("./config");

const generate = async (id) => {
  const avatar = new AvatarGenerator({
    parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
    partsLocation: generatorPartsPath(),
    imageExtension: ".png",
  });
  const variant = "male";
  const image = await avatar.generate("email@example.com", variant);
  image.png().toFile(generatedAvatarPath(id));
};

const updateUserAvatarUrl = async (id) => {
  const avatarUrl = `${
    process.env.HOST + ":" + process.env.PORT
  }/images/${id}.png`;

  return await User.updateUser(id, { avatarURL: avatarUrl });
};

const moveAvatar = async (id) => {
  const oldFilePath = generatedAvatarPath(id);
  const newFilePath = defaultAvatarPath(id);
  try {
    await fs.move(oldFilePath, newFilePath);
  } catch (err) {
    console.log(error);
  }
};

const deleteDefaultAvatar = async (id) => {
  try {
    fs.unlink(defaultAvatarPath(id));
  } catch (err) {
    return console.log(err);
  }
};

module.exports = {
  generate,
  updateUserAvatarUrl,
  moveAvatar,
  deleteDefaultAvatar,
};
