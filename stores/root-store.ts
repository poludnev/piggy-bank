import { DataStore } from '@/stores/data/data-store';

export class RootStore {
  dataStore: DataStore;

  constructor() {
    this.dataStore = new DataStore();
  }
}

export const rootstore = new RootStore();
