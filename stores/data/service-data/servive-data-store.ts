import { ICategory, ICurrency, ITransactionType } from '@/types/transactions';
import { fetchCategories, fetchCurrencies, fetchTransactionTypes } from '@/utils/fetchers';
import { makeObservable, observable, action, computed } from 'mobx';
import { parse } from 'path';
import { act } from 'react-dom/test-utils';

export class ServiceDataStore {
  fetchedTransactionTypes: ITransactionType[] = [];
  currencies: ICurrency[] = [];
  categories: ICategory[] = [];
  //TODO: add fetching rates from API https://github.com/poludnev/piggy-bank/issues/7
  currencyRates = { eur: { usd: 1.07, rsd: 117.13 } };

  async getTransactionTypes() {
    const transactionTypes = await fetchTransactionTypes();
    this.fetchedTransactionTypes = transactionTypes;
  }

  async getCurrencies() {
    const currencies = await fetchCurrencies();
    this.currencies = currencies;
  }

  async getCategories() {
    const categories = await fetchCategories();
    this.categories = categories;
  }

  constructor() {
    makeObservable(this, {
      fetchedTransactionTypes: observable,
      currencies: observable,
      categories: observable,
      currencyRates: observable,
      normalisedCurrencies: computed,
      normalisedTransactionTypes: computed,
      normalisedCategories: computed,
      transactionTypes: computed,
      currencyRateUsd: computed,
      currencyRateRsd: computed,
      currencyRateEur: computed,
      getTransactionTypes: action,
      getCurrencies: action,
      getCategories: action,
      getAllData: action,
    });
  }

  async getAllData() {
    this.getCurrencies();
    this.getTransactionTypes();
    this.getCategories();
  }

  get currencyRateUsd() {
    const usdToEur = 1 / this.currencyRates.eur.usd;
    const usdToRsd = usdToEur * this.currencyRates.eur.rsd;
    return { eur: usdToEur, rsd: usdToRsd };
  }

  get currencyRateRsd() {
    const rsdToEur = 1 / this.currencyRates.eur.rsd;
    const rsdToUsd = rsdToEur * this.currencyRates.eur.usd;
    return { eur: rsdToEur, usd: rsdToUsd };
  }

  get currencyRateEur() {
    return { ...this.currencyRates.eur };
  }

  get normalisedCategories(): {
    allIds: ICategory['id'][];
    byId: { [id: ICategory['id']]: ICategory };
  } {
    return this.categories.reduce<{
      allIds: ICategory['id'][];
      byId: { [id: ICategory['id']]: ICategory };
    }>(
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
  }

  get normalisedCurrencies(): {
    allIds: ICurrency['id'][];
    byId: { [id: ICurrency['id']]: ICurrency };
  } {
    return this.currencies.reduce<{
      allIds: ICurrency['id'][];
      byId: { [id: ICurrency['id']]: ICurrency };
    }>(
      (acc, val) => {
        const id = val.id;
        if (!acc.byId[id]) {
          acc.byId[id] = { ...val };
          acc.allIds.push(id);
        }
        return acc;
      },
      { allIds: [], byId: {} },
    );
  }

  get transactionTypes(): ITransactionType[] {
    return this.fetchedTransactionTypes.map((type) => ({ ...type }));
  }
  get normalisedTransactionTypes(): {
    allIds: ITransactionType['id'][];
    byId: { [id: ITransactionType['id']]: ITransactionType };
  } {
    return this.transactionTypes.reduce<{
      allIds: ITransactionType['id'][];
      byId: { [id: ITransactionType['id']]: ITransactionType };
    }>(
      (acc, val) => {
        const id = val.id;
        if (!acc.byId[id]) {
          acc.byId[id] = { ...val };
          acc.allIds.push(id);
        }
        return acc;
      },
      { allIds: [], byId: {} },
    );
  }
}
