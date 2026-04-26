const express = require("express");
const aiController = require("../controller/ai.controller.js")

const router = express.Router();

router.post('/generate-assessment', aiController.generateAssessment);

module.exports = router;