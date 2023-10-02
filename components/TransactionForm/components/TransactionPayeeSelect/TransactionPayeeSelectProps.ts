import { IPayee } from '@/types/transactions';

export interface ITransactionPayeeSelectProps {
  children?: React.ReactNode;
  payees: IPayee[];
  defaultPayee?: IPayee;
  onChange?: (value: IPayee['id']) => void;
}
