const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const projectCtrl = require("../controllers/project");

router.get("/", projectCtrl.getProjects);
router.post("/", auth, multer, projectCtrl.createProject);
router.put("/:id", auth, multer, projectCtrl.modifyProject);
router.delete("/:id", auth, projectCtrl.deleteProject);

module.exports = router;
