import styles from './TransactionListElement.module.scss';
export const TransactionListElementHeaders = () => {
  return (
    <div className={styles.container}>
      <div className={styles.type}>type</div>
      <div className={styles.date}>date</div>
      <div className={styles.time}>time</div>
      <div className={styles.source}>source</div>
      <div className={styles.amount}>amount</div>
      <div className={styles.currency}>currency</div>
      <div className={styles.payee}>payee</div>
      <div className={styles.payer}>payeer</div>
      <div className={styles.categories}>category</div>
      <div className={styles.subcategories}>subcategory</div>
      <div className={styles.description}>description</div>
    </div>
  );
};
