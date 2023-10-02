import { ICategory } from '@/types/transactions';

export interface ITransactionCategorySelectProps {
  children?: React.ReactNode;
  categories: ICategory[];
  defaultCategory?: ICategory;
  onChange?: (value: ICategory['id']) => void;
}
