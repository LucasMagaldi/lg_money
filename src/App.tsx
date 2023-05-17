import React from 'react';
import { GlobalStyle } from './styles/Global';
import { Header } from './components/Header';
import Dashboard from './components/Dashboard';

export function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Dashboard />
    </div>
  );
}


