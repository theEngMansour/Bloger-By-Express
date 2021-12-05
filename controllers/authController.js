/**
 * Http Errors
 */
const createError = require('http-errors');

/**
 * Json Web Token
 */
var jwt = require('jsonwebtoken');

/**
 * User Model
 */
const User = require('../models/user');

/*
 * User Login
 */
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email, password: req.body.password})
    .then(user => {
        if(!user) throw createError(401, "incorrect email or password");
        let data = {
            id: user._id,
            name: user.name,
            email: user.email
        };
        let token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({token: token, _id: user._id});
    }).catch(next);
};

/**
 * User Details
 */
exports.me = (req, res, next) => {
    res.json(req.user);
};