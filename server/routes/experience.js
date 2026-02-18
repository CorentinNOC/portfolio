const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const experienceCtrl = require("../controllers/experience");

router.get("/", experienceCtrl.getExperiences);
router.post("/", auth, experienceCtrl.createExperience);
router.put("/:id", auth, experienceCtrl.modifyExperience);
router.delete("/:id", auth, experienceCtrl.deleteExperience);

module.exports = router;
