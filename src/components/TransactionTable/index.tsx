import React, { useEffect, useState } from 'react';
import { Container } from './style';
import { api } from '../../services/api';

interface Transaction {
    id:number,
    title: string,
    value: number,
    type:string,
    category:  string,
    createdAt: string
}

const TransactionTable = () => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get("transactions")
            .then(response => setTransactions(response.data.transactions));
    }, []);

  return (
    <Container>
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </tr>
                

            </thead>
            <tbody>
                  {transactions.map(transaction => (
                    <tr key={transaction.id}>
                       <td>{transaction.title}</td>
                       <td className='deposit'>{new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                       }).format(transaction.value)}</td>
                       <td>{transaction.category}</td>
                       <td>{new Intl.DateTimeFormat("pr-BR").format(new Date(transaction.createdAt))}</td>  
                    </tr>
                  ))}
            </tbody>
        </table>
    </Container>
  )
}

export default TransactionTable