import { ICurrency } from '@/types/transactions';

export interface ITransactionCurrencySelectProps {
  children?: React.ReactNode;
  currencies: ICurrency[];
  defaultCurrency?: ICurrency;
  onChange?: (value: ICurrency['id']) => void;
}
