import {Typography, Button, Input} from 'antd';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostInput = styled(Input)`
    margin: 1rem;
    padding: 1rem;
    margin-left: 1rem;
    width: 400px;
`

const PostModify = () => {
    const {Title} = Typography
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {postId} = useParams()
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`http://localhost:3000/posts/${postId}`)
        .then(res => res.json())
        .then(data => {setTitle(data.title), setContent(data.body)

        });
    }, [postId]);

    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', 
            body: JSON.stringify({ title, body: content })
        });
        if (response.ok){
            navigate(`/posts/${postId}`);
        }
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#dedcff'}}>
            <Title level={1}>Create a Post</Title>
            <Title level={3}>Post Title</Title>
            <PostInput placeholder="Type a Post" value={title} onChange={e => setTitle(e.target.value)}/>
            <Title level={3}>Post Content</Title>
            <PostInput as={Input.TextArea} placeholder="Type a Post Content" rows={4} value={content} onChange={e => setContent(e.target.value)}/>
            <Button align="right" type="primary" icon={<SendOutlined />} style={{display: 'flex'}} onClick={handleSubmit}>Post</Button>
        </div>
    )
}

export default PostModify;