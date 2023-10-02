export interface ITransactionDatePickerProps {
  children?: React.ReactNode;
  currentDate: Date | null;
  onChange: (date: Date) => void
}
