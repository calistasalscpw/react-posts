// express: A library to help you build APIs easily.
// cors: Middleware to allow requests from other origins (e.g., your frontend website hosted elsewhere)

import express from 'express';
import mongoose from 'mongoose';
import {Router} from 'express';
import cors from 'cors';
import Post from './src/models/posts.model.js';

const app = express();
// const port = 3000;
app.use(cors())
app.use(express.json());

//change
// cors(): Lets other websites access your server (important for frontend-backend communication).
// express.json(): Lets your server understand JSON input (e.g., in POST requests).

let posts = [
    {id: 1, title: 'first post', body: 'this is my first post'},
    {id: 2, title: 'second post', body: 'this is my second post'},
    {id: 3, title: 'third post', body: 'this is my third post'},
    {id: 4, title: 'fourth post', body: 'this is my fourth post'},
]

//change


const comments = [
    {postId: 1, id: 1, name: "Maria", email: "maria@gmail.com", body: 'first comment'},
    {postId: 1, id: 2, name: "Valencio", email: "valencio@gmail.com", body: 'second comment'},
    {postId: 2, id: 1, name: "Jinu", email: "jinu@gmail.com", body: 'third comment ahay'},
    {postId: 3, id: 1, name: "Jinu", email: "jinu@gmail.com", body: 'third comment'}
]


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});
app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/posts/:postId', async (req, res) => {
  // const post = posts.find(p => p.id === Number(req.params.postId));
  // if (!post) return res.status(404).json({ error: 'Not found' });
  // res.json(post);

  const results = await Post.findById(req.params.postId)
  res.json(results)
});

app.get('/posts/:postId/comments', (req, res) => {
  const postComments = comments.filter(c => c.postId === Number(req.params.postId));
  res.json(postComments);
});

app.post('/posts', (req, res)=> {
    const {title, content} = req.body;
    // const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // const newPost = {
    //     id,
    //     title,
    //     body: content
    // }
    // posts.push(newPost);
    // res.status(201).json(newPost);

    
})

app.put('/posts/:postId', (req, res) => {
  const {postId} = req.params;
  const {title, body} = req.body;
  const post = posts.find(p => p.id === Number(postId))
  if(!post) return res.status(404).json({error: 'Post not found'})

  post.title = title;
  post.body = body;

  res.json(post)
})

app.delete('/posts/:postId', (req, res) => {
  const postId = Number(req.params.postId);
  posts = posts.filter((item) => {
    return item.id !== postId
  })
  res.status(204).end()
})

app.get('/posts', async (req, res) => {
  const {keyword} = req.query;
  // let result = posts;
  // if (search) {
  //   result = posts.filter(post =>
  //     post.title.toLowerCase().includes(search.toLowerCase())
  //   )
  // }

  if(!keyword){
    res.json(await Post.find())
  }

  const findPosts = await Post.find({
    $or: [
      {title: {$regex: `.*${keyword}.*`}},
      {body: {$regex: `.*${keyword}.*`}}
    ]
  })
  res.json(findPosts)
});

// app.listen(port, () => {
//   console.log(`API server listening on port ${port}`);
// });

mongoose.connect('mongodb://localhost:27017/react-posts')
    .then(() => {
        console.log('database connected')
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((e) => {
        console.error('Database connection error:', e);
    })