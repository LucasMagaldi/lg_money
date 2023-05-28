import React, { FormEvent, useState, useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import ReactModal from 'react-modal';

import { Container, TransactionTypeContainer, TypeButton } from './style';
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";


function NewTransactionModal () {

  const { 
    createTransaction, 
    handleCloseNewTransactionModal, 
    isNewTransactionModalOpen,
    editTransactionModalOpen,
    editTransaction,
    title,
    setTitle,
    value,
    setValue,
    category,
    setCategory,
    type,
    setType
  } = useContext(TransactionContext);

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();

    if (isNewTransactionModalOpen) {
      await createTransaction({
        value,
        title,
        type,
        category
      });
    }
    
    if (editTransactionModalOpen) {
      await editTransaction({
        value,
        title,
        type,
        category,
        id: 1
      });
    }

    setTitle("");
    setType("");
    setValue(0);
    setCategory("");
    
    handleCloseNewTransactionModal();
  }

  return (
    <ReactModal 
        isOpen={isNewTransactionModalOpen || editTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >   

        <button
        type='button'
        onClick={handleCloseNewTransactionModal}
        className='react-modal-close'
        >
            <img src={closeImg} alt='Fechar Modal'/>
        </button>

         <Container onSubmit={handleCreateNewTransaction}>
            { isNewTransactionModalOpen ? <h2>Nova Transação</h2> : <h2>Editando Transação</h2> }

            <input 
            placeholder='Título' 
            value={title}
            onChange={event => setTitle(event.target.value)}
            />
            <input 
            type='number'
            placeholder='Valor'
            value={value}
            onChange={event => setValue(Number(event.target.value)| +event.target.value)}
            />

            <TransactionTypeContainer>
                <TypeButton
                  type='button'
                  onClick={() => setType('deposit')}
                  isActive={type === 'deposit'}
                  activeColor='green'
                >
                    <img src={incomeImg} alt='Entrada'/>
                    <span>Entrada</span>
                </TypeButton>
                <TypeButton
                  type='button'
                  onClick={() => setType('withdraw')}
                  isActive={type === 'withdraw'}
                  activeColor='red'
                >
                    <img src={outcomeImg} alt='Saída'/>
                    <span>Saída</span>
                </TypeButton>
            </TransactionTypeContainer>

            <input 
            placeholder='Categoria' 
            value={category}
            onChange={event => setCategory(event.target.value)}
            /> 

            <button type='submit'>{isNewTransactionModalOpen ? "Cadastrar" : "Editar"}</button>
         </Container>
    </ReactModal>
  )
}

export default NewTransactionModal;