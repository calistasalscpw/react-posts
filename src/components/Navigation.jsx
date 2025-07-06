import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.nav`
    background-color: #dedcff;
    width: 100%;
    marginL 0;
`

const NavList = styled.ul`
    list-style: none;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2f27ce;
    gap: 10px;
    margin: 0`

const NavItem = styled.li`
    padding: 10px;
    `

const NavLink = styled(Link)`
    text-decoration: none;
    color: #050315;
    font-weight: 500;
    color:rgb(171, 166, 248);
    &:hover{
        color: #dedcff;
    }`

const NavImg = styled.img`
    justify-content: space-between;
`

const Navigation = () => {
    return(
        <NavBar>
            <NavList>
                <NavItem>
                    <NavImg src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Seal_of_ASEAN.svg/1200px-Seal_of_ASEAN.svg.png" alt="logo" style={{width: '30px', height: '30px'}} />
                </NavItem>
                <NavItem>
                    <NavLink to={`/posts`}>Posts</NavLink>
                </NavItem>
                <NavItem><NavLink to={`/`}>Home</NavLink></NavItem>
                <NavItem>
                    <NavLink to={`/auth/login`}>Login</NavLink>
                </NavItem>
            </NavList>
        </NavBar>
    )
}

export default Navigation;