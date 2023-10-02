import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import type { IServiceDataContextState } from './types';
import { serviceDataStateReducer } from './reducers';
import {
  createSetCurrenciesAction,
  createSetPaymentSourcesAction,
  createSetTransactionTypesAction,
  createSetPayeesAction,
  createSetPayersAction,
  createSetCategoriesAction,
  createSetSubCategoriesAction,
  TDataReducerActions,
} from './actions';
import { useSession } from 'next-auth/react';
import {
  fetchCategories,
  fetchCurrencies,
  fetchPayees,
  fetchPayers,
  fetchPaymentSources,
  fetchSubCategories,
  fetchTransactionTypes,
} from '@/utils/fetchers';

const serviveDataContextDefaultState: IServiceDataContextState = {
  testdata: 'test data string',
  transactionTypes: [],
  normalisedTransactionTypes: { allIds: [], byId: {} },
  currencies: [],
  normalisedCurrencies: { allIds: [], byId: {} },
  paymentSources: [],
  normalisedPaymentSources: { allIds: [], byId: {} },
  payees: [],
  normalisedPayees: { allIds: [], byId: {} },
  payers: [],
  normalisedPayers: { allIds: [], byId: {} },
  categories: [],
  normalisedCategories: { allIds: [], byId: {} },
  subCategories: [],
  normalisedSubCategories: { allIds: [], byId: {} },
  doSm: () => undefined,
};

export const ServiceDataContext = createContext<IServiceDataContextState>(
  serviveDataContextDefaultState,
);

export const useServiceDataContext = () => useContext(ServiceDataContext);

export const ServiceDataDispatchContext = createContext<Dispatch<TDataReducerActions>>(
  () => undefined,
);

export const useServiceDataDispatchContext = () => useContext(ServiceDataDispatchContext);

export const ServiceDataContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(serviceDataStateReducer, serviveDataContextDefaultState);
  const { status } = useSession();

  const dataInitialiser = useCallback(async () => {
    const transactionTypes = fetchTransactionTypes();
    const currencies = fetchCurrencies();
    const paymentSources = fetchPaymentSources();
    const payees = fetchPayees();
    const payers = fetchPayers();
    const categories = fetchCategories();
    const subCategories = fetchSubCategories();

    const fetchedData = await Promise.all([
      transactionTypes,
      currencies,
      paymentSources,
      payees,
      payers,
      categories,
      subCategories,
    ]);

    dispatch(createSetTransactionTypesAction(fetchedData[0]));
    dispatch(createSetCurrenciesAction(fetchedData[1]));
    dispatch(createSetPaymentSourcesAction(fetchedData[2]));
    dispatch(createSetPayeesAction(fetchedData[3]));
    dispatch(createSetPayersAction(fetchedData[4]));
    dispatch(createSetCategoriesAction(fetchedData[5]));
    dispatch(createSetSubCategoriesAction(fetchedData[6]));
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      dataInitialiser();
    }
  }, [status, dataInitialiser]);

  return (
    <ServiceDataContext.Provider value={{ ...serviveDataContextDefaultState, ...state }}>
      <ServiceDataDispatchContext.Provider value={dispatch}>
        {children}
      </ServiceDataDispatchContext.Provider>
    </ServiceDataContext.Provider>
  );
};
