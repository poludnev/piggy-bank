import { ChangeEventHandler, useId, useState } from 'react';
import { ISubCategory } from '@/types/transactions';
import { ITransactionSubcategorySelectProps } from './TransactionSubcategorySelectProps';
import styles from './TransactionSubcategorySelect.module.scss';

export const TransactionSubcategorySelect = ({
  subCategories,
  defaultSubCategory,
  onChange,
}: ITransactionSubcategorySelectProps): JSX.Element => {
  const [selectedSubCategoryId, setSelecetedSubCategoryId] = useState<
    ISubCategory['id'] | undefined
  >(defaultSubCategory?.id);

  const selectChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const subCategoryId: ISubCategory['id'] = event.target.value;
    setSelecetedSubCategoryId(subCategoryId);
    if (onChange !== undefined) onChange(subCategoryId);
  };
  const selectId = useId();
  return (
    <div className={styles.container}>
      <label htmlFor={selectId} className={styles.label}>
        <h3 className={styles.h3}>Subcategories</h3>
      </label>
      <select
        id={selectId}
        className={styles.select}
        value={selectedSubCategoryId}
        onChange={selectChangeHandler}
      >
        {subCategories.map(({ id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};
