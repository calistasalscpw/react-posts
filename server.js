import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());

//change

const posts = [
    {id: 1, title: 'first post', content: 'this is my first post'},
    {id: 2, title: 'second post', content: 'this is my second post'},
    {id: 3, title: 'third post', content: 'this is my third post'},
    {id: 4, title: 'fourth post', content: 'this is my fourth post'},
]

//change

const comments = [
    {id: 1, content: 'first comment', postId: 1},
    {id: 2, content: 'second comment', postId: 2},
    {id: 3, content: 'third comment', postId: 3}
]

// const comments = [
//   { id: 1, postId: 1, body: 'First' },
//   { id: 2, postId: 1, body: 'Second' },
//   { id: 3, postId: 2, body: 'Third' },
// ];


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});
app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/posts/:postId', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.postId));
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

app.get('/posts/:postId/comments', (req, res) => {
  const postComments = comments.filter(c => c.postId === Number(req.params.postId));
  res.json(postComments);
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});