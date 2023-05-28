import React, { FormEvent, useState } from 'react';
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import ReactModal from 'react-modal';
import { Container, TransactionTypeContainer, TypeButton } from './style';
import { api } from '../../services/api';

interface NewTransactionModalProps  {
    isOpen: boolean,
    onRequestClose: () => void;
}

function NewTransactionModal ({ isOpen, onRequestClose }: NewTransactionModalProps) {

  const [type, setType] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      title,
      value,
      category,
      type
    };

    const response = await api.post("/transactions", data);
    console.log(response.status);
  }

  return (
    <ReactModal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >   

        <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
        >
            <img src={closeImg} alt='Fechar Modal'/>
        </button>

         <Container onSubmit={handleCreateNewTransaction}>
            <h2>Nova Transação</h2>

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

            <button type='submit'>Cadastrar</button>
         </Container>
    </ReactModal>
  )
}

export default NewTransactionModal;