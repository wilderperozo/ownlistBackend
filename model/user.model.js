const mongoose = require('./../bin/db.config');
const jwt = require('jsonwebtoken');
const SHA256 = require("crypto-js/sha256");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});
userSchema.methods.toHash = ((password, callback) => {
    callback(SHA256(password, process.env.MY_HASH).toString())
})
userSchema.methods.validPassword = (password, cb)=>{
    cb(this.password === SHA256(password, process.env.MY_HASH).toString());
}
userSchema.methods.generateToken = (param, cb) =>{
    var user = this;
    var token = jwt.sign({
        _id: user._id.toHexString()
    }, process.env.MY_HASH);
    user.token = {
        token: token
    }
    user.save();
    callback(token);
}

const User = mongoose.model('user', userSchema);
module.exports = User
