var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
 
//Require controller
var studentAttendance = require('../controllers/studentAttendance.controller');
var studentLessonAttendance = require('../controllers/studentLessonAttendance.controller');


// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 

router.get("/:groupid/semesterRegistration/:studentid", [authjwt.verifyToken], studentAttendance.findAll);


router.get("/:groupid/semesterRegistration/:studentid/lesson", [authjwt.verifyToken], studentLessonAttendance.findAll);

module.exports = router;