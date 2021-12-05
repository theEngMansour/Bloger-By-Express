/**
 * User Model
 */
const User = require("../models/user");

/**
 * Http Errors
 */
const createError = require('http-errors');

/**
 * Create User
 */
exports.create = (req, res, next) => {  
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }) 
  .then(user => {res.json(user)})
  .catch(next);
  // .catch(err => {res.status(422).send(err)});
};

/**
 * Users List
 */
exports.list = (req, res, next) => {
  User.find()
      .then(users => {res.json(users)})
      .catch(next);
};

/**
 * Show User
 */
exports.show = (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    if(!user) throw createError(404, "User not found.");
    res.json(user);
  }).catch(next);
};

/**
 * Update User
 */
exports.update = (req, res, next) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  
  User.findByIdAndUpdate(req.params.id, data)
  .then(updatedUser => {
    if(!updatedUser) throw createError(404, "user not found");
    res.json(updatedUser);
  }).catch(next);
};

/**
 * Delete User
 */
exports.delete = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
  .then(deleted => {
    if(!deleted) throw createError(404, "user not found");
    res.json({message : "user is deleted"});
  }).catch(next);
};