import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id:number,
    title: string,
    value: number,
    type:string,
    category:  string,
    createdAt: string
};

type TransactionIput = Omit<Transaction, 'id' | 'createdAt'>;
type TransactionEditInput = Omit<Transaction, "createdAt">;

interface TransactionProviderProps {
    children: ReactNode //Aceita qualquer tipo de conteudo valdo para o react
}

interface TransactionContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionIput) => Promise<void>,
    isNewTransactionModalOpen: boolean,
    editTransactionModalOpen: boolean,
    editTransaction: (trasaction: TransactionEditInput) => void,
    handleOpenNewTransactionModal: () => void,
    handleCloseNewTransactionModal: () => void,
    handleOpenEditTransactioModal: (transaction: Transaction) => void,
    type: string,
    setType: (type: string) => void,
    value: number,
    setValue: (value: number) => void,
    category: string,
    setCategory: (category: string) => void,
    title: string,
    setTitle: (title: string) => void
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [editTransactionModalOpen, setEditTransactionModalOpen] = useState(false);
    const [type, setType] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");


    const handleOpenNewTransactionModal = () => {
        setIsNewTransactionModalOpen(true);
    };

    const handleCloseNewTransactionModal = () => {
        isNewTransactionModalOpen ? setIsNewTransactionModalOpen(false) : setEditTransactionModalOpen(false);      
    };

    const handleOpenEditTransactioModal = (transaction: Transaction) => {
        setEditTransactionModalOpen(true);
        setTitle(transaction.title);
        setType(transaction.type);
        setCategory(transaction.category);
        setValue(transaction.value);
    };

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
    };

    async function editTransaction(transaction: TransactionEditInput) {
        setTransactions(transactions => transactions.map(item => 
            +item.id === transaction.id  
            ? { 
                ...item, 
                title: transaction.title,
                category: transaction.category,
                type: transaction.type,
                value: transaction.value,
                //createdAt: new Date()
            } 
            : item
        ));
    }

    return (
        <TransactionContext.Provider value={{ 
            transactions, 
            createTransaction, 
            isNewTransactionModalOpen,
            editTransactionModalOpen,
            editTransaction, 
            handleOpenNewTransactionModal,
            handleCloseNewTransactionModal,
            handleOpenEditTransactioModal,
            type,
            setType,
            value,
            setValue,
            category,
            setCategory,
            title,
            setTitle
            }}>
            {children}
        </TransactionContext.Provider>
    );
}