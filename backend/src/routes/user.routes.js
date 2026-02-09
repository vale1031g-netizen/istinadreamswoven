const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const userCtrl = require("../controllers/user.controller");

router.get("/profile", auth, userCtrl.profile);

module.exports = router;
