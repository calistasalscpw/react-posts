import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { Typography } from "antd";
import {Card} from 'antd';

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
            {posts.map((item)=> (
                <Link key={item.id} to={`/posts/${item.id}`}>
                    {`${item.id} ${item.title}`}
                    <br />
                </Link>
            ))}
        </div>
    )
}

export default PostList;