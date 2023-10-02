import { FormHTMLAttributes } from 'react';

export interface ITransactionFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}
