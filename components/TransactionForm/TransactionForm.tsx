import { FormEventHandler, useEffect, useReducer, useState } from 'react';
import cn from 'classnames';
import { TFormStatus } from '@/types/forms';
import styles from './TransactionForm.module.scss';
import { TransactionTypeSelect } from './components/TransactionTypeSelect';
import { useServiceDataContext } from '@/contexts';
import { TransactionDatePicker } from './components/TransactionDatePicker';
import { TNewTransactionFormStateReducer, formSubmitStateReducer } from './reducers';
import {
  setAmount,
  setCategory,
  setCurrency,
  setDate,
  setDescription,
  setPayee,
  setPayer,
  setPaymentSource,
  setSubCategory,
  setTime,
  setTransactionType,
} from './actions';
import { TransactionTimePicker } from './components/TransactionTimePicker';
import { TransactionPaymentSourceSelect } from './components/TransactionPaymentSourceSelect';
import { TransactionAmountInput } from './components/TransactionAmountInput';
import { TransactionCurrencySelect } from './components/TransactionCurrencySelect';
import { TransactionPayeeSelect } from './components/TransactionPayeeSelect';
import { TransactionPayerSelect } from './components/TransactionPayerSelect';
import { TransactionCategorySelect } from './components/TransactionCategorySelect';
import { TransactionSubcategorySelect } from './components/TransactionSubcategorySelect';
import { TransactionDescriptionInput } from './components/TransactionDescriptionInput';
import { createNewTransaction } from '@/utils/transaction';
import { addTransaction } from '@/utils/adders';
import { useSession } from 'next-auth/react';
export const TransactionForm = (): JSX.Element => {
  const {
    transactionTypes,
    paymentSources,
    currencies,
    payees,
    payers,
    categories,
    subCategories,
  } = useServiceDataContext();

  const { data } = useSession();

  const formInitialDataState: TNewTransactionFormStateReducer = {
    typeId: transactionTypes[0]?.id ? transactionTypes[0].id : null,
    date: new Date(),
    amount: null,
    currencyId: null,
    paymentSourceId: null,
    payeeId: null,
    payerId: null,
    categoryId: null,
    subcategoryId: null,
    description: null,
  };

  const [formDataState, dispatch] = useReducer(formSubmitStateReducer, formInitialDataState);

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [formStatus, setFormStatus] = useState<TFormStatus>('initial');
  const [formStatusMessage, setFormStatusMessage] = useState<string | null>(null);

  const transactionFormSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    console.log('form state to submit', formDataState);
    try {
      setIsSubmiting(true);
      setFormStatusMessage(null);
      setFormStatus('submitting');

      const newExpense = createNewTransaction(formDataState, data?.user?.name as string);
      if (!newExpense) throw new Error('incomplete form');

      console.log(newExpense);

      const result = await addTransaction(newExpense);
      if (result === null) throw new Error('failed to add transaction');
      const { insertedId } = result;

      setFormStatus('succeed');
      setFormStatusMessage(`Successfully sent transaction with id: ${insertedId}`);
    } catch (error) {
      setFormStatus('failed');
      setFormStatusMessage('failed sending form');
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    if (transactionTypes[0]) dispatch(setTransactionType(transactionTypes[0].id));
    if (currencies[0]) dispatch(setCurrency(currencies[0].id));
    if (paymentSources[0]) dispatch(setPaymentSource(paymentSources[0].id));
    if (categories[0]) dispatch(setCategory(categories[0].id));
    if (subCategories[0]) dispatch(setSubCategory(subCategories[0].id));
    if (payees[0]) dispatch(setPayee(payees[0].id));
    if (payers[0]) dispatch(setPayer(payers[0].id));
  }, [transactionTypes, currencies, paymentSources, categories, payees, payers, subCategories]);
  return (
    <form className={styles.form} onSubmit={transactionFormSubmitHandler}>
      <h2 className={styles.h2}>Add New Transaction</h2>
      <div className={styles.messageContainer}>
        <div>Status: {formStatus}</div>
        <div>{formStatusMessage}</div>
      </div>
      <div className={cn(styles.inputGroup, styles.transactionType)}>
        <TransactionTypeSelect
          transactionTypes={transactionTypes}
          defaultTransactionType={transactionTypes[0]}
          onChange={(id) => dispatch(setTransactionType(id))}
        />
      </div>
      <div className={cn(styles.inputGroup, styles.datePicker)}>
        <TransactionDatePicker
          currentDate={formDataState.date}
          onChange={(date) => dispatch(setDate(date))}
        />
      </div>
      <div className={cn(styles.inputGroup, styles.timePicker)}>
        <TransactionTimePicker
          currentDate={formDataState.date}
          onChange={(date) => dispatch(setTime(date))}
        />
      </div>
      <div className={cn(styles.inputGroup, styles.paymentSource)}>
        <TransactionPaymentSourceSelect
          paymentSources={paymentSources}
          defaultpaymentSource={paymentSources[0]}
          onChange={(id) => dispatch(setPaymentSource(id))}
        />
      </div>
      <div className={cn(styles.inputGroup, styles.amount)}>
        <TransactionAmountInput onChange={(amount: number) => dispatch(setAmount(amount))} />
      </div>
      <div className={cn(styles.inputGroup, styles.currency)}>
        <TransactionCurrencySelect
          currencies={currencies}
          defaultCurrency={currencies[0]}
          onChange={(id) => dispatch(setCurrency(id))}
        />
      </div>
      <div className={cn(styles.inputGroup, styles.payee)}>
        <TransactionPayeeSelect
          payees={payees}
          defaultPayee={payees[0]}
          onChange={(id) => dispatch(setPayee(id))}
        />
      </div>
      <div className={cn(styles.inputGroup, styles.payer)}>
        <TransactionPayerSelect
          payers={payers}
          defaultPayer={payers[0]}
          onChange={(id) => dispatch(setPayer(id))}
        />
      </div>
      <div className={cn(styles.inputGroup, styles.category)}>
        <TransactionCategorySelect
          categories={categories}
          defaultCategory={categories[0]}
          onChange={(id) => dispatch(setCategory(id))}
        />
      </div>
      <div className={cn(styles.inputGroup, styles.subcategory)}>
        <TransactionSubcategorySelect
          subCategories={subCategories}
          defaultSubCategory={subCategories[0]}
          onChange={(id) => dispatch(setSubCategory(id))}
        />
      </div>
      <div className={cn(styles.inputGroup, styles.description)}>
        <TransactionDescriptionInput onChange={(text) => dispatch(setDescription(text))} />
      </div>
      <div className={styles.controlGroup}>
        <button className={styles.submit} type="submit" disabled={isSubmiting}>
          submit
        </button>
        <button className={styles.clear} type="reset" disabled>
          clear
        </button>
      </div>
    </form>
  );
};
