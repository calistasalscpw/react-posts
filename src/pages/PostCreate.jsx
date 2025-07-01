import {Typography, Button, Input} from 'antd';
import styled from 'styled-components';

const PostInput = styled(Input)`
    margin: 1rem;
    padding: 1rem;
    margin-left: 1rem;
    width: 400px;
`

const PostCreate = () => {
    const {Title} = Typography
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#dedcff'}}>
            <Title level={1}>Create a Post</Title>
            <Title level={3}>Post Title</Title>
            <PostInput placeholder="Type a Post" />
            <Title level={3}>Post Content</Title>
            <PostInput as={Input.TextArea} placeholder="Type a Post Content" rows={4} />
        </div>
    )
}

export default PostCreate;