import { Router } from "express";
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js";

const router = Router({mergeParams: true});

// const comments = [
//     {id: 1, content: 'first comment', postId: 1},
//     {id: 2, content: 'second comment', postId: 2},
//     {id: 3, content: 'third comment', postId: 3}
// ]

router.get('/', async (req, res)=> {
    try {
        const comments = await Comment.find({post: req.params.postId}).sort({createdAt: -1});
        res.json(comments);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

// create a new comment
router.post('/', async (req, res)=> {
    try {
        const {name, email, body} = req.body;
        const createdComment = await Comment.create({
            name,
            email,
            body,
            post: req.params.postId
        });
        // posts.push(newPost);
        res.status(201).json(createdComment);
    } catch (err){
        res.status(400).json({message: err.message});
    }
});


export default router;