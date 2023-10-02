import { ChangeEventHandler, useId, useState } from 'react';
import { IPayer } from '@/types/transactions';
import { ITransactionPayerSelectProps } from './TransactionPayerSelectProps';
import styles from './TransactionPayerSelect.module.scss';

export const TransactionPayerSelect = ({
  payers,
  defaultPayer,
  onChange,
}: ITransactionPayerSelectProps): JSX.Element => {
  const [selectedPayerId, setSelecetedPayerId] = useState<IPayer['id'] | undefined>(
    defaultPayer?.id,
  );

  const selectChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const payerId: IPayer['id'] = event.target.value;
    setSelecetedPayerId(payerId);
    if (onChange !== undefined) onChange(payerId);
  };
  const selectId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={selectId} className={styles.label}>
        <h3 className={styles.h3}>payer</h3>
        <select
          id={selectId}
          className={styles.select}
          value={selectedPayerId}
          onChange={selectChangeHandler}
        >
          {payers.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
