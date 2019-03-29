const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const routes = {
    user: require('./users.route')
}

router.use('*', function (req, res, next) {
    if (req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.MY_HASH, function (err, decode) {
            if (err) {
                res.status(498)
                // token es invalido
                return res.json({msg: 'TOKEN_INVALID'})
            }
            next()
        })
    } else {
        //token es requerido
        res.status(499)
        return res.json({msg: 'TOKEN_REQUIRED'})
        next();
    }
})

router.use('/user', routes.user);
module.exports = router;
