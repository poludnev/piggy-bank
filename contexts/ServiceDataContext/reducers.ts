import type {
  ICategory,
  ICurrency,
  IPayee,
  IPayer,
  IPaymentSource,
  ISubCategory,
  ITransactionType,
} from '@/types/transactions';
import {
  EServiceDataStateReducerActionTypes,
  TDataReducerActions,
} from './actions';

export interface IServiceDateStateReducerState {
  transactionTypes: ITransactionType[];
  normalisedTransactionTypes: {
    allIds: ITransactionType['id'][];
    byId: { [id: ITransactionType['id']]: ITransactionType };
  };
  currencies: ICurrency[];
  normalisedCurrencies: {
    allIds: ICurrency['id'][];
    byId: { [id: ICurrency['id']]: ICurrency };
  };
  paymentSources: IPaymentSource[];
  normalisedPaymentSources: {
    allIds: ICurrency['id'][];
    byId: { [id: ICurrency['id']]: ICurrency };
  };
  payees: IPayee[];
  normalisedPayees: {
    allIds: IPayee['id'][];
    byId: { [id: IPayee['id']]: IPayee };
  };
  payers: IPayer[];
  normalisedPayers: {
    allIds: IPayer['id'][];
    byId: { [id: IPayer['id']]: IPayer };
  };
  categories: ICategory[];
  normalisedCategories: {
    allIds: ICategory['id'][];
    byId: { [id: ICategory['id']]: ICategory };
  };
  subCategories: ISubCategory[];
  normalisedSubCategories: {
    allIds: ISubCategory['id'][];
    byId: { [id: ISubCategory['id']]: ISubCategory };
  };
}

export const serviceDataStateReducer = (
  state: IServiceDateStateReducerState,
  action: TDataReducerActions,
): IServiceDateStateReducerState => {
  const { type, payload } = action;
  switch (type) {
    case EServiceDataStateReducerActionTypes.SET_TRANSACTION_TYPES:
      const normalisedTransactionTypes = payload.reduce<
        IServiceDateStateReducerState['normalisedTransactionTypes']
      >(
        (acc, val) => {
          const id = val.id;
          if (!acc.byId[id]) {
            acc.byId[id] = val;
            acc.allIds.push(id);
          }
          return acc;
        },
        { allIds: [], byId: {} },
      );
      return { ...state, transactionTypes: payload, normalisedTransactionTypes };

    case EServiceDataStateReducerActionTypes.SET_CURRENCIES:
      const normalisedCurrencies = payload.reduce<
        IServiceDateStateReducerState['normalisedCurrencies']
      >(
        (acc, val) => {
          const id = val.id;
          if (!acc.byId[id]) {
            acc.byId[id] = val;
            acc.allIds.push(id);
          }
          return acc;
        },
        { allIds: [], byId: {} },
      );

      return { ...state, currencies: payload, normalisedCurrencies };

    case EServiceDataStateReducerActionTypes.SET_PAYMENT_SOURCES:
      const normalisedPaymentSources = payload.reduce<
        IServiceDateStateReducerState['normalisedPaymentSources']
      >(
        (acc, val) => {
          const id = val.id;
          if (!acc.byId[id]) {
            acc.byId[id] = val;
            acc.allIds.push(id);
          }
          return acc;
        },
        { allIds: [], byId: {} },
      );
      return { ...state, paymentSources: payload, normalisedPaymentSources };

    case EServiceDataStateReducerActionTypes.SET_PAYEES:
      const normalisedPayees = payload.reduce<IServiceDateStateReducerState['normalisedPayees']>(
        (acc, val) => {
          const id = val.id;
          if (!acc.byId[id]) {
            acc.byId[id] = val;
            acc.allIds.push(id);
          }
          return acc;
        },
        { allIds: [], byId: {} },
      );
      return { ...state, payees: payload, normalisedPayees };

    case EServiceDataStateReducerActionTypes.SET_PAYERS:
      const normalisedPayers = payload.reduce<IServiceDateStateReducerState['normalisedPayers']>(
        (acc, val) => {
          const id = val.id;
          if (!acc.byId[id]) {
            acc.byId[id] = val;
            acc.allIds.push(id);
          }
          return acc;
        },
        { allIds: [], byId: {} },
      );
      return { ...state, payers: payload, normalisedPayers };
    case EServiceDataStateReducerActionTypes.SET_CATEGORIES:
      const normalisedCategories = payload.reduce<
        IServiceDateStateReducerState['normalisedCategories']
      >(
        (acc, val) => {
          const id = val.id;
          if (!acc.byId[id]) {
            acc.byId[id] = val;
            acc.allIds.push(id);
          }
          return acc;
        },
        { allIds: [], byId: {} },
      );
      return { ...state, categories: payload, normalisedCategories };
    case EServiceDataStateReducerActionTypes.SET_SUBCATEGORIES:
      const normalisedSubCategories = payload.reduce<
        IServiceDateStateReducerState['normalisedSubCategories']
      >(
        (acc, val) => {
          const id = val.id;
          if (!acc.byId[id]) {
            acc.byId[id] = val;
            acc.allIds.push(id);
          }
          return acc;
        },
        { allIds: [], byId: {} },
      );
      return { ...state, subCategories: payload, normalisedSubCategories };

    default:
      return state;
  }
};
