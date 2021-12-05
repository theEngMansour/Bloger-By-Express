/**
 * User Model
 */
const Post = require("../models/post");

/**
 * Http Errors
 */
const createError = require('http-errors');

/**
 * Create Post
 */
exports.create = (req, res, next) => {
    let model = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id
    });
    model.save()
    .then(post => {res.json()})
    .catch(next); 
}

/**
 * Posts List
 * select('title content') OR select('-comments')
 */
exports.list =(req, res, next) => {
    Post.find()
    .select('-comments')
    .sort({created_at: 'desc'})
    .populate('author', 'name')
    .then(posts => {res.json(posts)})  
    .catch(next);
}

/* 
 * Posts Details
 */
exports.details = (req, res, next) => {
    let postId = req.params.id;
    Post.findById(postId)
    .populate('author', 'name')
    .populate('comments.author', 'name')
    .then(post => {
        if(!post) throw createError(404);
        res.json(post)
    })
    .catch(next);
}

/* 
 * Update Posts
 */
exports.update = (req, res, next) => {
    let postId = req.params.id;
    let data = {
        title: req.body.title,
        content: req.body.content
    }
    Post.findByIdAndUpdate({_id: postId, author: req.user.id}, data, {runValidators: true})
    .then(post => {
        if(!post) throw createError(404);
        res.json()
    })
    .catch(next);
}

/**
 * Delete Post
 */
exports.delete = (req, res, next) => {
    let postId = req.params.id;
    Post.findByIdAndDelete({_id: postId, author: req.user.id})
    .then(post => {
        if(!post) throw createError(404);
        res.json();
    })
    .catch(next);
}