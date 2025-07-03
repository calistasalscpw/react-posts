import { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { Typography, Button, Input } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {Card} from 'antd';
import styled from 'styled-components';
import { Pagination } from 'antd';

const DataLink = styled(Link)`
    text-decoration: none;
    font-size: 14px;
    color: #050315;
    display: block`

const { Search } = Input;

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const {Title} = Typography; // for antd typography
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [search, setSearch] = useState('')

    // const onSearch = (value, _e, info) =>
    //     console.log(info === null || info === void 0 ? void 0 : info.source, value);

    useEffect(()=> {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        fetch(`http://localhost:3000/posts`)
            .then(res=>res.json())
            .then(data=>setPosts(data))

        console.log(posts)
    }, [])

    const pageSize = 10;

    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    
    const getPaginatedData = (page) => {
        const start = (page - 1) * pageSize;
        return filteredPosts.slice(start, start + pageSize)
    }


    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#dedcff', minHeight: '100vh', minWidth: '100vw'}}>
            <Title style={{color: '#2f27ce'}}>See what's happening around you!</Title>
            <Search placeholder="Search post..." value={search} allowClear onChange={e => setSearch(e.target.value)} style={{ width: 200, marginBottom: '1rem' }} />
            <Button align="right" type="primary" icon={<PlusOutlined />} style={{display: 'flex', marginBottom: '1rem'}} onClick={() => navigate('/posts/create')}>Add New Post</Button>
            {/* Getting each posts from API and displaying them in a list */}
            {getPaginatedData(currentPage).map((item)=> (
                <Card style={{width: '80vw', color: '#050315'}}>
                    <DataLink key={item._id} to={`/posts/${item._id}`}>
                        {`${item.title}`}
                    </DataLink>
                </Card>
            ))}

            <Pagination align="center" current={currentPage} pageSize={pageSize} total={posts.length} onChange={(page) => setCurrentPage(page)} style={{margin: '2rem'}} />
        </div>
    )
}

export default PostList;