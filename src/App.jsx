// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FinanceApp from './Finance'; // O aplicativo que criamos
import Home from './pages/Home';       // A nova Landing Page

// O componente App principal gerencia as rotas
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota da Landing Page (endereço principal /) */}
        <Route path="/" element={<Home />} />
        
        {/* Rota do Aplicativo Financeiro (endereço /app) */}
        <Route path="/app" element={<FinanceApp />} />
        
        {/* Rota de fallback para erros 404 */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;