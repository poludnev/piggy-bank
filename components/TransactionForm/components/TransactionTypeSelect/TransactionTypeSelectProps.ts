import { ITransactionType } from '@/types/transactions';

export interface ITransactionTypeSelectProps {
  children?: React.ReactNode;
  transactionTypes: ITransactionType[];
  defaultTransactionType?: ITransactionType;
  onChange?: (value: ITransactionType['id']) => void;
}
