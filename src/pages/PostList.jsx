import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
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
    const [total, setTotal] = useState(0); // State for total posts
    const { Title } = Typography;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const pageSize = 10;

    useEffect(() => {
        // Fetch paginated and searched data from the backend
        fetch(`http://localhost:3000/posts?keyword=${search}&page=${currentPage}&pageSize=${pageSize}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data.data); 
                setTotal(data.total); 
            });
    }, [search, currentPage]); // Re-fetch when search or page changes

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#dedcff', minHeight: '100vh', minWidth: '100vw' }}>
            <Title style={{ color: '#2f27ce' }}>See what's happening around you!</Title>
            <Search placeholder="Search post..." allowClear onSearch={value => setSearch(value)} style={{ width: 200, marginBottom: '1rem' }} />
            <Button align="right" type="primary" icon={<PlusOutlined />} style={{ display: 'flex' }} onClick={() => navigate('/posts/create')}>Add New Post</Button>
            
            {/* Map directly over the 'posts' state */}
            {posts.map((item) => (
                <Card key={item._id} style={{ width: '80vw', color: '#050315', marginTop: '1rem' }}>
                    <DataLink to={`/posts/${item._id}`}>
                        {`${item.title}`}
                    </DataLink>
                </Card>
            ))}

            <Pagination 
                align="center" 
                current={currentPage} 
                pageSize={pageSize} 
                total={total} // Use the 'total' state here
                onChange={(page) => setCurrentPage(page)} 
                style={{ margin: '2rem' }} 
            />
        </div>
    );
}

export default PostList;