import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.nav`
    background-color: #dedcff;
`

const NavList = styled.ul`
    list-style: none;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #dedcff;`

const NavItem = styled.li`
    padding: 10px;
    `

const NavLink = styled(Link)`
    text-decoration: none;
    color: #050315;
    font-weight: 300;
    &:hover{
        color: #2f27ce;
    }`

const Navigation = () => {
    return(
        <NavBar>
            <NavList>
                <NavItem>
                    <NavLink to={`/posts`}>Posts</NavLink>
                </NavItem>
                <NavItem><NavLink to={`/`}>Home</NavLink></NavItem>
            </NavList>
        </NavBar>
    )
}

export default Navigation;