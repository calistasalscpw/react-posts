import {Typography, Button, Input} from 'antd';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import { useState } from 'react';

const PostInput = styled(Input)`
    margin: 1rem;
    padding: 1rem;
    margin-left: 1rem;
    width: 400px;
`

const PostCreate = () => {
    const {Title} = Typography
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });
        setTitle('');
        setContent('');
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

export default PostCreate;