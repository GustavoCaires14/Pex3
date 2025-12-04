import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import { FaTrash, FaArrowUp, FaArrowDown, FaDollarSign } from "react-icons/fa";
import Navbar from './components/NavBar';
import Dashboard from './components/Dashboard';

// --- STYLES (Styled Components) ---

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } 

  /* body { margin: 0; font-family: 'Poppins', sans-serif; background-color: #f2f2f2; } */

  /* html, body, #root { 
    height: 100%; 
    margin: 0; 
    padding: 0; 
  } */
  
  /* body { 
    font-family: 'Poppins', sans-serif; 
    background-color: #f2f2f2; 
  } */

  html, body, #root {
    height: 100%; /* Garante 100% de altura */
    min-height: 100vh; /* Garante que a altura seja no mínimo a da viewport */
    
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #121212;
    color: white; 
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  background: #1A1A1A; /* Matches your video */
  height: 150px;
  text-align: center;
  width: 100%;
`;

const HeaderTitle = styled.h1`
  padding-top: 20px;
  color: #A3E635;
`;

const ResumeContainer = styled.div`
  width: 90%;
  max-width: 1120px;
  margin: -50px auto 30px; /* Floating effect */
  display: flex;
  gap: 20px;
  justify-content: space-around;
  
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const ResumeItem = styled.div`
  flex: 1;
  background-color: #1A1A1A; /* Fundo dos Cards Escuro */
  border-radius: 12px; /* Aumente o raio para um look mais moderno */
  padding: 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* Sombra mais escura */
  border: 1px solid #333; /* Borda sutil */
  
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    color: #A3E635; /* Ícones em verde destaque */
  }
  
  span {
    font-size: 30px;
    font-weight: bold;
    display: block;
    margin-top: 15px;
    color: white; /* Valores em Branco */
  }
`;

const FormContainer = styled.form`
  width: 90%;
  max-width: 1120px;
  background-color: #1A1A1A; /* Fundo do formulário Escuro */
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  color: white;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap; /* Responsive wrap */

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  border-radius: 5px;
  /* border: 1px solid #ccc; */
  padding: 10px;
  font-size: 15px;
  flex: 1;
  background-color: #252525; /* Fundo do input mais escuro */
  border: 1px solid #444; 
  color: white;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* color: white; */
  /* background-color: darkred; */
  font-weight: bold;
  background-color: #A3E635; /* Botão com Cor de Destaque */
  color: #121212; /* Texto do botão escuro */
  font-weight: 700;
  transition: opacity 0.3s;
  &:hover { background-color: #00FF00; }
`;

const Table = styled.table`
  width: 90%;
  max-width: 1120px;
  /* background-color: #fff; */
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  /* border-radius: 5px; */
  margin-top: 20px;
  text-align: left;
  border-collapse: collapse;
  
  /* th { padding-bottom: 10px; border-bottom: 1px solid #ccc; } */
  /* td { padding: 10px 0; border-bottom: 1px solid #eee; } */

  background-color: #1A1A1A; /* Fundo da Tabela Escuro */
  color: white;
  border-radius: 12px;
  /* Ajuste a borda da linha para ser sutil */
  td { border-bottom: 1px solid #333; }
  th { border-bottom: 2px solid #A3E635; /* Linha de destaque */ }
`;

// --- LOGIC (App Component) ---

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/transactions";

function Finance() {
  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income"); // 'income' or 'expense'

  // Summary States
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  // 1. Load Data from Backend
  useEffect(() => {
    fetchTransactions();
  }, []);

  // 2. Calculate Totals whenever transactions change
  useEffect(() => {
    const amountIncome = transactions
      .filter((item) => item.type === "income")
      .map((transaction) => Number(transaction.amount));

    const amountExpense = transactions
      .filter((item) => item.type === "expense")
      .map((transaction) => Number(transaction.amount));

    const totalIncome = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const totalExpense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const totalBalance = (totalIncome - totalExpense).toFixed(2);

    setIncome(totalIncome);
    setExpense(totalExpense);
    setTotal(totalBalance);
  }, [transactions]);

  // const fetchTransactions = async () => {
  //   try {
  //     // Ensure this URL matches your backend
  //     const res = await axios.get("http://localhost:3001/api/transactions");
  //     setTransactions(res.data);
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //   }
  // };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API_URL); // <-- Usa a variável
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };


  const handleSave = async (e) => {
    e.preventDefault();
    if (!desc || !amount) return alert("Please fill all fields!");

    const newTransaction = {
      desc: desc,
      amount: amount,
      type: type,
    };

  try {
    // await axios.post("http://localhost:3001/api/transactions", newTransaction);
    await axios.post(API_URL, newTransaction);
    fetchTransactions(); // Refresh list
    setDesc("");
    setAmount("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}}`);
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        {/* <HeaderTitle>Controle Financeiro</HeaderTitle> */}
        <Navbar/>
      </Header>

      <Container>
        {/* --- Summary Section --- */}
        <ResumeContainer>
          <ResumeItem>
            <header>Entradas <FaArrowUp color="green"/></header>
            <span>R$ {income}</span>
          </ResumeItem>
          <ResumeItem>
            <header>Saídas <FaArrowDown color="red"/></header>
            <span>R$ {expense}</span>
          </ResumeItem>
          <ResumeItem>
            <header>Total <FaDollarSign color="black"/></header>
            <span style={{color: total < 0 ? 'red' : 'green'}}>R$ {total}</span>
          </ResumeItem>
        </ResumeContainer>

        {/* --- Input Section --- */}
        <FormContainer onSubmit={handleSave}>
          <div style={{flex: 2}}>
            <label>Descrição</label>
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div style={{flex: 1}}>
            <label>Valor</label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <RadioGroup>
            <input 
              type="radio" id="rIncome" name="group1" 
              checked={type === "income"} onChange={() => setType("income")} 
            />
            <label htmlFor="rIncome">Entrada</label>
            
            <input 
              type="radio" id="rExpense" name="group1" 
              checked={type === "expense"} onChange={() => setType("expense")} 
            />
            <label htmlFor="rExpense">Saída</label>
          </RadioGroup>
          <Button type="submit">ADICIONAR</Button>
        </FormContainer>

        {/* --- Table Section --- */}
        <Table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th width="50"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item._id}>
                <td>{item.desc}</td>
                <td>R$ {item.amount}</td>
                <td style={{color: item.type === "expense" ? "red" : "green"}}>
                  {item.type === "income" ? "Entrada" : "Saída"}
                </td>
                <td>
                  <FaTrash onClick={() => handleDelete(item._id)} style={{cursor: "pointer"}} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Dashboard 
        transactions={transactions} 
        income={income} 
        expense={expense}
      />

    </>
  );
}

export default Finance;
