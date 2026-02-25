import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../utils/logo.png";
import { logout } from "../store/authSlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.bg};
  border-bottom: 1px solid ${({ theme }) => theme.bgLight};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  height: 44px;
`;

const Links = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const LinkNav = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 600;
  padding: 8px 10px;
  border-radius: 10px;

  &.active {
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.bgLight};
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Pill = styled.div`
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
`;

const LogoutBtn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.primary};
  background: transparent;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <Container>
      <Left>
        <Logo src={logo} alt="Logo" />
        <Links>
          <LinkNav to="/">Dashboard</LinkNav>
          <LinkNav to="/budget">Budget</LinkNav>
        </Links>
      </Left>

      <Right>
        {user?.name && <Pill>{user.name}</Pill>}
        <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
      </Right>
    </Container>
  );
}
