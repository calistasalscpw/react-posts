import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Navigation = () => {
    return(
        <nav>
            <ul>
                <li>
                    <Link to={`/posts`}>Posts</Link>
                </li>
                <li><Link to={`/`}>Home</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;