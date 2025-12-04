import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/NavBar';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* <--- Esta linha faz com que o container ocupe a altura total */
  /* width: 100vh; */
  text-align: center;
  /* background-color: #f8f8f8; */
  background-color: #121212; /* Fundo Escuro */
  color: white;
`;

const Title = styled.h1`
  /* color: darkred; */
  /* margin-bottom: 20px; */
  color: #A3E635; /* Destaque Verde */
  margin-bottom: 20px;
`;

const Description = styled.p`
  /* color: #333; */
  /* margin-bottom: 40px; */
  max-width: 600px;
  color: #ccc; /* Texto Claro */
  margin-bottom: 40px;
`;

const StartButton = styled(Link)`
  padding: 15px 30px;
  /* background-color: darkred; */
  /* color: white; */
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.2em;
  transition: background-color 0.3s;

  /* &:hover {
    background-color: #a00000;
  } */

  background-color: #A3E635; /* Botão Verde */
  color: #121212; /* Texto do botão escuro */
  &:hover {
    background-color: #00FF00;
  }
`;

const Home = () => {
  return (
    <>
        <NavBar />
        <HomeContainer>
            <Title>Bem-vindo ao Seu Controle Financeiro Pessoal</Title>
            <Description>
                Mantenha suas finanças organizadas, registre entradas e saídas de forma simples e visualize seu saldo em tempo real. Clique abaixo para começar a usar a aplicação principal.
            </Description>
            <StartButton to="/app">Acessar o Aplicativo</StartButton>
        </HomeContainer>
    </>
  );
};

export default Home;