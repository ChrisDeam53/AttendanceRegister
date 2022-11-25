var express = require('express');
var router = express.Router();
 
// Require controller.
var groupController = require('../controllers/group.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 
// Retrieve one group.
router.get("/:id", groupController.findOne);

router.get("/:id", groupController.findGroup);
 
module.exports = router;