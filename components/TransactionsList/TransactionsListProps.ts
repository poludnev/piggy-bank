import { ITransaction } from '@/types/transactions';

export interface TransactionsListPropsI {
  children?: React.ReactNode;
  transactions: ITransaction[];
}
