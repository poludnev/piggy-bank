import { IPaymentSource } from '@/types/transactions';

export interface ITransactionPaymentSourceSelectProps {
  children?: React.ReactNode;
  paymentSources: IPaymentSource[];
  defaultpaymentSource?: IPaymentSource;
  onChange?: (value: IPaymentSource['id']) => void;
}
