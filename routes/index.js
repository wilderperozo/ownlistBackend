var express = require('express');
var router = express.Router();

const routes ={
  user: require('./users.route')
}

router.use('/user', routes.user);
module.exports = router;
