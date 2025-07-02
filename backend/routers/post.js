import { Router } from "express";
import commentRouter from './comment.js'
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js";


const router = Router();


router.get('/:postId', async (req, res)=> {
    // const results = posts.filter((item, idx)=> {
        //     return req.params.postId == item.id
        // })
        // use async and await because it's promise type
        
        try {
            const results = await Post.findById(req.params.postId);
            if (!results) {
                return res.status(404).json({error: 'Post not found'});
            }
            res.json(results);
        } catch (err){
            res.status(500).json({message: err.message})
        }
    })
    
router.use('/:postId/comments', commentRouter)

router.get('/', async (req, res)=> {
    try {
        const {keyword} = req.query;
        let findPosts;
        
        if (keyword){
            findPosts = await Post.find({
                $or: [
                    {title: {$regex: keyword, $options: 'i'}},
                    {content: {$regex: keyword, $options: 'i'}}
                ]
            });
        } else {
            findPosts = await Post.find();
        }
        res.json(findPosts);
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

router.post('/', async (req, res)=> {
    try {
    const {title, content} = req.body;
    const createdPost = await Post.create({
        title,
        content
    })
    // posts.push(newPost);
    res.status(201).json(createdPost);
    } catch (err){
        res.status(400).json({message: err.message});
    }
})

router.put('/:postId', async (req, res)=> {
    try {
        const postId = req.params.postId;
        const {title, content} = req.body;

        const updatedPost = await Post.findByIdAndUpdate(postId, {
            title,
            content
        }, {
            returnDocument: "after"
        })
        if (!updatedPost) {
            return res.status(404).json({error: 'Post not found'});
        }
        res.json(updatedPost);
    } catch (err){
        res.status(400).json({message: err.message});
    }
})

router.delete("/:postId", async (req, res)=> {
   try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);
        // posts = posts.filter((item, idx)=> {
        //     return item.id !== postId;
        // })

        if (!deletedPost){
            return res.status(404).json({error: 'Post not found'});
        }

        //also delete all comments related to this post
        await Comment.deleteMany({post: req.params.postId});

        //success response
        res.status(204).json({
            success: true,
            message: 'Post deleted successfully',
            post: deletedPost
        });
    } catch (err) {
        console.error("Delete post error:", err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
})
export default router;