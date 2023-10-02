import { ITransactionTypeSelectProps } from './TransactionTypeSelectProps';
import styles from './TransactionTypeSelect.module.scss';
import { ChangeEventHandler, useId, useState } from 'react';
import { ITransactionType } from '@/types/transactions';

export const TransactionTypeSelect = ({
  transactionTypes,
  defaultTransactionType,
  onChange,
}: ITransactionTypeSelectProps): JSX.Element => {
  const [selectedTransactionTypeId, setSelectedTransactionTypeId] = useState<
    ITransactionType['id'] | undefined
  >(defaultTransactionType?.id);

  const selectChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const transactionTypeId: ITransactionType['id'] = event.target.value;
    setSelectedTransactionTypeId(transactionTypeId);
    if (onChange !== undefined) onChange(transactionTypeId);
  };
  const selectId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={selectId} className={styles.label}>
        <h3 className={styles.h3}>type</h3>
        <select
          id={selectId}
          className={styles.select}
          value={selectedTransactionTypeId}
          onChange={selectChangeHandler}
        >
          {transactionTypes.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
