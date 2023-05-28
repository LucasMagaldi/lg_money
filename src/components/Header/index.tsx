import React, { useContext } from 'react';
import logo from "../../assets/logo.svg";
import * as Component from "./styles";
import { TransactionContext } from '../../context/TransactionContext';

export function Header() {

  const { handleOpenNewTransactionModal } = useContext(TransactionContext);

  return (
    <Component.Container>
        <Component.Content>
            <img src={logo} alt='alt money'/>
            <button type='button'  onClick={handleOpenNewTransactionModal}>
                Nova transação
            </button>
        </Component.Content>
        
    </Component.Container>
  )
}

//export default index