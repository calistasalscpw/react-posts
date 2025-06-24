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
        </div>
    )
}

export default PostDetail;