import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res=>res.json())
            .then(data=>setPosts(data))

        console.log(posts)
    }, [])
    return(
        <div>
            {posts.map((item, idx)=> (
                <Link key={item.id} to={`/posts/${item.id}`}>
                    {`${item.id} ${item.title}`}
                    <br />
                </Link>
            ))}
        </div>
    )
}

export default PostList;