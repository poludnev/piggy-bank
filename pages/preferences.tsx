import { useServiceDataContext, useServiceDataDispatchContext } from '@/contexts';
import {
  createSetTransactionTypesAction,
  createSetCurrenciesAction,
  createSetPaymentSourcesAction,
  createSetPayeesAction,
  createSetPayersAction,
  createSetCategoriesAction,
  createSetSubCategoriesAction,
} from '@/contexts/ServiceDataContext/actions';
import { TFormStatus } from '@/types/forms';
import {
  ICurrency,
  ITransactionType,
  TNewCategory,
  TNewCurrency,
  TNewPayee,
  TNewPayer,
  TNewPaymentSource,
  TNewSubCategory,
  TNewTransactionType,
} from '@/types/transactions';
import {
  addCategory,
  addCurrency,
  addPayee,
  addPayer,
  addPaymentSource,
  addSubCategory,
  addTransactionType,
} from '@/utils/adders';
import { hasToken } from '@/utils/auth';
import {
  fetchTransactionTypes,
  fetchCurrencies,
  fetchPaymentSources,
  fetchPayees,
  fetchPayers,
  fetchCategories,
  fetchSubCategories,
} from '@/utils/fetchers';
import { GetServerSideProps } from 'next';
import { FormEventHandler, useId, useState } from 'react';

import styles from '@/styles/Preferences.module.scss';
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

