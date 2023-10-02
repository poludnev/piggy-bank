import { TransactionListElement, TransactionListElementHeaders } from './TransactionListElement';
import { TransactionsListPropsI } from './TransactionsListProps';
import styles from './TransactionsList.module.scss';

export const TransactionsList = ({ transactions }: TransactionsListPropsI) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>Transactions List</h3>
      <TransactionListElementHeaders />
      {transactions
        .sort((a, b) => {
          const aDate = a.date;
          const bDate = b.date;
          return new Date(bDate).getTime() - new Date(aDate).getTime();
        })
        .map((transaction) => (
          <TransactionListElement key={transaction.id} {...transaction} />
        ))}
    </div>
  );
};
