const User = require('../../model/user.model');
const userHelper = require('./user.helper');

module.exports.add = (req, res, next) => {
    console.log('entro aquiii??')
    const model = new User(req.body);
    User.findOne({email: req.body.email}, (err, response) => {
        if (err) {
            res.status(400)
            return res.json({title: 'Error', msg: 'Error in register user', error: err})
        } else {
            if (response === null) {
                userHelper.add(req.body, model).then(user => {
                    res.status(200);
                    res.json({title: 'Nice', msg: 'User registered successful'})
                }).catch(userError => {
                    res.status(400);
                    return res.json({title: 'Error', msg: 'Error in register user', error: userError})
                })
            } else {
                res.status(409);
                res.json({title: 'Warning', msg: 'Already exist a user with this email'});
            }
        }
    })
};
