import { ChangeEventHandler, memo, useId, useState } from 'react';
import { getFormattedDateStirng, parseDateString } from '@/utils/time';
import { ITransactionDatePickerProps } from './TransactionDatePickerProps';
import styles from './TransactionDatePicker.module.scss';

const Component = ({ currentDate, onChange }: ITransactionDatePickerProps): JSX.Element => {
  const [dateInputValue, setDateInputValue] = useState(() =>
    currentDate ? getFormattedDateStirng(currentDate) : '',
  );

  const changeDateInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setDateInputValue(value);

    const parsedDate = parseDateString(value);
    if (!!parsedDate && !!currentDate) {
      const { year, month, date } = parsedDate;
      const updateDate = new Date(currentDate);
      updateDate.setDate(date);
      updateDate.setMonth(month);
      updateDate.setFullYear(year);

      onChange(updateDate);
    }

    if (!parsedDate) console.error('unable to parse input date: ', value);
  };
  const inputId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        <h3 className={styles.h3}>date</h3>
      </label>
      <input
        id={inputId}
        className={styles.input}
        type="date"
        value={dateInputValue}
        onChange={changeDateInputHandler}
      />
    </div>
  );
};

export const TransactionDatePicker = memo(Component);
