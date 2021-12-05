/**
 * Post Model
 */
const Post = require('../models/post');

/**
 * Http Errors
 */
const createError = require('http-errors');

/**
 * Mognoose
 */
const mongoose = require('mongoose');

/**
 * Create Comment
 */
exports.create = (req, res, next) => {
    let data = {
        _id: mongoose.Types.ObjectId(),
        content: req.body.content,
        author: req.user.id
    }
    Post.findById(req.params.postId)
    .then(post => {
        if(!post) throw createError(404);
        post.comments.push(data);
        return post.save();
    })
    .then(post => {
        let comment = post.comments.id(data._id);
        res.json(comment)
    })
    .catch(next);
}

exports.delete = (req, res, next) => {
   Post.findById(req.params.postId)
    .then(post => {
      const comment = post.comments.id(req.params.commentId);
      if(!comment) throw createError(404);
      if(comment.author._id.toString() !== req.user.id) throw createError(404);
      comment.remove();
      return post.save();
    })
    .then(post => res.json(post))
    .catch(next);
}