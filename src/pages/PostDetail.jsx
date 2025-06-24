import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = ()=> {
    const {postId} = useParams()
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data));

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(res=> res.json())
        .then(data => setComments(data));
    }, [postId])

    if (!post) return <p>Loading...</p>

    return(
        <div style={{padding: '20px'}}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <h3>Comments</h3>
            <ul>
                {comments.map(comment => {
                    <li key={comment.id} style={{marginBottom: '1rem'}}>
                        <strong>{comment.name}</strong>
                        <p>{comment.email}</p>
                        <p>{comment.body}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default PostDetail;