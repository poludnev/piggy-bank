import { ChangeEventHandler, useId, useState } from 'react';
import { ICategory } from '@/types/transactions';
import { ITransactionCategorySelectProps } from './TransactionCategorySelectProps';
import styles from './TransactionCategorySelect.module.scss';

export const TransactionCategorySelect = ({
  categories,
  defaultCategory,
  onChange,
}: ITransactionCategorySelectProps): JSX.Element => {
  const [selectedCategoryId, setSelecetedCategoryId] = useState<ICategory['id'] | undefined>(
    defaultCategory?.id,
  );

  const selectChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const categoryId: ICategory['id'] = event.target.value;
    setSelecetedCategoryId(categoryId);
    if (onChange !== undefined) onChange(categoryId);
  };
  const selectId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={selectId} className={styles.label}>
        <h3 className={styles.h3}>Categories</h3>
        <select
          id={selectId}
          className={styles.select}
          value={selectedCategoryId}
          onChange={selectChangeHandler}
        >
          {categories.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
