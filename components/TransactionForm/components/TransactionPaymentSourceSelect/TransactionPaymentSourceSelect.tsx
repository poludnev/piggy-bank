import { ChangeEventHandler, useId, useState } from 'react';
import { IPaymentSource } from '@/types/transactions';
import { ITransactionPaymentSourceSelectProps } from './TransactionPaymentSourceSelectProps';
import styles from './TransactionPaymentSourceSelect.module.scss';

export const TransactionPaymentSourceSelect = ({
  paymentSources,
  defaultpaymentSource,
  onChange,
}: ITransactionPaymentSourceSelectProps): JSX.Element => {
  const [selectedPaymenySourceid, setSelectedPaymentSourceId] = useState<
    IPaymentSource['id'] | undefined
  >(defaultpaymentSource?.id);

  const selectChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const paymentSourceId: IPaymentSource['id'] = event.target.value;
    setSelectedPaymentSourceId(paymentSourceId);
    if (onChange !== undefined) onChange(paymentSourceId);
  };
  const paymentSourceSelectId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={paymentSourceSelectId} className={styles.label}>
        <h3 className={styles.h3}>source</h3>
      </label>
      <select
        id={paymentSourceSelectId}
        className={styles.select}
        value={selectedPaymenySourceid}
        onChange={selectChangeHandler}
      >
        {paymentSources.map(({ id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};
