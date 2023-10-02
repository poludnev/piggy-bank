import { TNewTransactionFormStateReducer } from '@/components/TransactionForm/reducers';
import { TNewTransaction } from '@/types/transactions';

export const createNewTransaction = (
  transactionFromState: TNewTransactionFormStateReducer,
  userId?: string,
): TNewTransaction | null => {
  const {
    typeId,
    date,
    amount,
    currencyId,
    paymentSourceId,
    payeeId,
    payerId,
    categoryId,
    subcategoryId,
    description,
  } = transactionFromState;
  if (
    !userId ||
    !typeId ||
    !date ||
    !categoryId ||
    !paymentSourceId ||
    !amount ||
    !currencyId ||
    !payeeId ||
    !payerId
  )
    return null;

  const newExpense: TNewTransaction = {
    userId,
    typeId,
    date,
    amount,
    currencyId,
    paymentSourceId,
    payeeId,
    payerId,
    categoryId,
    subcategoryId,
    description,
  };
  return newExpense;
};
