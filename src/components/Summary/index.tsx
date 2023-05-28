import React, { useContext } from 'react';
import { Container } from './style';
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg";
import { TransactionContext } from '../../context/TransactionContext';

const Summary = () => {

    const { transactions } = useContext(TransactionContext);

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposit += transaction.value;
            acc.total += transaction.value;
        } else {
            acc.withdraw += transaction.value;
            acc.total -= transaction.value;
        }

        return acc
    }, {
        deposit:0,
        withdraw: 0,
        total: 0
    });

  return (
   <Container>
        <div>
            <header>
                <p>Entradas</p>
                <img src={incomeImg} alt='entradas'/>
            </header>
            <strong>
                {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }).format(summary.deposit)}
            </strong>
        </div>
        <div>
            <header>
                <p>Saidas</p>
                <img src={outcomeImg} alt='saidas'/>
            </header>
            <strong>
                -{new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }).format(summary.withdraw)}
            </strong>
        </div>
        <div className='highlight-background'>
            <header>
                <p>Total</p>
                <img src={totalImg} alt='total'/>
            </header>
            <strong>
                {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }).format(summary.total)}
            </strong>
        </div>
   </Container>
  )
}

export default Summary