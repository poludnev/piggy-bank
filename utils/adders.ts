import {
  API_CATEGORIES_URL,
  API_CURRENCIES_URL,
  API_PAYEES_URL,
  API_PAYERS_URL,
  API_PAYMENT_SOURCES_URL,
  API_SUB_CATEGORIES_URL,
  API_TRANSACTIONS_URL,
  API_TRANSACTION_TYPES_URL,
} from '@/libs/constants';
import { IDBInsertResult } from '@/types/api';
import {
  TNewCategory,
  TNewCurrency,
  TNewPayee,
  TNewPayer,
  TNewPaymentSource,
  TNewSubCategory,
  TNewTransaction,
  TNewTransactionType,
} from '@/types/transactions';

const addDataApiRequest = async <T>(apiUrl: string, data: T) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseResult: IDBInsertResult = await response.json();
    return responseResult;
  } catch (error) {
    console.error(`addDataApiRequest ${apiUrl} error`, error);
    return null;
  }
};

export const addTransactionType = async (
  newTransactionType: TNewTransactionType,
): Promise<IDBInsertResult | null> =>
  addDataApiRequest(API_TRANSACTION_TYPES_URL, newTransactionType);

export const addCurrency = async (newCurrency: TNewCurrency): Promise<IDBInsertResult | null> =>
  addDataApiRequest(API_CURRENCIES_URL, newCurrency);

export const addPaymentSource = async (newPaymentSource: TNewPaymentSource) =>
  addDataApiRequest(API_PAYMENT_SOURCES_URL, newPaymentSource);

export const addPayee = async (newPayee: TNewPayee) => addDataApiRequest(API_PAYEES_URL, newPayee);

export const addPayer = async (newPayer: TNewPayer) => addDataApiRequest(API_PAYERS_URL, newPayer);

export const addCategory = async (newCategory: TNewCategory) =>
  addDataApiRequest(API_CATEGORIES_URL, newCategory);
export const addSubCategory = async (newSubCategory: TNewSubCategory) =>
  addDataApiRequest(API_SUB_CATEGORIES_URL, newSubCategory);

export const addTransaction = async (newTransacton: TNewTransaction) =>
  addDataApiRequest(API_TRANSACTIONS_URL, newTransacton);
