const User = require('./../../model/user.model');

module.exports.login = function (req, res, next) {
    User.findOne({
        email: req.body.email
    }, (err, docs) => {
        if (err) {
            res.status(400);
            res.json(err);
        } else {
            if (docs == null) {
                res.status(404);
                res.json({
                    title: 'Error',
                    msg: 'This user no exist'
                });
            } else {
                docs.validPassword(req.body.password, (isValid) => {
                    if (isValid) {
                        User.findOne({
                            email: req.body.email
                        }, (e, d) => {
                            res.status(202);
                            d.generateAuthToken(null, (token) => {
                                res.json(d);
                            })
                        }).select('-password')
                    } else {
                        res.status(404);
                        res.json({
                            title: 'Error',
                            msg: 'This userd not exist'
                        });
                    }
                });
            }
        }
    })
}
