import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, Button, Input, Card, Pagination } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const DataLink = styled(Link)`
    text-decoration: none;
    font-size: 14px;
    color: #050315;
    display: block`;

const { Search } = Input;

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const { Title } = Typography;
    const navigate = useNavigate();
    
    // Read initial values from the URL
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('keyword') || '');
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 10);

    useEffect(() => {
        // Fetch data using the component's state
        fetch(`http://localhost:3000/posts?keyword=${search}&page=${currentPage}&pageSize=${pageSize}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data.data);
                setTotal(data.total);
            });
            
        // Update the URL to match the component's state
        setSearchParams({ keyword: search, page: currentPage });

    }, [search, currentPage, setSearchParams]);

    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1); // Reset to page 1 for new searches
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#dedcff', minHeight: '100vh', minWidth: '100vw' }}>
            <Title style={{ color: '#2f27ce' }}>See what's happening around you!</Title>
            <Search 
                placeholder="Search post..." 
                allowClear 
                defaultValue={search} 
                onSearch={handleSearch} 
                style={{ width: 200, marginBottom: '1rem' }} 
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/posts/create')}>Add New Post</Button>
            
            {posts.map((item) => (
                <Card key={item._id} style={{ width: '80vw', color: '#050315', marginTop: '1rem' }}>
                    <DataLink to={`/posts/${item._id}`}>
                        {item.title}
                    </DataLink>
                </Card>
            ))}

            <Pagination 
                align="center" 
                current={currentPage} 
                pageSize={pageSize} 
                total={total}
                onChange={(page) => setCurrentPage(page)} 
                style={{ margin: '2rem' }} 
            />
        </div>
    );
}

export default PostList;