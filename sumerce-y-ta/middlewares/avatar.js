const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/avatars"));
  },
  filename: function (req, file, cb) {
    const photo = "user-" + Date.now() + path.extname(file.originalname);
    cb(null, photo);
  },
});

const avatar = multer({ storage: storage });

module.exports = avatar;
