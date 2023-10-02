import { useServiceDataContext } from '@/contexts';
import { ITransactionListElementProps } from './TransactionListElementProps';
import styles from './TransactionListElement.module.scss';

export const TransactionListElement = ({
  typeId,
  date,
  amount,
  currencyId,
  paymentSourceId,
  payeeId,
  payerId,
  categoryId,
  subcategoryId,
  description,
}: ITransactionListElementProps) => {
  const transactionDate = new Date(date);
  const {
    normalisedTransactionTypes,
    normalisedCurrencies,
    normalisedPayees,
    normalisedPayers,
    normalisedCategories,
    normalisedSubCategories,
    normalisedPaymentSources,
  } = useServiceDataContext();

  return (
    <div className={styles.container}>
      <div className={styles.type}>{normalisedTransactionTypes.byId[typeId]?.title}</div>
      <div className={styles.date}>{transactionDate.toLocaleDateString().split('/').join('.')}</div>
      <div className={styles.time}>{transactionDate.toLocaleTimeString()}</div>
      <div className={styles.source}>{normalisedPaymentSources.byId[paymentSourceId]?.title}</div>
      <div className={styles.amount}>{(amount / 100).toFixed(2)}</div>
      <div className={styles.currency}>{normalisedCurrencies.byId[currencyId]?.title}</div>
      <div className={styles.payee}>{normalisedPayees.byId[payeeId]?.title}</div>
      <div className={styles.payer}>{normalisedPayers.byId[payerId]?.title}</div>
      <div className={styles.categories}>{normalisedCategories.byId[categoryId]?.title}</div>
      <div className={styles.subcategories}>
        {subcategoryId ? normalisedSubCategories.byId[subcategoryId]?.title : 'n/a'}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
