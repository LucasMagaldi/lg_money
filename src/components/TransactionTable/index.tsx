import React, { useEffect } from 'react';
import { Container } from './style';

const TransactionTable = () => {

    useEffect(() => {
        fetch("http://localhost:3000/api/transactions")
            .then(response => response.json())
            .then(data => console.log(data));
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
                <tr>
                    <td>Desenvolvimrnto de Sites</td>
                    <td className='deposit'>R$18.000</td>
                    <td>Desenvolvimento</td>
                    <td>20/02/2023</td>
                </tr>
                <tr>
                    <td>Desenvolvimrnto de Sites</td>
                    <td className='withdraw'>R$-12.000</td>
                    <td>Desenvolvimento</td>
                    <td>20/02/2023</td>
                </tr>
            </tbody>
        </table>
    </Container>
  )
}

export default TransactionTable