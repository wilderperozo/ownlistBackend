var express = require('express');
var router = express.Router();
const auth = require('./../controller/auth/auth.controller');
const user = require('./../controller/user/user.controller');


router.use('/signup', user.add);
router.use('/', auth.login);
module.exports = router;
