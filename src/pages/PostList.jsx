import { useEffect, useState } from "react";
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
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
    // const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    // const [page, setPage] = useState(1)
    // const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    // const onSearch = (value, _e, info) =>
    //     console.log(info === null || info === void 0 ? void 0 : info.source, value);

    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const search = searchParams.get('keyword') || '';


    useEffect(()=> {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        fetch(`http://localhost:3000/posts?page=${page}&pageSize=${pageSize}&keyword=${search}`)
            .then(res=>res.json())
            .then(data=>{
                setPosts(data.data)
                setTotal(data.total)
            })

        console.log(posts)
    }, [searchParams])

    const handleSearch = (value) => {
        setSearchParams({keyword: value, page: 1, pageSize})
    }

    const handlePaginationChange = (newPage, newPageSize) => {
        setSearchParams({keyword: search, page: newPage, pageSize: newPageSize})
    }

    // const pageSize = 10;

    // const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    
    // const getPaginatedData = (page) => {
    //     const start = (page - 1) * pageSize;
    //     return filteredPosts.slice(start, start + pageSize)
    // }


    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#dedcff', minHeight: '100vh', minWidth: '100vw'}}>
            <Title style={{color: '#2f27ce'}}>See what's happening around you!</Title>
            <Search placeholder="Search post..." defaultValue={search} allowClear onSearch={handleSearch} style={{ width: 200, marginBottom: '1rem' }} />
            <Button align="right" type="primary" icon={<PlusOutlined />} style={{display: 'flex', marginBottom: '1rem'}} onClick={() => navigate('/posts/create')}>Add New Post</Button>
            {/* Getting each posts from API and displaying them in a list */}
            {posts.map((item)=> (
                <Card style={{width: '80vw', color: '#050315'}}>
                    <DataLink key={item._id} to={`/posts/${item._id}`}>
                        {`${item.title}`}
                    </DataLink>
                </Card>
            ))}

            <Pagination align="center" current={page} pageSize={pageSize} total={total} onChange={handlePaginationChange} style={{margin: '2rem'}} />
        </div>
    )
}

export default PostList;