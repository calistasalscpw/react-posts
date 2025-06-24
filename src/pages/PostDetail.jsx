import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PostDetail = ()=> {
    const {postId} = useParams()
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data));

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(res=> res.json())
        .then(data => setComments(data));
    }, [postId])

    if (!post) return <p>Loading...</p>

    return(
        <div>
            {postId}
        </div>
    )
}

export default PostDetail;