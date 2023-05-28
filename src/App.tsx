import React, { useState } from 'react';
import { GlobalStyle } from './styles/Global';
import { Header } from './components/Header';
import Dashboard from './components/Dashboard';
import NewTransactionModal from './components/NewTransactionModal';
import { TransactionProvider } from './context/TransactionContext';

export function App() {

  return (
    <TransactionProvider>
      <GlobalStyle />
      <Header />
      <Dashboard />
      <NewTransactionModal />
    </TransactionProvider>
  );
}


