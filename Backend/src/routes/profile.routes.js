const express = require("express");
const profileController = require("../controller/profile.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, profileController.getProfile);
router.put("/update", authMiddleware, profileController.updateProfile);
router.post("/avatar", authMiddleware, profileController.uploadAvatar);

module.exports = router;
