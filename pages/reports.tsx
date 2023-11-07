import { hasToken } from '@/utils/auth';
import { fetchTransactionsByPeriod } from '@/utils/fetchers';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { rootstore } from '@/stores/root-store';
import { observer } from 'mobx-react';
import { ICurrency, ITransaction } from '@/types/transactions';
import styles from '@/styles/Reports.module.scss';
import { getFormattedDateStirng } from '@/utils/time';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export function ReportsPage() {
  
  const currencies = rootstore.dataStore.serviceDataStore.normalisedCurrencies;
  const categories = rootstore.dataStore.serviceDataStore.normalisedCategories;

  const expenseType = rootstore.dataStore.serviceDataStore.transactionTypes.find(
    (type) => type.title === 'expense',
  );


  const rsdRates = rootstore.dataStore.serviceDataStore.currencyRateRsd;
  const usdRates = rootstore.dataStore.serviceDataStore.currencyRateUsd;
  const eurRates = rootstore.dataStore.serviceDataStore.currencyRateEur;

  const rates: { [id: string]: { [id: string]: number } } = {
    rsd: rsdRates,
    usd: usdRates,
    eur: eurRates,
  };

  const [groupedTransactions, setGroupedTransactions] = useState<
    { currencyId: ICurrency['id']; transactions: ITransaction[] }[]
  >([]);
  const [groupedSums, setGroupedSums] = useState<{ currencyId: ICurrency['id']; sum: number }[]>(
    [],
  );
  const [totals, setTotals] = useState<{ currencyId: ICurrency['id']; sum: number }[]>([]);

  useEffect(() => {
    fetchTransactionsByPeriod(new Date('2023-10-01'), new Date('2023-10-31')).then((data) => {
      const epxenses = data.filter((transaction) => transaction.typeId === expenseType?.id);
      const groupedbyCurrency = epxenses.reduce<
        { currencyId: ICurrency['id']; transactions: ITransaction[] }[]
      >((acc, val) => {
        const currencyId = val.currencyId;
        const currencyGroup = acc.find((el) => el.currencyId === currencyId);
        if (!!currencyGroup) {
          currencyGroup.transactions.push(val);
        } else {
          acc.push({ currencyId, transactions: [val] });
        }
        return acc;
      }, []);
      setGroupedTransactions(groupedbyCurrency);
      const sumsByCurrency = groupedbyCurrency.map((group) => {
        const { currencyId, transactions } = group;
        const sum = transactions.reduce<number>((acc, val) => acc + val.amount, 0);
        return { currencyId, sum };
      });
      setGroupedSums(sumsByCurrency);
      const totals = sumsByCurrency.map(({ currencyId, sum }, _, array) => {
        const rate = rates[currencies.byId[currencyId]?.title.toLowerCase()];
        let totalSum = 0;
        if (currencies.byId[currencyId].title.toLowerCase() === 'rsd') {
          const usdRate = 1 / rate.usd;
          const eurRate = 1 / rate.eur;
          const rsdRate = 1;
          const rx: { [id: string]: number } = { usd: usdRate, eur: eurRate, rsd: rsdRate };

          array.forEach((el) => {
            totalSum += el.sum * rx[currencies.byId[el.currencyId].title];
          });
        }

        if (currencies.byId[currencyId].title.toLowerCase() === 'usd') {
          const rsdRate = 1 / rate.rsd;
          const eurRate = 1 / rate.eur;
          const usdRate = 1;
          const rx: { [id: string]: number } = { usd: usdRate, eur: eurRate, rsd: rsdRate };

          array.forEach((el) => {
            totalSum += el.sum * rx[currencies.byId[el.currencyId].title];
          });
        }
        if (currencies.byId[currencyId].title.toLowerCase() === 'eur') {
          const rsdRate = 1 / rate.rsd;
          const usdRate = 1 / rate.usd;
          const eurRate = 1;
          const rx: { [id: string]: number } = { usd: usdRate, eur: eurRate, rsd: rsdRate };

          array.forEach((el) => {
            totalSum += el.sum * rx[currencies.byId[el.currencyId].title];
          });
        }
        return { currencyId, sum: totalSum };
      });

      setTotals(totals);
    });
  }, [expenseType?.id, currencies.byId]);
  return (
    <div>
      Reports
      <section>
        <div className={styles.groups}>
          {groupedTransactions.map((group) => {
            return (
              <article key={group.currencyId} className={styles.group}>
                <header className={styles.groupHeader}>
                  {currencies.byId[group.currencyId].title}
                </header>
                {group.transactions.map((transaction) => (
                  <div key={transaction.id} className={styles.transaction}>
                    <div>{getFormattedDateStirng(new Date(transaction.date.toString()))}</div>
                    <div>{(transaction.amount / 100).toFixed(2)}</div>
                    <div>{categories.byId[transaction.categoryId].title}</div>
                    <div>{currencies.byId[transaction.currencyId].title}</div>
                  </div>
                ))}
                <div className={styles.groupSum}>
                  Subtotal:
                  <span>
                    {(
                      Number(groupedSums.find((el) => el.currencyId === group.currencyId)?.sum) /
                      100
                    ).toFixed(2)}
                  </span>
                  <span className={styles.currency}>{currencies.byId[group.currencyId].title}</span>
                </div>
              </article>
            );
          })}
        </div>
        <article className={styles.totals}>
          {totals.map((total) => (
            <div key={total.sum + total.currencyId} className={styles.total}>
              <div>{currencies.byId[total.currencyId].title}</div>{' '}
              <div className={styles.sum}>{Number(total.sum / 100).toFixed(2)}</div>
            </div>
          ))}
        </article>
      </section>
    </div>
  );
}

export default observer(ReportsPage);
