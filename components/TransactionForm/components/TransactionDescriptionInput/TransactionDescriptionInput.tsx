import { ChangeEventHandler, useId, useState } from 'react';
import { ITransactionDescriptionInputProps } from './TransactionDescriptionInputProps';
import styles from './TransactionDescriptionInput.module.scss';

export const TransactionDescriptionInput = ({
  onChange,
}: ITransactionDescriptionInputProps): JSX.Element => {
  const [descriptionInputValue, setDescriptionValue] = useState('');
  const changeDescriptionInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDescriptionValue(event.target.value);
    onChange(event.target.value);
  };
  const descriptionInputId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={descriptionInputId} className={styles.label}>
        <h3 className={styles.h3}>description</h3>
        <input
          id={descriptionInputId}
          className={styles.input}
          type="text"
          value={descriptionInputValue}
          onChange={changeDescriptionInputHandler}
          placeholder="description"
        />
      </label>
    </div>
  );
};
