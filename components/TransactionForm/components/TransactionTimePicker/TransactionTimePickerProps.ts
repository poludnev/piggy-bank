export interface ITransactionTimePickerProps {
  children?: React.ReactNode;
  currentDate: Date | null;
  onChange: (date: Date) => void;
}
