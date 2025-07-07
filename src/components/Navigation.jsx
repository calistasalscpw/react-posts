import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Dropdown, Menu, Button, Spin } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

const NavBar = styled.nav`
  background-color: #2f27ce;
  width: 100%;
  padding: 0 40px;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

const NavLogo = styled(Link)``;

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 25px;
  margin: 0;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #dedcff;
  font-weight: 500;
  font-size: 16px;
  transition: color 0.3s ease;
  &:hover {
    color: #ffffff;
  }
`;

const UserDropdownButton = styled(Button)`
  &.ant-btn {
    color: #dedcff;
    font-weight: 500;
    font-size: 16px;
    &:hover,
    &:focus {
      color: #ffffff;
    }
  }
`;

const Navigation = () => {
  const { user, isLoading, logout } = useAuth(); // Get everything from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Redirect home after logout
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <NavBar>
      <NavList>
        <NavLogo to={`/`}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Seal_of_ASEAN.svg/1200px-Seal_of_ASEAN.svg.png"
            alt="logo"
            style={{ width: "30px", height: "30px" }}
          />
        </NavLogo>
        <NavLinks>
          <NavItem>
            <NavLink to={`/`}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`/posts`}>Posts</NavLink>
          </NavItem>
          <NavItem>
            {isLoading ? (
              <Spin />
            ) : user ? (
              <Dropdown overlay={menu} placement="bottomRight">
                <UserDropdownButton ghost>
                  <UserOutlined style={{ marginRight: "8px" }} />
                  Hello, {user.username}
                </UserDropdownButton>
              </Dropdown>
            ) : (
              <NavLink to={`/auth/login`}>Login</NavLink>
            )}
          </NavItem>
        </NavLinks>
      </NavList>
    </NavBar>
  );
};

export default Navigation;
