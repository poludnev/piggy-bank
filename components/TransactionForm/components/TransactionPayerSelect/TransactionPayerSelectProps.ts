import { IPayer } from '@/types/transactions';

export interface ITransactionPayerSelectProps {
  children?: React.ReactNode;
  payers: IPayer[];
  defaultPayer?: IPayer;
  onChange?: (value: IPayer['id']) => void;
}
