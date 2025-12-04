import React from 'react';
import styled from 'styled-components';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const ChartContainer = styled.div`
  width: 90%;
  max-width: 1120px;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ChartCard = styled.div`
  background-color: #1A1A1A; /* Fundo dos cards escuro */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  color: white;
  min-height: 350px;
`;

const ChartTitle = styled.h2`
  color: #A3E635; /* Título em verde destaque */
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
`;

// Cores para os gráficos (Verde e Vermelho para In/Out)
const COLORS = ['#A3E635', '#DC2626']; // Verde Lima e Vermelho

// Função para processar dados para o Gráfico de Barras (Saldo Mensal)
const processMonthlyData = (transactions) => {
  const monthlyData = {};
  
  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthYear = `${date.toLocaleString('pt-BR', { month: 'short' })}/${date.getFullYear()}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { monthYear, income: 0, expense: 0, balance: 0 };
    }
    
    const amount = Number(t.amount);
    if (t.type === 'income') {
      monthlyData[monthYear].income += amount;
      monthlyData[monthYear].balance += amount;
    } else {
      monthlyData[monthYear].expense += amount;
      monthlyData[monthYear].balance -= amount;
    }
  });

  // Converte para array e mantém apenas os últimos 6 meses para visualização
  return Object.values(monthlyData).sort((a, b) => new Date(a.monthYear) - new Date(b.monthYear)).slice(-6);
};

// Função para processar dados para o Gráfico de Pizza (Total Geral)
const processTotalDistribution = (income, expense) => {
  return [
    { name: 'Entradas', value: Number(income) },
    { name: 'Saídas', value: Number(expense) },
  ].filter(item => item.value > 0);
};


const Dashboard = ({ transactions, income, expense }) => {
  const monthlyData = processMonthlyData(transactions);
  const totalDistributionData = processTotalDistribution(income, expense);

  return (
    <ChartContainer>
      
      {/* Gráfico 1: Saldo Mensal (Barra) */}
      <ChartCard>
        <ChartTitle>Saldo Mensal (Últimos 6 Meses)</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="monthYear" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip 
                formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Valor']} 
                contentStyle={{ backgroundColor: '#252525', border: 'none' }}
            />
            <Legend />
            <Bar dataKey="income" name="Entradas" fill="#A3E635" />
            <Bar dataKey="expense" name="Saídas" fill="#DC2626" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Gráfico 2: Distribuição Total (Pizza) */}
      <ChartCard>
        <ChartTitle>Distribuição Total</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={totalDistributionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {totalDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                formatter={(value, name) => [`R$ ${value.toFixed(2)}`, name]} 
                contentStyle={{ backgroundColor: '#252525', border: 'none' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </ChartContainer>
  );
};

export default Dashboard;