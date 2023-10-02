import { TNewTransaction } from '@/types/transactions';
import { EFormSubmitStateReducerActionType, INewTransactonFormAction } from './actions';

export type TNewTransactionFormStateReducer = Omit<
  {
    [Prop in keyof TNewTransaction]: TNewTransaction[Prop] | null;
  },
  'userId'
>;

export const formSubmitStateReducer = (
  state: TNewTransactionFormStateReducer,
  action: INewTransactonFormAction,
): TNewTransactionFormStateReducer => {
  const { type, payload } = action;
  // console.log(action);
  switch (type) {
    case EFormSubmitStateReducerActionType.SET_TRANSACTION_TYPE:
      return { ...state, typeId: payload };
    case EFormSubmitStateReducerActionType.SET_CURRENCY:
      return { ...state, currencyId: payload };
    case EFormSubmitStateReducerActionType.SET_PAYMENT_SOURCE:
      return { ...state, paymentSourceId: payload };
    case EFormSubmitStateReducerActionType.SET_PAYEE:
      return { ...state, payeeId: payload };
    case EFormSubmitStateReducerActionType.SET_PAYER:
      return { ...state, payerId: payload };
    case EFormSubmitStateReducerActionType.SET_CATEGORY:
      return { ...state, categoryId: payload };
    case EFormSubmitStateReducerActionType.SET_SUB_CATEGORY:
      return { ...state, subcategoryId: payload };
    case EFormSubmitStateReducerActionType.SET_AMOUNT:
      return { ...state, amount: payload };
    case EFormSubmitStateReducerActionType.SET_DATE:
    case EFormSubmitStateReducerActionType.SET_TIME:
      return { ...state, date: payload };
    case EFormSubmitStateReducerActionType.SET_DESCRIPTION:
      console.log('desc', payload);
      return { ...state, description: payload };

    default:
      return state;
  }
};
