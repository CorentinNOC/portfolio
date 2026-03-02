const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = path.parse(file.originalname).name;
    const safeName = name.split(" ").join("_");
    const extension = file.mimetype === "image/webp" ? "webp" : "tmp";
    callback(null, `${safeName}${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage }).array("images", 10);

module.exports = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) return next(err);
    if (!req.files || req.files.length === 0) return next();

    try {
      const conversions = req.files.map(async (file) => {
        if (file.mimetype === "image/webp") {
          return;
        }

        const tmpPath = file.path;
        const webpPath = tmpPath.replace(/\.tmp$/, ".webp");

        await sharp(tmpPath)
          .resize(800, 600, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(webpPath);

        await new Promise((resolve) => setTimeout(resolve, 50));

        try {
          await fs.promises.unlink(tmpPath);
        } catch (unlinkError) {
          console.warn(`Impossible de supprimer ${tmpPath}`);
        }

        file.filename = path.basename(webpPath);
        file.path = webpPath;
      });

      await Promise.all(conversions);
      next();
    } catch (error) {
      console.error("Erreur:", error);
      next(error);
    }
  });
};
