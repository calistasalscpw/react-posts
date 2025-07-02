import { Router } from "express";
import commentRouter from './comment.js'
import Post from "../models/posts.model.js";


const router = Router();

router.use('/:postId/comments', commentRouter)

router.get('/:postId', async (req, res)=> {
    // const results = posts.filter((item, idx)=> {
    //     return req.params.postId == item.id
    // })
    // use async and await because it's promise type
    const results = await Post.findById(req.params.postId)
    res.json(results)
})


router.get('/', async (req, res)=> {
    const {keyword} = req.query;
    if (!keyword){
        res.json(await Post.find());
    }

    const findPosts = await Post.find({
        $or: [
        {title: {$regex: `.*${keyword}.*`}},
        {content: {$regex: `.*${keyword}.*`}}
        ]
    })
    res.json(findPosts);
})

router.post('/', async (req, res)=> {
    const {title, content} = req.body;

    const createdPost = await Post.create({
        title,
        content
    })
    // posts.push(newPost);
    res.status(201).json(createdPost);
})

router.put('/:postId', async (req, res)=> {
    const postId = req.params.postId;
    const {title, content} = req.body;

    const updatedPost = await Post.findByIdAndUpdate(postId, {
        title,
        content
    }, {
        returnDocument: "after"
    })

    res.json(updatedPost);
})

router.delete("/:postId", (req, res)=> {
    const postId = Number(req.params.postId);
    posts = posts.filter((item, idx)=> {
        return item.id !== postId;
    })
    res.status(204);
})
export default router