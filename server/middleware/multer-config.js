const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = path.parse(file.originalname).name;
    const safeName = name.split(" ").join("_");
    callback(null, `${safeName}${Date.now()}.tmp`);
  },
});

const upload = multer({ storage }).array("images", 10);

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return next(err);
    if (!req.files || req.files.length === 0) return next();

    const conversions = req.files.map((file) => {
      const tmpPath = file.path;
      const webpPath = tmpPath.replace(/\.tmp$/, ".webp");

      return sharp(tmpPath)
        .resize(206, 260)
        .webp({ quality: 80 })
        .toFile(webpPath)
        .then(() => {
          fs.unlinkSync(tmpPath);
          file.filename = path.basename(webpPath);
          file.path = webpPath;
        });
    });

    Promise.all(conversions)
      .then(() => next())
      .catch((error) => {
        req.files.forEach((file) => {
          fs.unlink(file.path, () => {});
          fs.unlink(file.path.replace(/\.webp$/, ".tmp"), () => {});
        });
        next(error);
      });
  });
};
