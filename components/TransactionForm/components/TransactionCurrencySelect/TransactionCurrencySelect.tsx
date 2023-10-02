import { ChangeEventHandler, useId, useState } from 'react';
import { ICurrency } from '@/types/transactions';
import { ITransactionCurrencySelectProps } from './TransactionCurrencySelectProps';
import styles from './TransactionCurrencySelect.module.scss';

export const TransactionCurrencySelect = ({
  currencies,
  defaultCurrency,
  onChange,
}: ITransactionCurrencySelectProps): JSX.Element => {
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<ICurrency['id'] | undefined>(
    defaultCurrency?.id,
  );

  const selectChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const currencyId: ICurrency['id'] = event.target.value;
    setSelectedCurrencyId(currencyId);
    if (onChange !== undefined) onChange(currencyId);
  };
  const selectId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={selectId} className={styles.label}>
        <h3 className={styles.h3}>currency</h3>
      </label>
      <select
        id={selectId}
        className={styles.select}
        value={selectedCurrencyId}
        onChange={selectChangeHandler}
      >
        {currencies.map(({ id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};
