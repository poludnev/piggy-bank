import { ChangeEventHandler, useId, useState } from 'react';
import { IPayee } from '@/types/transactions';
import { ITransactionPayeeSelectProps } from './TransactionPayeeSelectProps';
import styles from './TransactionPayeeSelect.module.scss';

export const TransactionPayeeSelect = ({
  payees,
  defaultPayee,
  onChange,
}: ITransactionPayeeSelectProps): JSX.Element => {
  const [selectedPayeeId, setSelecetedPayeeId] = useState<IPayee['id'] | undefined>(
    defaultPayee?.id,
  );

  const selectChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const payeeId: IPayee['id'] = event.target.value;
    setSelecetedPayeeId(payeeId);
    if (onChange !== undefined) onChange(payeeId);
  };
  const selectId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={selectId} className={styles.label}>
        <h3 className={styles.h3}>payee</h3>
        <select
          id={selectId}
          className={styles.select}
          value={selectedPayeeId}
          onChange={selectChangeHandler}
        >
          {payees.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