export default function PreferencesPage() {
  const {
    transactionTypes,
    currencies,
    paymentSources,
    payees,
    payers,
    categories,
    subCategories,
  } = useServiceDataContext();
  const dispatch = useServiceDataDispatchContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addTransactionTypeFormStatus, setAddTransactionTypeFormStatus] =
    useState<TFormStatus>('initial');
  const [addCurrencyFormStatus, setAddCurrencyFormStatus] = useState<TFormStatus>('initial');
  const [addPaymentSourceFormStatus, setAddPaymentSourceFormStatus] =
    useState<TFormStatus>('initial');
  const [addPayeeFormStatus, setAddPayeeFormStatus] = useState<TFormStatus>('initial');
  const [addPayerFormStatus, setAddPayerFormStatus] = useState<TFormStatus>('initial');
  const [addCategoryFormStatus, setAddCategoryFormStatus] = useState<TFormStatus>('initial');
  const [addSubCategoryFormStatus, setAddSubCategoryFormStatus] = useState<TFormStatus>('initial');

  const [addTransactionTypeFormResultMessage, setAddTransactionTypeFormResultMessage] = useState<
    string | null
  >(null);
  const [addCurrenyFormResultMessage, setAddCurrenyFormResultMessage] = useState<string | null>(
    null,
  );
  const [addPaymentSourceFormResultMessage, setAddPaymentSourceFormResultMessage] = useState<
    string | null
  >(null);
  const [addPayeeFormResultMessage, setAddPayeeFormResultMessage] = useState<string | null>(null);
  const [addPayerFormResultMessage, setAddPayerFormResultMessage] = useState<string | null>(null);
  const [addCategoryFormResultMessage, setAddCategoryFormResultMessage] = useState<string | null>(
    null,
  );
  const [addSubCategoryFormResultMessage, setAddSubCategoryFormResultMessage] = useState<
    string | null
  >(null);

  const [addTransactionTypeInputValue, setAddTransactionTypeInputValue] =
    useState<ITransactionType['title']>('');
  const [addCurrencyInputValue, setAddCurrencyInputValue] = useState<ICurrency['title']>('');
  const [addPaymentSourcesInputValue, setAddPaymentSourcesInputValue] =
    useState<ICurrency['title']>('');
  const [addPayeeInputValue, setAddPayeeInputValue] = useState<ICurrency['title']>('');
  const [addPayerInputValue, setAddPayerInputValue] = useState<ICurrency['title']>('');
  const [addCategoryInputValue, setAddCategoryInputValue] = useState<ICurrency['title']>('');
  const [addSubCategoryInputValue, setAddSubCategoryInputValue] = useState<ICurrency['title']>('');

  const addTransactionTypeSubmitHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setAddTransactionTypeFormStatus('submitting');
      if (addTransactionTypeInputValue.length === 0) {
        throw new Error('empty input');
      }
      if (transactionTypes.find(({ title }) => title === addTransactionTypeInputValue)) {
        throw new Error('transaction type exists');
      }
      const newTransactionType: TNewTransactionType = {
        title: addTransactionTypeInputValue,
      };

      const result = await addTransactionType(newTransactionType);
      if (result === null) {
        setAddTransactionTypeFormStatus('failed');
        setAddTransactionTypeFormResultMessage('failed to add new transactionType');
        return;
      }
      setAddTransactionTypeFormResultMessage(result.message);
      dispatch(createSetTransactionTypesAction(await fetchTransactionTypes()));
      setAddTransactionTypeFormStatus('succeed');
      setAddTransactionTypeInputValue('');
    } catch (error) {
      console.error('addTransactionTypeSubmitHandler error', error);
      setAddTransactionTypeFormResultMessage('failed to add new transactionType');
      setAddTransactionTypeFormStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  const addCurrencySubmitHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setAddCurrencyFormStatus('submitting');
      if (addCurrencyInputValue.length === 0) {
        throw new Error('empty input');
      }
      if (currencies.find(({ title }) => title === addCurrencyInputValue)) {
        throw new Error('currency exists');
      }
      const newCurrency: TNewCurrency = {
        title: addCurrencyInputValue,
      };

      const result = await addCurrency(newCurrency);
      if (result === null) {
        setAddCurrencyFormStatus('failed');
        setAddCurrenyFormResultMessage('failed to add new currency');
        return;
      }
      setAddCurrenyFormResultMessage(result.message);
      dispatch(createSetCurrenciesAction(await fetchCurrencies()));
      setAddCurrencyFormStatus('succeed');
      setAddCurrencyInputValue('');
    } catch (error) {
      console.error('addCurrencyubmitHandler error', error);
      setAddCurrenyFormResultMessage('failed to add new currency');
      setAddCurrencyFormStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addPaymentSourceSubmitHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setAddPaymentSourceFormStatus('submitting');
      if (addPaymentSourcesInputValue.length === 0) {
        throw new Error('empty input');
      }
      if (paymentSources.find(({ title }) => title === addPaymentSourcesInputValue)) {
        throw new Error('payment source exits');
      }
      const newPaymentSource: TNewPaymentSource = {
        title: addPaymentSourcesInputValue,
      };

      const result = await addPaymentSource(newPaymentSource);
      if (result === null) {
        setAddPaymentSourceFormStatus('failed');
        setAddPaymentSourceFormResultMessage('failed to add new payment source');
        return;
      }
      setAddPaymentSourceFormResultMessage(result.message);
      dispatch(createSetPaymentSourcesAction(await fetchPaymentSources()));
      setAddPaymentSourceFormStatus('succeed');
      setAddPaymentSourcesInputValue('');
    } catch (error) {
      console.error('addPaymentSourceSubmitHandler error', error);
      setAddPaymentSourceFormResultMessage('failed to add new payment source');
      setAddPaymentSourceFormStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  const addPayeeSubmitHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setAddPayeeFormStatus('submitting');
      if (addPayeeInputValue.length === 0) {
        throw new Error('empty input');
      }
      if (payees.find(({ title }) => title === addPayeeInputValue)) {
        throw new Error('payee exits');
      }

      const newPayee: TNewPayee = {
        title: addPayeeInputValue,
      };

      const result = await addPayee(newPayee);
      if (result === null) {
        setAddPayeeFormStatus('failed');
        setAddPayeeFormResultMessage('failed to add new payee');

        return;
      }
      setAddPayeeFormResultMessage(result.message);
      dispatch(createSetPayeesAction(await fetchPayees()));
      setAddPayeeFormStatus('succeed');
      setAddPayeeInputValue('');
    } catch (error) {
      console.error('addPayeeSubmitHandler error', error);
      setAddPayeeFormResultMessage('failed to add new payee');
      setAddPayeeFormStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  const addPayerSubmitHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setAddPayerFormStatus('submitting');
      if (addPayerInputValue.length === 0) {
        throw new Error('empty input');
      }
      if (payers.find(({ title }) => title === addPayerInputValue)) {
        throw new Error('payer exits');
      }
      const newPayer: TNewPayer = {
        title: addPayerInputValue,
      };

      const result = await addPayer(newPayer);
      if (result === null) {
        setAddPayerFormStatus('failed');
        setAddPayerFormResultMessage('failed to add new payer');

        return;
      }
      setAddPayerFormResultMessage(result.message);
      dispatch(createSetPayersAction(await fetchPayers()));
      setAddPayerFormStatus('succeed');
      setAddPayerInputValue('');
    } catch (error) {
      console.error('addPayerSubmitHandler error', error);
      setAddPayerFormResultMessage('failed to add new payer');
      setAddPayerFormStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  const addCategorySubmitHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setAddCategoryFormStatus('submitting');
      if (addCategoryInputValue.length === 0) {
        throw new Error('empty input');
      }
      if (categories.find(({ title }) => title === addCategoryInputValue)) {
        throw new Error('payee exits');
      }
      const newCategorry: TNewCategory = {
        title: addCategoryInputValue,
      };

      const result = await addCategory(newCategorry);
      if (result === null) {
        setAddCategoryFormStatus('failed');
        setAddCategoryFormResultMessage('failed to add new category');
        return;
      }
      setAddCategoryFormResultMessage(result.message);
      dispatch(createSetCategoriesAction(await fetchCategories()));
      setAddCategoryFormStatus('succeed');
      setAddCategoryInputValue('');
    } catch (error) {
      console.error('addCategorySubmitHandler error', error);
      setAddCategoryFormResultMessage('failed to add new category');
      setAddCategoryFormStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  const addSubCategorySubmitHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setAddSubCategoryFormStatus('submitting');
      if (addSubCategoryInputValue.length === 0) {
        throw new Error('empty input');
      }
      if (subCategories.find(({ title }) => title === addSubCategoryInputValue)) {
        throw new Error('subcategory exits');
      }
      const newSubCategorry: TNewSubCategory = {
        title: addSubCategoryInputValue,
      };

      const result = await addSubCategory(newSubCategorry);
      if (result === null) {
        setAddSubCategoryFormStatus('failed');
        setAddSubCategoryFormResultMessage('failed to add new sub category');
        return;
      }
      setAddSubCategoryFormResultMessage(result.message);
      dispatch(createSetSubCategoriesAction(await fetchSubCategories()));
      setAddSubCategoryFormStatus('succeed');
      setAddSubCategoryInputValue('');
    } catch (error) {
      console.error('addSubCategorySubmitHandler error', error);
      setAddSubCategoryFormResultMessage('failed to add new sub category');
      setAddSubCategoryFormStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const transactionTypeInputId = useId();
  const currencyInputId = useId();
  const paymentSourceInputId = useId();
  const payeeInputId = useId();
  const payerInputId = useId();
  const categoryInputId = useId();
  const subCategoryInputId = useId();
  return (
    <main className={styles.main}>
      <div className={styles.preferenceControlElement}>
        <h3 className={styles.h3}>Transaction Types</h3>
        <details className={styles.details}>
          <summary>Transactions list</summary>
          {transactionTypes.map(({ id, title }) => (
            <div key={id}>
              <span>id: {id}</span>
              <span>title: {title}</span>
            </div>
          ))}
        </details>

        <form className={styles.form} onSubmit={addTransactionTypeSubmitHandler}>
          <div className={styles.status}>
            <p>Status: {addTransactionTypeFormStatus}</p>
            <p>
              Result:{' '}
              {addTransactionTypeFormResultMessage
                ? addTransactionTypeFormResultMessage
                : 'unknown'}
            </p>
          </div>
          <h4 className={styles.h4}>Add transcation type</h4>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor={transactionTypeInputId}>
              add type
            </label>
            <input
              name="transactionType"
              id={transactionTypeInputId}
              className={styles.input}
              type="text"
              value={addTransactionTypeInputValue}
              onChange={(event) => setAddTransactionTypeInputValue(event.target.value)}
              disabled={isSubmitting}
              placeholder="add transaction type"
            ></input>
          </div>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
      <div className={styles.preferenceControlElement}>
        <h3 className={styles.h3}>Currency</h3>
        <details className={styles.details}>
          <summary>Curency list</summary>
          {currencies.map(({ id, title }) => (
            <div key={id}>
              <span>id: {id}</span>
              <span>title: {title}</span>
            </div>
          ))}
        </details>

        <form className={styles.form} onSubmit={addCurrencySubmitHandler}>
          <div className={styles.status}>
            <p>Status: {addCurrencyFormStatus}</p>
            <p>Result: {addCurrenyFormResultMessage ? addCurrenyFormResultMessage : 'unknown'}</p>
          </div>
          <h4 className={styles.h4}>Add currency</h4>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor={currencyInputId}>
              add currnecy
            </label>
            <input
              name="currency"
              id={currencyInputId}
              className={styles.input}
              type="text"
              value={addCurrencyInputValue}
              onChange={(event) => setAddCurrencyInputValue(event.target.value)}
              disabled={isSubmitting}
              placeholder="add transaction type"
            ></input>
          </div>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
      <div className={styles.preferenceControlElement}>
        <h3 className={styles.h3}>Payment Sources</h3>
        <details className={styles.details}>
          <summary>Payment Sources List</summary>
          {paymentSources.map(({ id, title }) => (
            <div key={id}>
              <span>id: {id}</span>
              <span>title: {title}</span>
            </div>
          ))}
        </details>

        <form className={styles.form} onSubmit={addPaymentSourceSubmitHandler}>
          <div className={styles.status}>
            <p>Status: {addPaymentSourceFormStatus}</p>
            <p>
              Result:{' '}
              {addPaymentSourceFormResultMessage ? addPaymentSourceFormResultMessage : 'unknown'}
            </p>
          </div>
          <h4 className={styles.h4}>Add Payment Source</h4>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor={paymentSourceInputId}>
              Add Payment Source
            </label>
            <input
              name="paymentSource"
              id={paymentSourceInputId}
              className={styles.input}
              type="text"
              value={addPaymentSourcesInputValue}
              onChange={(event) => setAddPaymentSourcesInputValue(event.target.value)}
              disabled={isSubmitting}
              placeholder="add transaction type"
            ></input>
          </div>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
      <div className={styles.preferenceControlElement}>
        <h3 className={styles.h3}>Payees</h3>
        <details className={styles.details}>
          <summary>Payees List</summary>
          {payees.map(({ id, title }) => (
            <div key={id}>
              <span>id: {id}</span>
              <span>title: {title}</span>
            </div>
          ))}
        </details>

        <form className={styles.form} onSubmit={addPayeeSubmitHandler}>
          <div className={styles.status}>
            <p>Status: {addPayeeFormStatus}</p>
            <p>Result: {addPayeeFormResultMessage ? addPayeeFormResultMessage : 'unknown'}</p>
          </div>
          <h4 className={styles.h4}>Add Payee</h4>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor={payeeInputId}>
              Add Payee
            </label>
            <input
              name="payee"
              id={payeeInputId}
              className={styles.input}
              type="text"
              value={addPayeeInputValue}
              onChange={(event) => setAddPayeeInputValue(event.target.value)}
              disabled={isSubmitting}
              placeholder="add transaction type"
            ></input>
          </div>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
      <div className={styles.preferenceControlElement}>
        <h3 className={styles.h3}>Payers</h3>
        <details className={styles.details}>
          <summary>Payers List</summary>
          {payers.map(({ id, title }) => (
            <div key={id}>
              <span>id: {id}</span>
              <span>title: {title}</span>
            </div>
          ))}
        </details>

        <form className={styles.form} onSubmit={addPayerSubmitHandler}>
          <div className={styles.status}>
            <p>Status: {addPayerFormStatus}</p>
            <p>Result: {addPayerFormResultMessage ? addPayerFormResultMessage : 'unknown'}</p>
          </div>
          <h4 className={styles.h4}>Add Payer</h4>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor={payerInputId}>
              Add Payer
            </label>
            <input
              name="payer"
              id={payerInputId}
              className={styles.input}
              type="text"
              value={addPayerInputValue}
              onChange={(event) => setAddPayerInputValue(event.target.value)}
              disabled={isSubmitting}
              placeholder="add transaction type"
            ></input>
          </div>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
      <div className={styles.preferenceControlElement}>
        <h3 className={styles.h3}>Categories</h3>
        <details className={styles.details}>
          <summary>Categories List</summary>
          {categories.map(({ id, title }) => (
            <div key={id}>
              <span>id: {id}</span>
              <span>title: {title}</span>
            </div>
          ))}
        </details>

        <form className={styles.form} onSubmit={addCategorySubmitHandler}>
          <div className={styles.status}>
            <p>Status: {addCategoryFormStatus}</p>
            <p>Result: {addCategoryFormResultMessage ? addCategoryFormResultMessage : 'unknown'}</p>
          </div>
          <h4 className={styles.h4}>Add Category</h4>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor={categoryInputId}>
              Add Category
            </label>
            <input
              name="category"
              id={categoryInputId}
              className={styles.input}
              type="text"
              value={addCategoryInputValue}
              onChange={(event) => setAddCategoryInputValue(event.target.value)}
              disabled={isSubmitting}
              placeholder="add transaction type"
            ></input>
          </div>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
      <div className={styles.preferenceControlElement}>
        <h3 className={styles.h3}>Subcategories</h3>
        <details className={styles.details}>
          <summary>Subcategories List</summary>
          {subCategories.map(({ id, title }) => (
            <div key={id}>
              <span>id: {id}</span>
              <span>title: {title}</span>
            </div>
          ))}
        </details>

        <form className={styles.form} onSubmit={addSubCategorySubmitHandler}>
          <div className={styles.status}>
            <p>Status: {addSubCategoryFormStatus}</p>
            <p>
              Result:{' '}
              {addSubCategoryFormResultMessage ? addSubCategoryFormResultMessage : 'unknown'}
            </p>
          </div>
          <h4 className={styles.h4}>Add Subcategory</h4>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor={subCategoryInputId}>
              Add Subcategory
            </label>
            <input
              name="subcategory"
              id={subCategoryInputId}
              className={styles.input}
              type="text"
              value={addSubCategoryInputValue}
              onChange={(event) => setAddSubCategoryInputValue(event.target.value)}
              disabled={isSubmitting}
              placeholder="add transaction type"
            ></input>
          </div>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
