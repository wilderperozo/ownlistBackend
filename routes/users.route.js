var express = require('express');
var router = express.Router();
var controller = require('../controller/user/user.controller');

/* GET users listing. */
router.post('/add', controller.add);

module.exports = router;
