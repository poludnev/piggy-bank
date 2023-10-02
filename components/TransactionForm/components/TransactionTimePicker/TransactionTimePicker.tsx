import { ChangeEventHandler, useId, useState } from 'react';
import { getTimeNormalisedString, parseTimeString } from '@/utils/time';
import { ITransactionTimePickerProps } from './TransactionTimePickerProps';
import styles from './TransactionTimePicker.module.scss';

export const TransactionTimePicker = ({
  currentDate,
  onChange,
}: ITransactionTimePickerProps): JSX.Element => {
  const [timeInputValue, setTimeInputValue] = useState(() =>
    currentDate ? getTimeNormalisedString(currentDate) : '',
  );

  const changeTimeInputValueHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setTimeInputValue(value);
    const parsedTime = parseTimeString(value);
    if (!!parsedTime && !!currentDate) {
      const { hours, minutes, seconds } = parsedTime;
      const updateDate = new Date(currentDate);
      updateDate.setHours(hours);
      updateDate.setMinutes(minutes);
      updateDate.setSeconds(seconds);
      onChange(updateDate);
    }
  };
  const inputId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        <h3 className={styles.h3}>time</h3>
      </label>
      <input
        id={inputId}
        className={styles.input}
        type="time"
        value={timeInputValue}
        onChange={changeTimeInputValueHandler}
        step={1}
      />
    </div>
  );
};
