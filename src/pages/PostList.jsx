import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { Typography } from "antd";
import {Card} from 'antd';
import styled from 'styled-components';
import { Pagination } from 'antd';

const DataLink = styled(Link)`
    text-decoration: none;
    font-size: 14px;
    color: #050315`

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const {Title} = Typography; // for antd typography

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res=>res.json())
            .then(data=>setPosts(data))

        console.log(posts)
    }, [])
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', minHeight: '100vh', minWidth: '100vw'}}>
            <Title>See what's happening around you!</Title>
            {/* Getting each posts from API and displaying them in a list */}
            {posts.map((item)=> (
                <Card style={{width: '80vw', color: '#050315'}}>
                    <DataLink key={item.id} to={`/posts/${item.id}`}>
                        {`${item.id} ${item.title}`}
                        <br />
                    </DataLink>
                </Card>
            ))}

            <Pagination align="center" defaultCurrent={1} total={50} />
        </div>
    )
}

export default PostList;