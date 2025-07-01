import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import {Card, Button} from 'antd';

const CommentList = styled.ul`
    list-style: none;
`

const CommentItem = styled.li`
    margin-bottom: 1rem;
    text-decoration: none;`

const CommentEmail= styled.em`
    display: block;
`



const PostDetail = ()=> {
    const {postId} = useParams()
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        fetch(`http://localhost:3000/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data));

        // fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        fetch(`http://localhost:3000/posts/${postId}/comments`)
        .then(res=> res.json())
        .then(data => setComments(data));
    }, [postId])

    if (!post) return <p>Loading...</p>

    return(
        <div style={{padding: '20px', backgroundColor: 'white', color: '#050315'}}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            
            <Card title="Comments" style={{border: '1px solid #2f27ce'}}>
            <CommentList>
                {/* with the comments that have been set using useEffect,
                use map to get each comments */}
                {comments.map(comment => (
                    <CommentItem key={comment.id} style={{marginBottom: '1rem'}}>
                        <strong style={{color: '#2f27ce', fontSize: '12pt'}}>{comment.name}</strong>
                        <CommentEmail>{comment.email}</CommentEmail>
                        <p>{comment.body}</p>
                    </CommentItem>
                ))}
            </CommentList>
            </Card>
        </div>
    )
}

export default PostDetail;