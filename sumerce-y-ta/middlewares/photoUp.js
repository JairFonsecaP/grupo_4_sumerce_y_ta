const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body);
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const photo = "product-" + Date.now() + path.extname(file.originalname);
    req.body.photo = photo;
    cb(null, photo);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;