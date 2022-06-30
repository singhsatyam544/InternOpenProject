const express = require('express')
const router = express.Router()
const collegeController = require("../Controllers/CollegeController")
const interController = require("../Controllers/InternController")

router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns", interController.createInter)
router.get("/functionup/collegeDetails", collegeController.getCollegeDetails)

module.exports = router;