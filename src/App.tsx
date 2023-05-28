import React, { useState } from 'react';
import { GlobalStyle } from './styles/Global';
import { Header } from './components/Header';
import Dashboard from './components/Dashboard';
import NewTransactionModal from './components/NewTransactionModal';
import { TransactionProvider } from './context/TransactionContext';

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  const handleOpenNewTransactionModal = () => {
    setIsNewTransactionModalOpen(true);
  }

  const handleCloseNewTransactionModal = () => {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionProvider>
      <GlobalStyle />
      <Header openModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
    </TransactionProvider>
  );
}


