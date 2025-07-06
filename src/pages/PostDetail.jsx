import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import {Card, Button, Modal, Typography} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CommentForm from "../components/CommentForm"

const {Title, Paragraph} = Typography;

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
    const [editingComment, setEditingComment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        fetch(`http://localhost:3000/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data));

        // fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        fetch(`http://localhost:3000/posts/${postId}/comments`)
        .then(res=> res.json())
        .then(data => setComments(Array.isArray(data) ? data : []));
    }, [postId])

    const handleDeletePost = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this post?',
            content: 'This will also delete all associated comments.',
            okText: 'Yes, Delete',
            okType: 'danger',
            onOk: async () => {
                await fetch(`http://localhost:3000/posts/${postId}`, { method: 'DELETE' });
                navigate('/posts');
            }
        });
    }

    const handleCommentSubmit = async (values) => {
        if (editingComment){
            //update existing comment
            const res = await fetch(`http://localhost:3000/posts/${postId}/comments/${editingComment._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            })
            const updatedComment = await res.json();
            setComments(comments.map(c => c._id === updatedComment._id ? updatedComment : c));
            setEditingComment(null); // Exit editing mode
        } else {
            // create new comment
            const res = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            })
            const newComment = await res.json();
            setComments([newComment, ...comments]); //add new comment to the top of the list
        }
    }

    const handleDeleteComment = async (commentId) => {
        Modal.confirm({
            title: 'Delete this comment?',
            okText: 'Delete',
            okType: 'danger',
            onOk: async () => {
                await fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
                    method: 'DELETE'
                })
                setComments(comments.filter(c => c._id !== commentId))
            }
        })
    }

    // const handleSubmit = async () => {
    //     await fetch(`http://localhost:3000/posts/${postId}`, {
    //         method: 'DELETE',
    //     });
    //     navigate('/posts');
    // }

    if (!post) return <p>Loading...</p>

    return(
        <div style={{padding: '20px', backgroundColor: 'white', color: '#050315'}}>
            <Card>
                <Title level={2}>{post.title}</Title>
                <Paragraph>{post.body}</Paragraph>
                <div style={{display: 'flex', gap: '1rem', width: '100%', justifyContent: 'flex-end', marginBottom: '1rem'}}>
                    <Button align="right" icon={<EditOutlined />} onClick={() => navigate(`/posts/${postId}/edit`)}>Edit Post</Button>
                    <Button align="right" icon={<DeleteOutlined />} danger onClick={handleDeletePost}>Delete Post</Button>
                </div>
            </Card>
      
            <Card title={<Title level={4}>Comments ({comments.length})</Title>} style={{border: '0.5px solid #2f27ce', marginTop: '2rem'}}>
                <CommentList>
                    {/* with the comments that have been set using useEffect,
                    use map to get each comments */}
                    {comments.map(comment => (
                        <CommentItem key={comment._id} style={{marginBottom: '1rem'}}>
                            {editingComment && editingComment._id === comment._id ? (
                                <CommentForm onFormSubmit={handleCommentSubmit} initialValues={editingComment}/>
                            ) : (
                                <>
                                    <strong style={{color: '#2f27ce', fontSize: '12pt'}}>{comment.name}</strong>
                                    <CommentEmail>{comment.email}</CommentEmail>
                                    <Paragraph>{comment.body}</Paragraph>
                                    <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
                                        <Button size="small" onClick={() => setEditingComment(comment)}>Edit</Button>
                                        <Button size="small" danger onClick={() => handleDeleteComment(comment._id)}>Delete</Button>
                                    </div>
                                </>
                            )}
                        </CommentItem>
                    ))}
                </CommentList>
            </Card>

            <Card title={<Title level={4}> Leave a Comment </Title>} style={{ marginTop: '2rem' }} >
                <CommentForm onFormSubmit={handleCommentSubmit} initialValues={{ name: '', email: '', body: '' }} />
            </Card>
        </div>
    )
}

export default PostDetail;