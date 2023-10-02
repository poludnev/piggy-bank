import { ISubCategory } from '@/types/transactions';

export interface ITransactionSubcategorySelectProps {
  children?: React.ReactNode;
  subCategories: ISubCategory[];
  defaultSubCategory?: ISubCategory;
  onChange?: (value: ISubCategory['id']) => void;
}
