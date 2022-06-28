const express = require('express')
const router = express.Router()
const collegeControll = require("../Controllers/CollegeController")
const interController = require("../Controllers/InternController")

router.post("/colleges", collegeControll.createCollege)
router.post("/interns", interController.createInter)

module.exports = router;