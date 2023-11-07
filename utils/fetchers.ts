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
import {
  ICategory,
  ICurrency,
  IPayee,
  IPayer,
  IPaymentSource,
  ISubCategory,
  ITransaction,
  ITransactionType,
} from '@/types/transactions';

export const fetchDataApiRequest = async <T>(
  apiUrl: string,
  query?: { [id: string]: string },
): Promise<T[]> => {
  try {
    const url = `${apiUrl}${query ? '?' + new URLSearchParams(query) : ''}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);

    const responseResult: T[] = await response.json();

    return responseResult;
  } catch (error) {
    console.error('fetchTransactionTypes', error);
    return [];
  }
};

export const fetchTransactionTypes = () =>
  fetchDataApiRequest<ITransactionType>(API_TRANSACTION_TYPES_URL);

export const fetchCurrencies = () => fetchDataApiRequest<ICurrency>(API_CURRENCIES_URL);

export const fetchPaymentSources = () =>
  fetchDataApiRequest<IPaymentSource>(API_PAYMENT_SOURCES_URL);

export const fetchPayees = () => fetchDataApiRequest<IPayee>(API_PAYEES_URL);

export const fetchPayers = () => fetchDataApiRequest<IPayer>(API_PAYERS_URL);

export const fetchCategories = () => fetchDataApiRequest<ICategory>(API_CATEGORIES_URL);

export const fetchSubCategories = () => fetchDataApiRequest<ISubCategory>(API_SUB_CATEGORIES_URL);

export const fetchTransactions = () => fetchDataApiRequest<ITransaction>(API_TRANSACTIONS_URL);

export const fetchTransactionsByPeriod = (from: Date, to: Date) =>
  fetchDataApiRequest<ITransaction>(API_TRANSACTIONS_URL, {
    from: from.toISOString(),
    to: to.toISOString(),
  });
