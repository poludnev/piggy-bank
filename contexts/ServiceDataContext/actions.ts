import {
  ICategory,
  ICurrency,
  IPayee,
  IPayer,
  IPaymentSource,
  ISubCategory,
  ITransactionType,
} from '@/types/transactions';

export enum EServiceDataStateReducerActionTypes {
  SET_TRANSACTION_TYPES = 'SET_TRANSACTION_TYPESa',
  SET_CURRENCIES = 'SET_CURRENCIES',
  SET_PAYMENT_SOURCES = 'SET_PAYMENT_SOURCES',
  SET_PAYEES = 'SET_PAYEES',
  SET_PAYERS = 'SET_PAYERS',
  SET_CATEGORIES = 'SET_CATEGORIES',
  SET_SUBCATEGORIES = 'SET_SUBCATEGORIES',
}

export interface IReducerAction<T> {
  type: EServiceDataStateReducerActionTypes;
  payload: T;
}

export type TDataReducerActions =
  | ISetTransactionTypesAction
  | ISetCurrenciesAction
  | ISetPaymentSources
  | ISetPayeesAction
  | ISetPayersAction
  | ISetCategoriesAction
  | ISetSubCategoriesAction;

export interface ISetTransactionTypesAction extends IReducerAction<ITransactionType[]> {
  type: EServiceDataStateReducerActionTypes.SET_TRANSACTION_TYPES;
}

export const createSetTransactionTypesAction = (
  transactionTypes: ITransactionType[],
): ISetTransactionTypesAction => ({
  type: EServiceDataStateReducerActionTypes.SET_TRANSACTION_TYPES,
  payload: transactionTypes,
});

export interface ISetCurrenciesAction extends IReducerAction<ICurrency[]> {
  type: EServiceDataStateReducerActionTypes.SET_CURRENCIES;
}

export const createSetCurrenciesAction = (currencies: ICurrency[]): ISetCurrenciesAction => ({
  type: EServiceDataStateReducerActionTypes.SET_CURRENCIES,
  payload: currencies,
});

export interface ISetPaymentSources extends IReducerAction<IPaymentSource[]> {
  type: EServiceDataStateReducerActionTypes.SET_PAYMENT_SOURCES;
}

export const createSetPaymentSourcesAction = (
  paymentSources: IPaymentSource[],
): ISetPaymentSources => ({
  type: EServiceDataStateReducerActionTypes.SET_PAYMENT_SOURCES,
  payload: paymentSources,
});

export interface ISetPayeesAction extends IReducerAction<IPayee[]> {
  type: EServiceDataStateReducerActionTypes.SET_PAYEES;
}

export const createSetPayeesAction = (payees: IPayee[]): ISetPayeesAction => ({
  type: EServiceDataStateReducerActionTypes.SET_PAYEES,
  payload: payees,
});

export interface ISetPayersAction extends IReducerAction<IPayer[]> {
  type: EServiceDataStateReducerActionTypes.SET_PAYERS;
}

export const createSetPayersAction = (payers: IPayer[]): ISetPayersAction => ({
  type: EServiceDataStateReducerActionTypes.SET_PAYERS,
  payload: payers,
});

export interface ISetCategoriesAction extends IReducerAction<ICategory[]> {}

export const createSetCategoriesAction = (category: ICategory[]): ISetCategoriesAction => ({
  type: EServiceDataStateReducerActionTypes.SET_CATEGORIES,
  payload: category,
});

export interface ISetSubCategoriesAction extends IReducerAction<ISubCategory[]> {}

export const createSetSubCategoriesAction = (
  subCategory: ISubCategory[],
): ISetSubCategoriesAction => ({
  type: EServiceDataStateReducerActionTypes.SET_SUBCATEGORIES,
  payload: subCategory,
});
