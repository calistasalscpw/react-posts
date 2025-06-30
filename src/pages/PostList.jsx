import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { Typography } from "antd";
import {Card} from 'antd';
import styled from 'styled-components';
import { Pagination } from 'antd';

const DataLink = styled(Link)`
    text-decoration: none;
    font-size: 14px;
    color: #050315;
    display: block`

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const {Title} = Typography; // for antd typography
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=> {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        fetch(`http://localhost:3000/posts`)
            .then(res=>res.json())
            .then(data=>setPosts(data))

        console.log(posts)
    }, [])

    const pageSize = 10;

    const getPaginatedData = (page) => {
        const start = (page - 1) * pageSize;
        return posts.slice(start, start + pageSize)
    }
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#dedcff', minHeight: '100vh', minWidth: '100vw'}}>
            <Title style={{color: '#2f27ce'}}>See what's happening around you!</Title>
            {/* Getting each posts from API and displaying them in a list */}
            {getPaginatedData(currentPage).map((item)=> (
                <Card style={{width: '80vw', color: '#050315'}}>
                    <DataLink key={item.id} to={`/posts/${item.id}`}>
                        {`${item.id} ${item.title}`}
                    </DataLink>
                </Card>
            ))}

            <Pagination align="center" current={currentPage} pageSize={pageSize} total={posts.length} onChange={(page) => setCurrentPage(page)} style={{margin: '2rem'}} />
        </div>
    )
}

export default PostList;