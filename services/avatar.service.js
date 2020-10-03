const AvatarGenerator = require("avatar-generator");
const path = require("path");
const fs = require("fs-extra");
const User = require("../api/users/user/user.model");

const generate = async (id) => {
  const avatar = new AvatarGenerator({
    parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
    partsLocation: path.join(__dirname, "../img"),
    imageExtension: ".png",
  });
  const variant = "male";
  const image = await avatar.generate("email@example.com", variant);
  image.png().toFile(`tmp/${id}.png`);
};

const updateUserAvatarUrl = async (id) => {
  const avatarUrl = `http://localhost:3000/images/${id}.png`;

  return await User.updateUser(id, { avatarURL: avatarUrl });
};

const moveAvatar = async (id) => {
  const oldFilePath = path.resolve("tmp", `${id}.png`);
  const newFilePath = path.resolve("public", "images", `${id}.png`);
  await fs.move(oldFilePath, newFilePath, (e) => {
    if (e) return console.log(e);
  });
};

const deleteDefaultAvatar = async (id) => {
  const defaultAvatarPath = path.resolve("public", "images", `${id}.png`);
  await fs
    .readFile(defaultAvatarPath)
    .then(() => {
      fs.unlink(defaultAvatarPath);
    })
    .catch((err) => {
      return;
    });
};

module.exports = {
  generate,
  updateUserAvatarUrl,
  moveAvatar,
  deleteDefaultAvatar,
};
