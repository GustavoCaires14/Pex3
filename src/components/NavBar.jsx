import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavWrapper = styled.nav`
  background-color: #1A1A1A; /* Fundo escuro sutil */
  padding: 15px 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.span`
  font-size: 1.8em;
  font-weight: 700;
  color: #A3E635; /* Cor de Destaque Verde Lima */
  letter-spacing: 1px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 25px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  padding: 5px 10px;
  border-bottom: 2px solid transparent; /* Linha de base */
  transition: border-bottom 0.3s, color 0.3s;

  &:hover {
    color: #A3E635; /* Destaque no hover */
    border-bottom: 2px solid #A3E635;
  }
`;

const NavBar = () => {
  return (
    <NavWrapper>
      <Logo>Finance.io</Logo>
      <NavLinks>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/app">Controle</NavItem>
      </NavLinks>
    </NavWrapper>
  );
};

export default NavBar;