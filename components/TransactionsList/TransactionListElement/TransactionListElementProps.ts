import { ITransaction } from '@/types/transactions';

export interface ITransactionListElementProps extends ITransaction {
  children?: React.ReactNode;
}
