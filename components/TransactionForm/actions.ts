import {
  ICategory,
  ICurrency,
  IPayee,
  IPayer,
  IPaymentSource,
  ISubCategory,
  ITransactionType,
} from '@/types/transactions';

export enum EFormSubmitStateReducerActionType {
  SET_TRANSACTION_TYPE = 'SET_TRANSACTION_TYPE',
  SET_CURRENCY = 'SET_CURRENCY',
  SET_PAYMENT_SOURCE = 'SET_PAYMENT_SOURCE',
  SET_PAYEE = 'SET_PAYEE',
  SET_PAYER = 'SET_PAYER',
  SET_CATEGORY = 'SET_CATEGORY',
  SET_SUB_CATEGORY = 'SET_SUB_CATEGORY',
  SET_AMOUNT = 'SET_AMOUNT',
  SET_DATE = 'SET_DATE',
  SET_TIME = 'SET_TIME',
  SET_DESCRIPTION = 'SET_DESCRIPTION',
}

export interface ISetTransactionType {
  type: EFormSubmitStateReducerActionType.SET_TRANSACTION_TYPE;
  payload: ITransactionType['id'];
}
export interface ISetCurrency {
  type: EFormSubmitStateReducerActionType.SET_CURRENCY;
  payload: ICurrency['id'];
}
export interface ISetPaymentSource {
  type: EFormSubmitStateReducerActionType.SET_PAYMENT_SOURCE;
  payload: IPaymentSource['id'];
}
export interface ISetPayee {
  type: EFormSubmitStateReducerActionType.SET_PAYEE;
  payload: IPayee['id'];
}
export interface ISetPayer {
  type: EFormSubmitStateReducerActionType.SET_PAYER;
  payload: IPayer['id'];
}

export interface ISetCategory {
  type: EFormSubmitStateReducerActionType.SET_CATEGORY;
  payload: ICategory['id'];
}
export interface ISetSubCategory {
  type: EFormSubmitStateReducerActionType.SET_SUB_CATEGORY;
  payload: ISubCategory['id'];
}

export interface ISetAmount {
  type: EFormSubmitStateReducerActionType.SET_AMOUNT;
  payload: number;
}

export interface ISetDate {
  type: EFormSubmitStateReducerActionType.SET_DATE;
  payload: Date;
}

export interface ISetTime {
  type: EFormSubmitStateReducerActionType.SET_TIME;
  payload: Date;
}

export interface ISetDescription {
  type: EFormSubmitStateReducerActionType.SET_DESCRIPTION;
  payload: string;
}

export type INewTransactonFormAction =
  | ISetTransactionType
  | ISetCurrency
  | ISetPaymentSource
  | ISetPayee
  | ISetPayer
  | ISetCategory
  | ISetSubCategory
  | ISetAmount
  | ISetDate
  | ISetTime
  | ISetDescription;

export const setTransactionType = (id: ITransactionType['id']): ISetTransactionType => {
  return { type: EFormSubmitStateReducerActionType.SET_TRANSACTION_TYPE, payload: id };
};

export const setCurrency = (id: ICurrency['id']): ISetCurrency => {
  return { type: EFormSubmitStateReducerActionType.SET_CURRENCY, payload: id };
};

export const setPaymentSource = (id: IPaymentSource['id']): ISetPaymentSource => {
  return { type: EFormSubmitStateReducerActionType.SET_PAYMENT_SOURCE, payload: id };
};

export const setPayee = (id: IPayee['id']): ISetPayee => {
  return { type: EFormSubmitStateReducerActionType.SET_PAYEE, payload: id };
};

export const setPayer = (id: IPayer['id']): ISetPayer => {
  return { type: EFormSubmitStateReducerActionType.SET_PAYER, payload: id };
};

export const setCategory = (id: ICategory['id']): ISetCategory => {
  return { type: EFormSubmitStateReducerActionType.SET_CATEGORY, payload: id };
};

export const setSubCategory = (id: ISubCategory['id']): ISetSubCategory => {
  return { type: EFormSubmitStateReducerActionType.SET_SUB_CATEGORY, payload: id };
};

export const setAmount = (amount: number): ISetAmount => {
  return { type: EFormSubmitStateReducerActionType.SET_AMOUNT, payload: amount };
};

export const setDate = (date: Date): ISetDate => {
  return { type: EFormSubmitStateReducerActionType.SET_DATE, payload: date };
};

export const setTime = (date: Date): ISetTime => {
  return { type: EFormSubmitStateReducerActionType.SET_TIME, payload: date };
};

export const setDescription = (text: string): ISetDescription => {
  return { type: EFormSubmitStateReducerActionType.SET_DESCRIPTION, payload: text };
};
