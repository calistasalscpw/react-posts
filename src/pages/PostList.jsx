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
            {posts.map((item, idx)=> {
                <Link to={`/posts/${item.idx}`}>
                    {`${item.idx} ${item.title}`}
                </Link>
            })}
        </div>
    )
}

export default PostList;