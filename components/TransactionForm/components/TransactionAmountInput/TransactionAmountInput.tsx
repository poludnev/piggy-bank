import { ChangeEventHandler, useId, useState } from 'react';
import { ITransactionAmountInputProps } from './TransactionAmountInputProps';
import styles from './TransactionAmountInput.module.scss';

export const TransactionAmountInput = ({ onChange }: ITransactionAmountInputProps): JSX.Element => {
  const [amountInputValue, setAmountInputValue] = useState('0');

  const amountChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const testNum = Number(value.replace(',', '.'));
    if (Number.isNaN(testNum)) return;
    const cented = testNum * 100;
    if ((cented * 10) % 10 !== 0) return;
    setAmountInputValue(event.target.value);
    onChange(cented);
  };

  const amountInputId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={amountInputId} className={styles.label}>
        <h3 className={styles.h3}>amount</h3>
        <input
          id={amountInputId}
          className={styles.input}
          type="text"
          value={amountInputValue}
          onChange={amountChangeHandler}
          placeholder="amount"
        />
      </label>
    </div>
  );
};
