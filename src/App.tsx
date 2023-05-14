import React from 'react';
import { GlobalStyle } from './styles/Global';
import { Header } from './components/Header';

export function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
    </div>
  );
}


