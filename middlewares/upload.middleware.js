const multer = require("multer");

const avatarLoader = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.PUBLIC_IMG);
    },
    filename: (req, file, cb) => {
      const type = file.mimetype.split("/")[1];
      cb(null, `${"avatar-" + req.user.id + "." + type}`);
    },
  });
  return multer({ storage }).single("avatar");
};

module.exports = {
  avatarLoaderMiddleware: avatarLoader(),
};
