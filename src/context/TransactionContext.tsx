import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id:number,
    title: string,
    value: number,
    type:string,
    category:  string,
    createdAt: string
}

type TransactionIput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps {
    children: ReactNode //Aceita qualquer tipo de conteudo valdo para o react
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionIput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get("transactions")
            .then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionIput:TransactionIput) {
          const response = await api.post("/transactions", {
            ...transactionIput, 
            createdAt: new Date()
        });
          if(response.status === 201) {
            const { transaction } = response.data;
            setTransactions([
                ...transactions,
                transaction
            ]);
          }
         
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
}