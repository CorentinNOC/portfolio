const express = require("express");
const router = express.Router();
const contactCtrl = require("../controllers/contact");

router.post("/", contactCtrl.sendContactEmail);

module.exports = router;
