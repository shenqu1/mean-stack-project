const express = require("express");
const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
    .then(CreatedPost => {
        res.status(201).json({
            message: 'Post added successfully!',
            postId: CreatedPost._id
        });
    })
    .catch(err=>console.log(err));
    
});

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post)
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'Update successful!'});
    })
    .catch(err=>console.log(err));
});

router.get('', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: documents
            });
        })
        .catch(err=>console.log(err));
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found!'});
        }
    })
    .catch(err=>console.log(err));
});

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result);
            res.status(200).json({message: "Post deleted!"});
        })
        .catch(err=>console.log(err));
});

module.exports = router;