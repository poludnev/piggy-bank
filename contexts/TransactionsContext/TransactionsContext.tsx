import { ITransaction } from '@/types/transactions';
import { fetchTransactions } from '@/utils/fetchers';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ITransactionsContextValue {
  transactions: ITransaction[];
  setTransactions: Dispatch<SetStateAction<ITransaction[]>>;
  updateTransactions: () => Promise<void>;
}
export const transactionsContextDefaultValue: ITransactionsContextValue = {
  transactions: [],
  setTransactions: () => undefined,
  updateTransactions: async () => undefined,
};
export const TransactionsContext = createContext<ITransactionsContextValue>(
  transactionsContextDefaultValue,
);
export const useTransactionsContext = () => useContext(TransactionsContext);

export const TransactionsContextProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<ITransactionsContextValue['transactions']>([]);

  const updateTransactions = useCallback(async () => {
    try {
      const results = await fetchTransactions();
      setTransactions(results);
    } catch (error) {
      console.error('failed to fetch transactions', error);
    }
  }, []);

  useEffect(() => {
    updateTransactions();
  }, [updateTransactions]);

  const value = { transactions, setTransactions, updateTransactions };

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
};
