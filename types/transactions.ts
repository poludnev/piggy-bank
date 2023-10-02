export interface ITransactionType {
  id: string;
  title: string;
}

export type WithoutId<T> = Omit<T, 'id'>;

export type TNewTransactionType = WithoutId<ITransactionType>;
export interface ICurrency {
  id: string;
  title: string;
}

export type TNewCurrency = WithoutId<ICurrency>;

export interface IPaymentSource {
  id: string;
  title: string;
}

export type TNewPaymentSource = WithoutId<IPaymentSource>;

export interface IPayee {
  id: string;
  title: string;
}

export type TNewPayee = WithoutId<IPayee>;

export interface IPayer {
  id: string;
  title: string;
}

export type TNewPayer = WithoutId<IPayer>;

export interface ICategory {
  id: string;
  title: string;
}

export type TNewCategory = WithoutId<ICategory>;

export interface ISubCategory {
  id: string;
  title: string;
}

export type TNewSubCategory = WithoutId<ISubCategory>;
